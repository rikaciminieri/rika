import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows } from '../../contexts/WindowContext';

const CMD_ITEMS = [
  { icon: '\u2726', label: 'Open About', hint: 'welcome', action: 'open:welcome' },
  /* APPS_DISABLED — Re-enable when these apps are ready:
  { icon: '{ }', label: 'Open Projects', hint: 'engineering', action: 'open:projects' },
  { icon: '\u25C6', label: 'Open Gallery', hint: 'art + nooks', action: 'open:gallery' },
  { icon: 'GC', label: 'Open Grilled Cheese', hint: 'rankings', action: 'open:gc' },
  { icon: '\u65E5', label: 'Open Japan', hint: 'heritage', action: 'open:japan' },
  */
  { icon: '>_', label: 'Open Terminal', hint: 'commands', action: 'open:terminal' },
  { icon: '\u25B6', label: 'Open Currently', hint: 'watching/reading', action: 'open:currently' },
  { icon: '\uD83D\uDCC1', label: 'Open Trash', hint: 'files', action: 'open:trash' },
  { icon: '\uD83C\uDF10', label: 'Toggle Language', hint: 'EN \u2194 JP', action: 'toggleLang' },
  { icon: '\u2715', label: 'Close All Windows', hint: '', action: 'closeAll' },
  /* THEMES_DISABLED — Re-enable when adding theme switching back:
  { icon: '\uD83C\uDFA8', label: 'Theme: Kawaii', hint: 'pink & warm', action: 'theme:kawaii' },
  { icon: '\uD83C\uDF43', label: 'Theme: Ghibli', hint: 'ink & nature', action: 'theme:ghibli' },
  { icon: '\uD83D\uDCA0', label: 'Theme: Holographic', hint: 'neon & glitch', action: 'theme:holographic' },
  { icon: '\uD83C\uDF31', label: 'Theme: Terrarium', hint: 'moss & glass', action: 'theme:terrarium' },
  */
];

export default function CommandPalette({ open, onClose }) {
  const { lang, setLang } = useLanguage();
  const { openApp, closeAllWindows } = useWindows();
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const filtered = CMD_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.hint.toLowerCase().includes(query.toLowerCase())
  );

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      // Small delay to ensure the overlay is visible before focusing
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Clamp selected index when filtered list changes
  useEffect(() => {
    setSelectedIdx((prev) => Math.min(prev, Math.max(filtered.length - 1, 0)));
  }, [filtered.length]);

  const executeAction = useCallback(
    (action) => {
      if (action.startsWith('open:')) {
        openApp(action.slice(5));
      /* THEMES_DISABLED — Re-enable when adding theme switching back:
      } else if (action.startsWith('theme:')) {
        switchTheme(action.slice(6));
      */
      } else if (action === 'toggleLang') {
        setLang(lang === 'en' ? 'jp' : 'en');
      } else if (action === 'closeAll') {
        closeAllWindows();
      }
      onClose();
    },
    [openApp, setLang, lang, closeAllWindows, onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIdx]) {
          executeAction(filtered[selectedIdx].action);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [filtered, selectedIdx, executeAction, onClose]
  );

  if (!open) return null;

  return (
    <div className="cmd-overlay open" onClick={onClose}>
      <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmd-input"
          type="text"
          placeholder="Type a command..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIdx(0);
          }}
          onKeyDown={handleKeyDown}
        />
        <div className="cmd-results">
          {filtered.map((item, i) => (
            <div
              key={item.action}
              className={`cmd-item ${i === selectedIdx ? 'selected' : ''}`}
              onClick={() => executeAction(item.action)}
              onMouseEnter={() => setSelectedIdx(i)}
            >
              <span className="cmd-icon">{item.icon}</span>
              <span className="cmd-label">{item.label}</span>
              <span className="cmd-hint">{item.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
