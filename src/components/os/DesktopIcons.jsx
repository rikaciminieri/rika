import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows, APP_DEFS } from '../../contexts/WindowContext';
import { useAudio } from '../../contexts/AudioContext';

export default function DesktopIcons() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { openApp } = useWindows();
  const { playScaleNote } = useAudio();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="desktop-icons">
      {APP_DEFS.map((app) => (
        <div
          key={app.id}
          className="desktop-icon"
          onClick={isMobile ? () => openApp(app.id) : undefined}
          onDoubleClick={isMobile ? undefined : () => openApp(app.id)}
          onMouseEnter={() => playScaleNote(app.id)}
        >
          <div
            className="icon-img"
            style={theme.iconStyles?.[app.id] || {}}
            dangerouslySetInnerHTML={{ __html: theme.iconSVGs?.[app.id] || '' }}
          />
          <div className="icon-label">{t(app.label)}</div>
        </div>
      ))}
    </div>
  );
}
