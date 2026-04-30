import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_PATH = join(ROOT, 'data/generated/music.json');
const ENV_PATH = join(ROOT, '.env.local');

// Load config from .env.local
function loadEnv() {
  if (!existsSync(ENV_PATH)) {
    throw new Error(
      'Missing .env.local — create it with:\n  LASTFM_API_KEY=your_api_key\n  LASTFM_USERNAME=your_username'
    );
  }
  const lines = readFileSync(ENV_PATH, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const match = line.match(/^([A-Z_]+)=(.+)$/);
    if (match) env[match[1]] = match[2].trim();
  }
  if (!env.LASTFM_API_KEY || !env.LASTFM_USERNAME) {
    throw new Error('.env.local must contain LASTFM_API_KEY and LASTFM_USERNAME');
  }
  return env;
}

const BASE = 'https://ws.audioscrobbler.com/2.0/';

async function fetchLastfm(method, params, env) {
  const url = new URL(BASE);
  url.searchParams.set('method', method);
  url.searchParams.set('api_key', env.LASTFM_API_KEY);
  url.searchParams.set('user', env.LASTFM_USERNAME);
  url.searchParams.set('format', 'json');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Last.fm API ${res.status}: ${await res.text()}`);
  return res.json();
}

// Get the largest available image from Last.fm's image array
function pickImage(images) {
  if (!images || !images.length) return null;
  // Last.fm returns sizes: small, medium, large, extralarge
  for (const size of ['extralarge', 'large', 'medium']) {
    const img = images.find((i) => i.size === size);
    if (img && img['#text']) return img['#text'];
  }
  return null;
}

// Build an Apple Music search URL so visitors can listen to the full song
function appleMusicSearchUrl(name, artist) {
  const q = encodeURIComponent(`${name} ${artist}`);
  return `https://music.apple.com/us/search?term=${q}`;
}

function mapTrack(track) {
  return {
    name: track.name,
    artist: track.artist?.name || track.artist?.['#text'] || 'Unknown',
    artwork: pickImage(track.image),
    url: track.url, // Last.fm track page
    appleMusicUrl: appleMusicSearchUrl(
      track.name,
      track.artist?.name || track.artist?.['#text'] || ''
    ),
    playcount: track['@attr']?.nowplaying ? null : Number(track.playcount || 0),
  };
}

async function main() {
  const env = loadEnv();
  console.log(`Fetching Last.fm data for ${env.LASTFM_USERNAME}...`);

  const [topWeekly, topMonthly, recent] = await Promise.all([
    fetchLastfm('user.getTopTracks', { period: '7day', limit: 8 }, env),
    fetchLastfm('user.getTopTracks', { period: '1month', limit: 8 }, env),
    fetchLastfm('user.getRecentTracks', { limit: 8 }, env),
  ]);

  const weeklyTracks = (topWeekly.toptracks?.track || []).map(mapTrack);
  const monthlyTracks = (topMonthly.toptracks?.track || []).map(mapTrack);
  const recentTracks = (recent.recenttracks?.track || [])
    .filter((t) => !t['@attr']?.nowplaying) // exclude "now playing" placeholder
    .map(mapTrack);

  // Load existing data to preserve any manual Apple Music URLs
  let existing = { topSongs: [], recentlyPlayed: [] };
  if (existsSync(OUTPUT_PATH)) {
    try {
      existing = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'));
    } catch {
      // start fresh
    }
  }

  // Build a lookup of manually curated Apple Music URLs by song name+artist
  const manualUrls = new Map();
  for (const song of [...(existing.topSongs || []), ...(existing.recentlyPlayed || [])]) {
    if (song.url && song.url.includes('music.apple.com')) {
      manualUrls.set(`${song.name}|${song.artist}`, {
        url: song.url,
        artwork: song.artwork,
      });
    }
  }

  // Overlay manual URLs where available
  function enrichWithManual(tracks) {
    return tracks.map((t) => {
      const manual = manualUrls.get(`${t.name}|${t.artist}`);
      if (manual) {
        return { ...t, url: manual.url, artwork: manual.artwork || t.artwork };
      }
      return t;
    });
  }

  // If Last.fm returned no data, keep existing file intact
  if (weeklyTracks.length === 0 && monthlyTracks.length === 0 && recentTracks.length === 0) {
    console.log('No scrobble data yet — keeping existing music.json');
    return;
  }

  const output = {
    topSongs: enrichWithManual(weeklyTracks),
    topMonthly: enrichWithManual(monthlyTracks),
    recentlyPlayed: enrichWithManual(recentTracks),
    stats: {
      weeklyCount: weeklyTracks.length,
      monthlyCount: monthlyTracks.length,
      recentCount: recentTracks.length,
    },
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(
    `Wrote ${weeklyTracks.length} weekly + ${monthlyTracks.length} monthly + ${recentTracks.length} recent tracks`
  );
}

main().catch((err) => {
  console.error('Failed to fetch Last.fm:', err.message);
  process.exit(1);
});
