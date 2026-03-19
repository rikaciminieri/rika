import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const RSS_URL = 'https://letterboxd.com/minieminems/rss/';

async function fetchAndProcess() {
  const res = await fetch(RSS_URL);
  const xml = await res.text();

  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
      return m ? m[1].trim() : null;
    };

    const title = get('letterboxd:filmTitle');
    const year = get('letterboxd:filmYear');
    const rating = get('letterboxd:memberRating');
    const watchedDate = get('letterboxd:watchedDate');
    const rewatch = get('letterboxd:rewatch');
    const link = get('link');

    // Extract poster image from CDATA description
    const descMatch = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    const desc = descMatch ? descMatch[1] : '';
    const posterMatch = desc.match(/src="([^"]+)"/);
    const poster = posterMatch ? posterMatch[1] : null;

    // Extract review text (after the image tag)
    const reviewMatch = desc.match(/<\/p>\s*<p>([\s\S]*?)<\/p>/);
    const review = reviewMatch
      ? reviewMatch[1].replace(/<[^>]+>/g, '').trim()
      : null;

    if (title) {
      items.push({
        title,
        year: year ? Number(year) : null,
        rating: rating ? Number(rating) : null,
        watchedDate,
        rewatch: rewatch === 'Yes',
        poster,
        review,
        link,
      });
    }
  }

  // Sort by watched date, most recent first
  items.sort((a, b) => (b.watchedDate > a.watchedDate ? 1 : -1));

  const output = {
    recentWatches: items.slice(0, 10),
    allWatches: items,
    favorites: items.filter((i) => i.rating >= 4.5),
    stats: {
      totalLogged: items.length,
      averageRating:
        items.filter((i) => i.rating).length > 0
          ? +(
              items.filter((i) => i.rating).reduce((s, i) => s + i.rating, 0) /
              items.filter((i) => i.rating).length
            ).toFixed(1)
          : null,
      rewatches: items.filter((i) => i.rewatch).length,
    },
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  writeFileSync(
    join(ROOT, 'data/generated/letterboxd.json'),
    JSON.stringify(output, null, 2)
  );

  console.log(
    `Processed ${items.length} watches (${output.favorites.length} favorites, avg rating ${output.stats.averageRating})`
  );
}

fetchAndProcess().catch((err) => {
  console.error('Failed to fetch Letterboxd RSS:', err.message);
  process.exit(1);
});
