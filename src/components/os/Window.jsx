import { useRef, useEffect, useCallback, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows } from '../../contexts/WindowContext';

export default function Window({ win, children }) {
  const { t } = useLanguage();
  const { focusedWinId, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useWindows();
  const windowRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const snapRef = useRef(null);
  const snapIndicatorRef = useRef(null);

  // Two-phase minimize: animate first, then hide
  const [hidden, setHidden] = useState(false);
  const prevMinimized = useRef(win.minimized);

  useEffect(() => {
    if (win.minimized && !prevMinimized.current) {
      // Started minimizing — let CSS animation play, then hide
      const timer = setTimeout(() => setHidden(true), 300);
      prevMinimized.current = true;
      return () => clearTimeout(timer);
    }
    if (!win.minimized && prevMinimized.current) {
      // Un-minimizing — show immediately so open animation plays
      setHidden(false);
      prevMinimized.current = false;
    }
  }, [win.minimized]);

  // Resolve the app label via i18n
  const appLabel = t(win.appId === 'welcome' ? 'apps.about' : `apps.${win.appId}`);

  // --- Drag ---
  const handleDragStart = useCallback((e) => {
    if (e.target.closest('.win-dot')) return;
    e.preventDefault();
    focusWindow(win.id);
    const rect = windowRef.current.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: rect.left,
      origY: rect.top,
    };
  }, [win.id, focusWindow]);

  // --- Resize ---
  const handleResizeStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = windowRef.current.getBoundingClientRect();
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origW: rect.width,
      origH: rect.height,
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Handle drag
      if (dragRef.current) {
        const nx = dragRef.current.origX + (e.clientX - dragRef.current.startX);
        const ny = dragRef.current.origY + (e.clientY - dragRef.current.startY);
        if (windowRef.current) {
          windowRef.current.style.left = nx + 'px';
          windowRef.current.style.top = ny + 'px';
        }

        // Snap-to-edge detection
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const SNAP_THRESHOLD = 20;
        let newSnap = null;

        if (e.clientX < SNAP_THRESHOLD) {
          newSnap = { left: 0, top: 0, width: vw / 2, height: vh };
        } else if (e.clientX > vw - SNAP_THRESHOLD) {
          newSnap = { left: vw / 2, top: 0, width: vw / 2, height: vh };
        } else if (e.clientY < SNAP_THRESHOLD) {
          newSnap = { left: 0, top: 0, width: vw, height: vh };
        }

        snapRef.current = newSnap;
        if (snapIndicatorRef.current) {
          if (newSnap) {
            snapIndicatorRef.current.style.display = 'block';
            snapIndicatorRef.current.style.left = newSnap.left + 'px';
            snapIndicatorRef.current.style.top = newSnap.top + 'px';
            snapIndicatorRef.current.style.width = newSnap.width + 'px';
            snapIndicatorRef.current.style.height = newSnap.height + 'px';
          } else {
            snapIndicatorRef.current.style.display = 'none';
          }
        }
      }

      // Handle resize
      if (resizeRef.current) {
        const nw = Math.max(320, resizeRef.current.origW + (e.clientX - resizeRef.current.startX));
        const nh = Math.max(200, resizeRef.current.origH + (e.clientY - resizeRef.current.startY));
        if (windowRef.current) {
          windowRef.current.style.width = nw + 'px';
          windowRef.current.style.height = nh + 'px';
        }
      }
    };

    const handleMouseUp = () => {
      // Snap on drag release
      if (dragRef.current && snapRef.current) {
        const s = snapRef.current;
        if (windowRef.current) {
          windowRef.current.style.left = s.left + 'px';
          windowRef.current.style.top = s.top + 'px';
          windowRef.current.style.width = s.width + 'px';
          windowRef.current.style.height = s.height + 'px';
        }
        updateWindowPosition(win.id, s.left, s.top);
        updateWindowSize(win.id, s.width, s.height);
        snapRef.current = null;
      } else if (dragRef.current && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        updateWindowPosition(win.id, rect.left, rect.top);
      }

      // Commit resize
      if (resizeRef.current && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        updateWindowSize(win.id, rect.width, rect.height);
      }

      dragRef.current = null;
      resizeRef.current = null;

      if (snapIndicatorRef.current) {
        snapIndicatorRef.current.style.display = 'none';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [win.id, updateWindowPosition, updateWindowSize]);

  const isFocused = win.id === focusedWinId;

  return (
    <>
      {/* Snap indicator — rendered outside window for correct stacking */}
      <div ref={snapIndicatorRef} className="snap-indicator" style={{ display: 'none' }} />

      <div
        ref={windowRef}
        className={`window ${win.minimized ? 'minimized' : ''} ${isFocused ? 'focused' : ''}`}
        id={`win-${win.id}`}
        style={{
          left: win.x,
          top: win.y,
          width: win.w,
          height: win.h,
          zIndex: win.z,
          display: hidden ? 'none' : undefined,
        }}
        onMouseDown={() => focusWindow(win.id)}
      >
        {/* Header — drag handle */}
        <div className="win-header" onMouseDown={handleDragStart}>
          <div className="win-dots">
            <button className="win-dot close" onClick={() => closeWindow(win.id)} />
            <button className="win-dot minimize" onClick={() => minimizeWindow(win.id)} />
            <button className="win-dot maximize" onClick={() => maximizeWindow(win.id)} />
          </div>
          <div className="win-title">{appLabel}</div>
        </div>

        {/* Body */}
        <div className="win-body">
          {children}
        </div>

        {/* Resize handle */}
        <div className="win-resize" onMouseDown={handleResizeStart} />
      </div>
    </>
  );
}
