import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows, APP_DEFS } from '../../contexts/WindowContext';

const CLOCK_FACTS = [
  'Currently thinking about grilled cheese',
  'Wondering if Luffy is Joy Boy',
  'Practicing singing (neighbors sorry)',
  'Debugging something... always',
  'Ranking sandwiches in my head',
  'Missing Japan right now',
  'Building something cool with AI',
  'Rewatching Bridgerton... again',
];

export default function Taskbar({ onOpenPalette }) {
  const { theme, nightMode, toggleNightMode } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { windows, focusedWinId, focusWindow, openApp } = useWindows();
  const [clock, setClock] = useState('');
  const [clockTooltip, setClockTooltip] = useState(null);
  const clockTimerRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        now.getHours().toString().padStart(2, '0') + ':' +
        now.getMinutes().toString().padStart(2, '0')
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Merge taskbar style — night mode overrides layered on top
  const taskbarStyle = nightMode
    ? { ...(theme.taskbarStyle || {}), ...(theme.nightTaskbarStyle || {}) }
    : (theme.taskbarStyle || {});

  // Start button styling from theme
  const startStyle = theme.startButtonStyle || {};

  // Night mode label — delegate to theme if it provides a function
  const nightLabel = theme.getNightModeLabel
    ? theme.getNightModeLabel(nightMode)
    : (nightMode ? '\u{1F319}' : '\u2600\uFE0F');

  return (
    <div className="taskbar" style={taskbarStyle}>
      {/* Start button */}
      <button
        className="tb-start"
        style={startStyle}
        title="Start"
        onClick={onOpenPalette}
      >
        {theme.startButton?.startsWith('<') ? (
          <span dangerouslySetInnerHTML={{ __html: theme.startButton }} />
        ) : (
          theme.startButton || 'R'
        )}
      </button>

      <div className="tb-divider" />

      {/* Open app tabs */}
      <div className="tb-apps">
        {windows.map((win) => {
          const app = APP_DEFS.find((a) => a.id === win.appId);
          if (!app) return null;
          const isActive = win.id === focusedWinId && !win.minimized;
          return (
            <button
              key={win.id}
              className={`tb-app ${isActive ? 'active' : ''}`}
              data-app={win.appId}
              onClick={() => {
                if (win.minimized) {
                  // Un-minimize via openApp (it handles the restore logic)
                  openApp(win.appId);
                } else {
                  focusWindow(win.id);
                }
              }}
            >
              <span className="tb-app-dot" />
              {t(app.label)}
            </button>
          );
        })}
      </div>

      {/* Tray area */}
      <div className="tb-tray">
        {/* Night mode toggle */}
        <button
          className="tb-tray-btn"
          onClick={toggleNightMode}
          title="Toggle night mode"
        >
          {nightLabel}
        </button>

        {/* Language toggle — segmented control */}
        <div className="lang-toggle-seg">
          <button
            className={`lang-seg ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            className={`lang-seg ${lang === 'jp' ? 'active' : ''}`}
            onClick={() => setLang('jp')}
          >
            JP
          </button>
        </div>

        {/* Clock with tooltip */}
        <span
          id="clock"
          style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-muted)', position: 'relative', cursor: 'default' }}
          onMouseEnter={() => {
            clockTimerRef.current = setTimeout(() => {
              setClockTooltip(CLOCK_FACTS[Math.floor(Math.random() * CLOCK_FACTS.length)]);
            }, 3000);
          }}
          onMouseLeave={() => {
            clearTimeout(clockTimerRef.current);
            setClockTooltip(null);
          }}
        >
          {clock}
          {clockTooltip && (
            <span style={{
              position: 'absolute', bottom: '100%', right: 0, marginBottom: 8,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '6px 12px', fontSize: 11,
              whiteSpace: 'nowrap', color: 'var(--text-muted)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              animation: 'fadeIn 0.2s',
            }}>
              {clockTooltip}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
