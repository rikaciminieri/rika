import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { THEMES, DEFAULT_THEME } from '../themes';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'rikaos-theme';
const STYLE_TAG_ID = 'theme-css';

function applyVarsToRoot(vars) {
  const root = document.documentElement;
  Object.entries(vars).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
}

function injectThemeCSS(css) {
  let styleTag = document.getElementById(STYLE_TAG_ID);
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = STYLE_TAG_ID;
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = css || '';
}

// Remove all theme-related body classes
const THEME_CLASSES = ['night-mode', 'day-mode'];
function cleanBodyClasses() {
  THEME_CLASSES.forEach((cls) => document.body.classList.remove(cls));
}

export function ThemeProvider({ children }) {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES[saved]) return saved;
    } catch {
      // localStorage may be unavailable
    }
    return DEFAULT_THEME;
  });

  const [nightMode, setNightMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevThemeId = useRef(currentThemeId);

  const theme = THEMES[currentThemeId] || THEMES[DEFAULT_THEME];

  // Apply CSS custom properties to :root whenever theme or night mode changes
  useEffect(() => {
    if (!theme.vars) return;
    applyVarsToRoot(theme.vars);
    if (nightMode && theme.nightVars) {
      applyVarsToRoot(theme.nightVars);
    }
  }, [theme, nightMode]);

  // Inject theme-specific CSS
  useEffect(() => {
    injectThemeCSS(theme.css);
  }, [theme]);

  // Toggle night-mode class on body
  useEffect(() => {
    cleanBodyClasses();
    const cls = theme.nightModeClass || 'night-mode';
    if (nightMode) {
      document.body.classList.add(cls);
    }
    return () => {
      document.body.classList.remove(cls);
    };
  }, [nightMode, theme]);

  // Persist theme choice to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currentThemeId);
    } catch {
      // localStorage may be unavailable
    }
  }, [currentThemeId]);

  const switchTheme = useCallback((themeId) => {
    if (!THEMES[themeId] || themeId === currentThemeId) return false;

    // Transition: fade in overlay → change theme → fade out
    setIsTransitioning(true);
    setTimeout(() => {
      cleanBodyClasses();
      setNightMode(false);
      setCurrentThemeId(themeId);
      prevThemeId.current = themeId;
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 500);

    return true;
  }, [currentThemeId]);

  const toggleNightMode = useCallback(() => {
    setNightMode((prev) => !prev);
  }, []);

  const value = {
    theme,
    nightMode,
    isTransitioning,
    switchTheme,
    toggleNightMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
