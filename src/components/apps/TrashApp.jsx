import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { FINDER_FILES } from '../../utils/finderFiles';

export default function TrashApp() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [preview, setPreview] = useState(null);

  if (preview) {
    return (
      <div className="finder">
        <div className="finder-preview">
          <span className="finder-preview-back" onClick={() => setPreview(null)}>
            {t('trash.finderBack')}
          </span>
          <h3>{preview.name}</h3>
          <p dangerouslySetInnerHTML={{ __html: preview.content }} />
        </div>
      </div>
    );
  }

  return (
    <div className="finder">
      <div className="finder-toolbar">
        <span className="finder-path">{theme.finderPath || '/Users/rika/Trash/'}</span>
      </div>
      <div className="finder-list">
        {FINDER_FILES.map((file, i) => (
          <div
            key={i}
            className={`finder-item ${file.disabled ? 'disabled' : ''}`}
            onClick={() => {
              if (file.clickable && file.content) {
                setPreview(file);
              }
            }}
          >
            <span className="fi-icon">{file.icon}</span>
            <span className="fi-name">{file.name}</span>
            <span className="fi-meta">{file.meta}</span>
            <span className="fi-size">{file.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
