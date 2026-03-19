import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const RSS_URL = 'https://letterboxd.com/minieminems/rss/';

function parseRSS(xml) {
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

    const descMatch = block.match(
      /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/
    );
    const desc = descMatch ? descMatch[1] : '';
    const posterMatch = desc.match(/src="([^"]+)"/);
    const poster = posterMatch ? posterMatch[1] : null;
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

  items.sort((a, b) => (b.watchedDate > a.watchedDate ? 1 : -1));
  return items;
}

export function letterboxdPlugin() {
  return {
    name: 'vite-plugin-letterboxd',
    async buildStart() {
      try {
        const res = await fetch(RSS_URL);
        const xml = await res.text();
        const items = parseRSS(xml);

        const output = {
          recentWatches: items.slice(0, 10),
          allWatches: items,
          favorites: items.filter((i) => i.rating >= 4.5),
          stats: {
            totalLogged: items.length,
            averageRating:
              items.filter((i) => i.rating).length > 0
                ? +(
                    items
                      .filter((i) => i.rating)
                      .reduce((s, i) => s + i.rating, 0) /
                    items.filter((i) => i.rating).length
                  ).toFixed(1)
                : null,
            rewatches: items.filter((i) => i.rewatch).length,
          },
          lastUpdated: new Date().toISOString().split('T')[0],
        };

        const dir = join(process.cwd(), 'data/generated');
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, 'letterboxd.json'), JSON.stringify(output, null, 2));
        console.log(`[letterboxd] Fetched ${items.length} watches`);
      } catch (err) {
        console.warn(`[letterboxd] RSS fetch failed, using cached data: ${err.message}`);
      }
    },
  };
}
