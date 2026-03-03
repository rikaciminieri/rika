import { useLanguage } from '../../contexts/LanguageContext';

const CARDS = [
  {
    key: 'onsen',
    emoji: '♨️',
    items: ['Kurama Onsen (Kyoto)', 'Hakone Open Air', 'Beppu Jigoku'],
  },
  {
    key: 'konbini',
    emoji: '🏪',
    items: ['S-tier: 7-Eleven egg sandwich', 'A-tier: FamilyMart chicken', 'B-tier: Lawson matcha sweets'],
  },
  {
    key: 'drama',
    emoji: '📺',
    items: ['Hana Yori Dango', 'Terrace House', 'Alice in Borderland'],
  },
  {
    key: 'nowplaying',
    emoji: '🎵',
    items: ['Yoasobi — Idol', 'Dodo — Omoide', 'Vaundy — Odori'],
  },
];

export default function JapanApp() {
  const { t } = useLanguage();

  return (
    <div className="notepad-content">
      <h2>{t('japan.title')}</h2>
      <p style={{ marginBottom: 20, fontStyle: 'italic', color: 'var(--text-muted)' }}>
        {t('japan.subtitle')}
      </p>
      <div className="currently-grid">
        {CARDS.map((card) => (
          <div key={card.key} className="currently-card">
            <h4>
              <span style={{ marginRight: 8 }}>{card.emoji}</span>
              {t(`japan.${card.key}`)}
            </h4>
            {card.items.map((item) => (
              <div key={item} className="item">
                <div className="item-dot" style={{ background: 'var(--accent)' }} />
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
