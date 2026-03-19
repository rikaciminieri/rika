import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const csv = readFileSync(
  join(ROOT, 'data/exports/goodreads/goodreads_library_export.csv'),
  'utf-8'
);

// Parse CSV (handles quoted fields with commas)
function parseCSV(text) {
  const lines = [];
  let current = '';
  let inQuotes = false;

  for (const char of text) {
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if (char === '\n' && !inQuotes) {
      lines.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) lines.push(current.trim());

  const headers = parseRow(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseRow(line);
    const obj = {};
    headers.forEach((h, i) => (obj[h] = values[i] || ''));
    return obj;
  });
}

function parseRow(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

// Fetch cover from Open Library search API by title + author
async function fetchCover(title, author) {
  const cleanTitle = title.replace(/\s*\(.*\)$/, ''); // strip series info
  const q = `title=${encodeURIComponent(cleanTitle)}&author=${encodeURIComponent(author)}&limit=1`;
  try {
    const res = await fetch(`https://openlibrary.org/search.json?${q}`);
    const data = await res.json();
    const coverId = data.docs?.[0]?.cover_i;
    if (coverId) {
      return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
    }
  } catch {
    // silently fail — cover is optional
  }
  return null;
}

const books = parseCSV(csv);

const EXCLUDED_TITLES = ['dictionary', 'thesaurus', 'phrasebook'];

async function processBooks() {
  const allBooks = books.filter(
    (b) => !EXCLUDED_TITLES.some((t) => b['Title'].toLowerCase().includes(t))
  );

  // Fetch covers for all books in parallel
  console.log(`Fetching covers for ${allBooks.length} books...`);
  const coverMap = new Map();
  await Promise.all(
    allBooks.map(async (b) => {
      const cover = await fetchCover(b['Title'], b['Author']);
      coverMap.set(b['Book Id'], cover);
    })
  );

  const currentlyReading = allBooks
    .filter((b) => b['Exclusive Shelf'] === 'currently-reading')
    .map((b) => ({
      title: b['Title'],
      author: b['Author'],
      pages: Number(b['Number of Pages']) || null,
      dateAdded: b['Date Added'],
      cover: coverMap.get(b['Book Id']),
      goodreadsId: b['Book Id'],
    }))
    .sort((a, b) => (b.dateAdded > a.dateAdded ? 1 : -1));

  const read = allBooks
    .filter((b) => b['Exclusive Shelf'] === 'read')
    .map((b) => ({
      title: b['Title'],
      author: b['Author'],
      rating: Number(b['My Rating']) || null,
      pages: Number(b['Number of Pages']) || null,
      dateRead: b['Date Read'],
      dateAdded: b['Date Added'],
      cover: coverMap.get(b['Book Id']),
      goodreadsId: b['Book Id'],
    }))
    .sort((a, b) => (b.dateRead > a.dateRead ? 1 : -1));

  const favorites = read.filter((b) => b.rating === 5);

  const output = {
    currentlyReading,
    read,
    favorites,
    stats: {
      totalBooks: allBooks.length,
      booksRead: read.length,
      currentlyReading: currentlyReading.length,
      averageRating:
        read.filter((b) => b.rating).length > 0
          ? +(
              read.filter((b) => b.rating).reduce((s, b) => s + b.rating, 0) /
              read.filter((b) => b.rating).length
            ).toFixed(1)
          : null,
    },
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  writeFileSync(
    join(ROOT, 'data/generated/books.json'),
    JSON.stringify(output, null, 2)
  );

  const withCovers = [...currentlyReading, ...read].filter((b) => b.cover).length;
  console.log(
    `Processed ${output.stats.totalBooks} books (${output.stats.booksRead} read, ${output.stats.currentlyReading} currently reading, ${withCovers} with covers)`
  );
}

processBooks().catch((err) => {
  console.error('Failed to process books:', err.message);
  process.exit(1);
});
