import { useLanguage } from '../../contexts/LanguageContext';

const GALLERY_ITEMS = [
  { key: 'sunset', descKey: 'sunsetDesc', emoji: '🌇', gradient: 'linear-gradient(135deg, #f4a0b5, #f5c97e)' },
  { key: 'hobbit', descKey: 'hobbitDesc', emoji: '🏡', gradient: 'linear-gradient(135deg, #7ecba3, #8a6a3a)' },
  { key: 'wave', descKey: 'waveDesc', emoji: '🌊', gradient: 'linear-gradient(135deg, #97b8f0, #c4b0e8)' },
  { key: 'diagon', descKey: 'diagonDesc', emoji: '✨', gradient: 'linear-gradient(135deg, #c4b0e8, #f5c97e)' },
  { key: 'cherry', descKey: 'cherryDesc', emoji: '🌸', gradient: 'linear-gradient(135deg, #e88fc0, #f8c4a4)' },
];

export default function GalleryApp() {
  const { t } = useLanguage();

  return (
    <div className="notepad-content">
      <h2>{t('gallery.title')}</h2>
      <div className="gallery-scroll">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.key} className="gallery-item">
            <div className="gallery-thumb" style={{ background: item.gradient }}>
              {item.emoji}
            </div>
            <h4>{t(`gallery.${item.key}`)}</h4>
            <p>{t(`gallery.${item.descKey}`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
