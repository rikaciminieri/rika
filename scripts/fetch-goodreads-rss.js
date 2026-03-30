import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_PATH = join(ROOT, 'data/generated/books.json');

const USER_ID = '189394697';
const SHELVES = ['currently-reading', 'read'];

function shelfUrl(shelf, page = 1) {
  return `https://www.goodreads.com/review/list_rss/${USER_ID}?shelf=${shelf}&page=${page}`;
}

function decodeEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// Regex-based XML parsing (same pattern as process-letterboxd.js)
function parseItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`));
      return m ? m[1].trim() : null;
    };

    const title = decodeEntities(get('title'));
    const author = decodeEntities(get('author_name'));
    const userRating = get('user_rating');
    const bookId = get('book_id');
    const largeImage = get('book_large_image_url');
    const smallImage = get('book_image_url');

    if (title) {
      const cover = pickCover(largeImage, smallImage);
      items.push({
        title,
        author: author || 'Unknown',
        rating: userRating && Number(userRating) > 0 ? Number(userRating) : null,
        cover,
        goodreadsId: bookId,
      });
    }
  }

  return items;
}

// Filter out Goodreads "no cover" placeholder images
function pickCover(large, small) {
  const img = large || small;
  if (!img) return null;
  if (img.includes('nophoto') || img.includes('nocover') || img.includes('no-image')) return null;
  // Goodreads uses very small placeholder images (1x1 or similar tiny dimensions)
  if (img.includes('._SY1_') || img.includes('._SX1_')) return null;
  return img;
}

async function fetchShelf(shelf) {
  const allItems = [];
  let page = 1;

  while (true) {
    const url = shelfUrl(shelf, page);
    console.log(`  Fetching ${shelf} page ${page}...`);

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status} fetching ${shelf} page ${page}: ${body.slice(0, 200)}`);
    }

    const xml = await res.text();
    const items = parseItems(xml);

    if (items.length === 0) break;

    allItems.push(...items);
    page++;

    // Safety cap to avoid infinite loops
    if (page > 20) break;
  }

  return allItems;
}

// Merge RSS data with existing books.json to preserve rich CSV metadata
function mergeWithExisting(rssBooks, existingBooks) {
  const existingMap = new Map();
  for (const book of existingBooks) {
    if (book.goodreadsId) {
      existingMap.set(book.goodreadsId, book);
    }
  }

  return rssBooks.map((rss) => {
    const existing = existingMap.get(rss.goodreadsId);
    if (existing) {
      return {
        ...rss,
        pages: existing.pages ?? null,
        dateAdded: existing.dateAdded ?? null,
        dateRead: existing.dateRead ?? null,
        // Prefer existing cover if RSS cover is null
        cover: rss.cover || existing.cover || null,
      };
    }
    return {
      ...rss,
      pages: null,
      dateAdded: null,
      dateRead: null,
    };
  });
}

const EXCLUDED_TITLES = ['dictionary', 'thesaurus', 'phrasebook'];

async function main() {
  console.log('Fetching Goodreads shelves via RSS...');

  // Load existing data for merge
  let existingData = { currentlyReading: [], read: [] };
  if (existsSync(OUTPUT_PATH)) {
    try {
      existingData = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'));
    } catch {
      console.warn('Could not parse existing books.json, starting fresh');
    }
  }

  const [currentlyReadingRaw, readRaw] = await Promise.all([
    fetchShelf('currently-reading'),
    fetchShelf('read'),
  ]);

  // Filter out reference books
  const filterExcluded = (books) =>
    books.filter((b) => !EXCLUDED_TITLES.some((t) => b.title.toLowerCase().includes(t)));

  const currentlyReadingFiltered = filterExcluded(currentlyReadingRaw);
  const readFiltered = filterExcluded(readRaw);

  // Merge with existing data to preserve CSV metadata
  const allExisting = [...(existingData.currentlyReading || []), ...(existingData.read || [])];
  const currentlyReading = mergeWithExisting(currentlyReadingFiltered, allExisting);
  const read = mergeWithExisting(readFiltered, allExisting);

  const favorites = read.filter((b) => b.rating === 5);
  const allBooks = [...currentlyReading, ...read];
  const rated = read.filter((b) => b.rating);

  const output = {
    currentlyReading,
    read,
    favorites,
    stats: {
      totalBooks: allBooks.length,
      booksRead: read.length,
      currentlyReading: currentlyReading.length,
      averageRating:
        rated.length > 0
          ? +(rated.reduce((s, b) => s + b.rating, 0) / rated.length).toFixed(1)
          : null,
    },
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  const withCovers = allBooks.filter((b) => b.cover).length;
  console.log(
    `Processed ${output.stats.totalBooks} books (${output.stats.booksRead} read, ${output.stats.currentlyReading} currently reading, ${withCovers} with covers)`
  );
}

main().catch((err) => {
  console.error('Failed to fetch Goodreads RSS:', err.message);
  process.exit(1);
});
