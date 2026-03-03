import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows } from '../../contexts/WindowContext';
import { THEMES } from '../../themes';

export default function ContextMenu({ onOpenPalette }) {
  const { theme, switchTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { openApp } = useWindows();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    const handleContext = (e) => {
      e.preventDefault();
      const x = Math.min(e.clientX, window.innerWidth - 220);
      const y = Math.min(e.clientY, window.innerHeight - 350);
      setPos({ x, y });
      setVisible(true);
    };

    const handleClick = () => setVisible(false);

    document.addEventListener('contextmenu', handleContext);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('contextmenu', handleContext);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!visible) return null;

  const themeEntries = Object.values(THEMES);

  return (
    <div
      className="ctx-menu open"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="ctx-item" onClick={() => { openApp('welcome'); close(); }}>
        <span className="ctx-icon">{'\u2726'}</span>Open About
      </div>
      <div className="ctx-item" onClick={() => { openApp('projects'); close(); }}>
        <span className="ctx-icon">{'{ }'}</span>Open Projects
      </div>
      <div className="ctx-item" onClick={() => { openApp('terminal'); close(); }}>
        <span className="ctx-icon">{'>_'}</span>Open Terminal
      </div>

      <div className="ctx-sep" />

      <div
        className="ctx-item"
        onClick={() => { setLang(lang === 'en' ? 'jp' : 'en'); close(); }}
      >
        <span className="ctx-icon">{'\uD83C\uDF10'}</span>
        {t('context.switchLang')}
      </div>
      <div
        className="ctx-item"
        onClick={() => { close(); onOpenPalette(); }}
      >
        <span className="ctx-icon">{'\u2318K'}</span>Command Palette
      </div>

      <div className="ctx-sep" />

      {themeEntries.map((th) => (
        <div
          key={th.id}
          className="ctx-item"
          onClick={() => { switchTheme(th.id); close(); }}
        >
          <span className="ctx-icon">{th.id === theme.id ? '\u2713' : ''}</span>
          {th.name}
        </div>
      ))}
    </div>
  );
}
