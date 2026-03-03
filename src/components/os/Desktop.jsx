import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAudio } from '../../contexts/AudioContext';
import BootScreen from './BootScreen';
import DesktopIcons from './DesktopIcons';
import WindowContainer from './WindowContainer';
import Taskbar from './Taskbar';
import Particles from '../effects/Particles';
import BackgroundLayers from '../effects/BackgroundLayers';
import ThemeTransition from '../effects/ThemeTransition';
import CursorTrail from '../effects/CursorTrail';
import CheeseRain, { triggerCheeseRain } from '../effects/CheeseRain';
import Screensaver from '../effects/Screensaver';
import WatermarkCanvas from '../effects/WatermarkCanvas';
import DesktopToy from '../effects/DesktopToy';
import CommandPalette from '../systems/CommandPalette';
import ContextMenu from '../systems/ContextMenu';
import { useWindows } from '../../contexts/WindowContext';
import useKonamiCode from '../../hooks/useKonamiCode';
import useIdleTimer from '../../hooks/useIdleTimer';

export default function Desktop() {
  const { theme } = useTheme();
  const { openApp } = useWindows();
  const { initAudio, startAmbientHum } = useAudio();
  const [booted, setBooted] = useState(false);
  const [desktopVisible, setDesktopVisible] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [screensaverActive, setScreensaverActive] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setDesktopVisible(true);
    // Auto-open About/Welcome after boot
    setTimeout(() => openApp('welcome'), 100);
  }, [openApp]);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // Init audio on first click
  useEffect(() => {
    const handleFirstClick = () => {
      initAudio();
      startAmbientHum();
    };
    document.addEventListener('click', handleFirstClick, { once: true });
    return () => document.removeEventListener('click', handleFirstClick);
  }, [initAudio, startAmbientHum]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Konami code → cheese rain
  useKonamiCode(triggerCheeseRain);

  // Idle timer → screensaver
  useIdleTimer(
    useCallback(() => setScreensaverActive(true), []),
    useCallback(() => setScreensaverActive(false), [])
  );

  return (
    <>
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      <div
        id="desktop"
        style={{
          position: 'fixed', inset: 0,
          display: 'flex', flexDirection: 'column',
          opacity: desktopVisible ? 1 : 0,
          transition: 'opacity 0.8s 0.3s',
        }}
      >
        {/* Background */}
        <div className="desktop-bg" />

        {/* Watermark canvas (behind everything) */}
        <WatermarkCanvas />

        {/* Theme-specific background layers */}
        <BackgroundLayers />

        {/* Floating particles */}
        <Particles />

        {/* Desktop Icons */}
        <DesktopIcons />

        {/* Windows */}
        <WindowContainer />

        {/* Taskbar */}
        <Taskbar onOpenPalette={openPalette} />
      </div>

      {/* Cursor trail */}
      <CursorTrail />

      {/* Desktop toy (double-click empty area) */}
      <DesktopToy />

      {/* Command Palette overlay */}
      <CommandPalette open={paletteOpen} onClose={closePalette} />

      {/* Right-click context menu */}
      <ContextMenu onOpenPalette={openPalette} />

      {/* Cheese rain (Konami code) */}
      <CheeseRain />

      {/* Screensaver */}
      <Screensaver
        active={screensaverActive}
        onDismiss={() => setScreensaverActive(false)}
      />

      {/* Theme transition overlay */}
      <ThemeTransition />
    </>
  );
}
