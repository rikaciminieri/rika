import { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';

const WindowCtx = createContext();

export const APP_DEFS = [
  { id: 'welcome', label: 'apps.about', w: 580, h: 540 },
  { id: 'projects', label: 'apps.projects', w: 700, h: 500 },
  { id: 'terminal', label: 'apps.terminal', w: 640, h: 420 },
  // { id: 'gallery', label: 'apps.gallery', w: 680, h: 460 },
  { id: 'currently', label: 'apps.currently', w: 560, h: 520 },
  { id: 'gc', label: 'apps.gc', w: 720, h: 520 },
  { id: 'contact', label: 'apps.contact', w: 480, h: 520 },
  // { id: 'japan', label: 'apps.japan', w: 520, h: 440 },
  { id: 'trash', label: 'apps.trash', w: 560, h: 420 },
];

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [focusedWinId, setFocusedWinId] = useState(null);
  const nextZ = useRef(100);
  const nextWinId = useRef(1);

  const focusWindow = useCallback((id) => {
    nextZ.current += 1;
    const z = nextZ.current;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)));
    setFocusedWinId(id);
  }, []);

  const openApp = useCallback((appId) => {
    const def = APP_DEFS.find((d) => d.id === appId);
    if (!def) return;

    setWindows((prev) => {
      const existing = prev.find((w) => w.appId === appId);

      if (existing && !existing.minimized) {
        // Already open and visible — just focus it
        nextZ.current += 1;
        setFocusedWinId(existing.id);
        return prev.map((w) =>
          w.id === existing.id ? { ...w, z: nextZ.current } : w
        );
      }

      if (existing && existing.minimized) {
        // Minimized — un-minimize and focus
        nextZ.current += 1;
        setFocusedWinId(existing.id);
        return prev.map((w) =>
          w.id === existing.id ? { ...w, minimized: false, z: nextZ.current } : w
        );
      }

      // Create new window with cascading position
      const openCount = prev.length;
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

      const x = Math.min(220 + openCount * 30, vw - def.w - 20);
      const y = Math.min(30 + openCount * 25, vh - def.h - 20);

      nextZ.current += 1;
      const id = nextWinId.current;
      nextWinId.current += 1;

      setFocusedWinId(id);

      return [
        ...prev,
        {
          id,
          appId,
          x: Math.max(0, x),
          y: Math.max(0, y),
          w: def.w,
          h: def.h,
          z: nextZ.current,
          minimized: false,
        },
      ];
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedWinId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setFocusedWinId((prev) => (prev === id ? null : prev));
  }, []);

  const maximizeWindow = useCallback((id) => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;

        // If already maximized, restore to previous dimensions
        if (w._prevX != null) {
          const { _prevX, _prevY, _prevW, _prevH, ...rest } = w;
          return { ...rest, x: _prevX, y: _prevY, w: _prevW, h: _prevH };
        }

        // Store current dimensions and maximize
        return {
          ...w,
          _prevX: w.x,
          _prevY: w.y,
          _prevW: w.w,
          _prevH: w.h,
          x: 0,
          y: 0,
          w: vw,
          h: vh,
        };
      })
    );
  }, []);

  const updateWindowPosition = useCallback((id, x, y) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback((id, w, h) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, w, h } : win))
    );
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows([]);
    setFocusedWinId(null);
  }, []);

  const value = useMemo(
    () => ({
      windows,
      focusedWinId,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      closeAllWindows,
    }),
    [
      windows,
      focusedWinId,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
      closeAllWindows,
    ]
  );

  return (
    <WindowCtx.Provider value={value}>
      {children}
    </WindowCtx.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowCtx);
  if (!ctx) throw new Error('useWindows must be used within a WindowProvider');
  return ctx;
}
