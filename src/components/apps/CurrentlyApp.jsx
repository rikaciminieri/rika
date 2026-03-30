import { useLanguage } from '../../contexts/LanguageContext';
import letterboxdData from '../../../data/generated/letterboxd.json';
import booksData from '../../../data/generated/books.json';

function Stars({ rating, max = 5 }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = max - full - (half ? 1 : 0);
  return (
    <span className="widget-stars">
      {'★'.repeat(full)}
      {half && '½'}
      {'☆'.repeat(empty)}
    </span>
  );
}

function BookCover({ book }) {
  if (book.cover) {
    return (
      <div className="widget-book-cover-wrapper">
        <img
          src={book.cover}
          alt={book.title}
          className="widget-book-cover"
          onLoad={(e) => {
            if (e.target.naturalWidth < 30 || e.target.naturalHeight < 30) {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="widget-book-cover-placeholder" style={{ display: 'none' }}>
          {book.title[0]}
        </div>
      </div>
    );
  }
  return <div className="widget-book-cover-placeholder">{book.title[0]}</div>;
}

function WatchingWidget() {
  const watches = letterboxdData.recentWatches.slice(0, 4);
  return (
    <div className="widget widget-watching">
      <div className="widget-header">
        <h3>watching</h3>
        <a
          href="https://letterboxd.com/minieminems/"
          target="_blank"
          rel="noopener noreferrer"
          className="widget-profile-link"
        >
          letterboxd ↗
        </a>
      </div>
      <div className="widget-posters">
        {watches.map((w) => (
          <a
            key={w.title}
            href={w.link}
            target="_blank"
            rel="noopener noreferrer"
            className="widget-poster-card"
          >
            <img src={w.poster} alt={w.title} className="widget-poster" />
            <div className="widget-poster-info">
              <span className="widget-poster-title">{w.title}</span>
              {w.rating && <Stars rating={w.rating} />}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ReadingWidget() {
  const reading = booksData.currentlyReading.slice(0, 3);
  const recentRead = booksData.read.slice(0, 1);
  return (
    <div className="widget widget-reading">
      <div className="widget-header">
        <h3>reading</h3>
        <a
          href="https://www.goodreads.com/user/show/189394697-rika-ciminieri"
          target="_blank"
          rel="noopener noreferrer"
          className="widget-profile-link"
        >
          goodreads ↗
        </a>
      </div>
      <div className="widget-book-list">
        {reading.map((b) => (
          <a
            key={b.title}
            href={`https://www.goodreads.com/book/show/${b.goodreadsId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="widget-book"
          >
            <BookCover book={b} />
            <div className="widget-book-info">
              <span className="widget-book-title">
                {b.title.replace(/\s*\(.*\)$/, '')}
              </span>
              <span className="widget-book-author">{b.author}</span>
            </div>
          </a>
        ))}
        {recentRead.map((b) => (
          <a
            key={b.title}
            href={`https://www.goodreads.com/book/show/${b.goodreadsId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="widget-book widget-book-finished"
          >
            <BookCover book={b} />
            <div className="widget-book-info">
              <span className="widget-book-title">
                {b.title.replace(/\s*\(.*\)$/, '')}
              </span>
              <span className="widget-book-author">{b.author}</span>
              {b.rating && <Stars rating={b.rating} />}
              <span className="widget-book-badge">finished</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ListeningWidget() {
  return (
    <div className="widget widget-listening">
      <div className="widget-header">
        <h3>listening</h3>
      </div>
      <div className="widget-simple-list">
        {['Yoasobi', 'Dodo'].map((item) => (
          <div key={item} className="widget-simple-item">
            <div
              className="widget-simple-dot"
              style={{ background: 'var(--pink)' }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniWidget({ title, items, color }) {
  return (
    <div className="widget widget-mini">
      <div className="widget-header">
        <h3>{title}</h3>
      </div>
      <div className="widget-simple-list">
        {items.map((item) => (
          <div key={item} className="widget-simple-item">
            <div className="widget-simple-dot" style={{ background: color }} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CurrentlyApp() {
  const { t } = useLanguage();

  return (
    <div className="notepad-content currently-app">
      <h2>{t('currently.title')}</h2>
      <div className="widget-grid">
        <WatchingWidget />
        <ReadingWidget />
        <ListeningWidget />
        <MiniWidget
          title={t('currently.playing')}
          items={['Monopoly Deal', 'Learning to sing']}
          color="var(--green)"
        />
        <MiniWidget
          title={t('currently.learning')}
          items={['AI & LLMs', 'Building agents']}
          color="var(--blue)"
        />
        <MiniWidget
          title={t('currently.hills')}
          items={[
            'MJ is the king of pop',
            "The Rock's Jumanji is good",
            'Health > everything',
          ]}
          color="var(--amber)"
        />
      </div>
    </div>
  );
}
