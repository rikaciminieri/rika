import { useLanguage } from '../../contexts/LanguageContext';

const CATEGORIES = [
  {
    key: 'watching',
    items: ['Bridgerton', 'The Traitors', 'Terrace House'],
    color: 'var(--accent)',
  },
  {
    key: 'reading',
    items: ['Heated Rivalry', 'One Piece'],
    color: 'var(--lavender)',
  },
  {
    key: 'playing',
    items: ['Monopoly Deal', 'Learning to sing'],
    color: 'var(--green)',
  },
  {
    key: 'learning',
    items: ['AI & LLMs', 'Building agents'],
    color: 'var(--blue)',
  },
  {
    key: 'listening',
    items: ['Yoasobi', 'Dodo'],
    color: 'var(--pink)',
  },
  {
    key: 'hills',
    items: ['MJ is the king of pop', "The Rock's Jumanji is good", 'Health > everything'],
    color: 'var(--amber)',
  },
];

export default function CurrentlyApp() {
  const { t } = useLanguage();

  return (
    <div className="notepad-content">
      <h2>{t('currently.title')}</h2>
      <div className="currently-grid">
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="currently-card">
            <h4>{t(`currently.${cat.key}`)}</h4>
            {cat.items.map((item) => (
              <div key={item} className="item">
                <div className="item-dot" style={{ background: cat.color }} />
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
