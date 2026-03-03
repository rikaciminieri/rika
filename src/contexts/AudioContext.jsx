import { createContext, useContext, useCallback, useRef } from 'react';
import { useTheme } from './ThemeContext';

const AudioCtx = createContext();

const SCALE_ORDER = ['welcome', 'projects', 'terminal', 'gallery', 'currently', 'gc', 'japan', 'trash'];

export function AudioProvider({ children }) {
  const { theme } = useTheme();
  const audioCtxRef = useRef(null);
  const ambientRef = useRef(null);
  const scaleProgressRef = useRef(0);
  const melodyUnlockedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const playBoop = useCallback((freq = 520, duration = 0.08, vol = 0.12, type = 'sine') => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + duration);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, []);

  const startAmbientHum = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx || ambientRef.current) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = theme.ambientType || 'sine';
    osc.frequency.setValueAtTime(theme.ambientFreq || 110, ctx.currentTime);
    gain.gain.setValueAtTime(theme.ambientVol || 0.006, ctx.currentTime);
    if (theme.ambientFilter) {
      const filter = ctx.createBiquadFilter();
      filter.type = theme.ambientFilter.type;
      filter.frequency.setValueAtTime(theme.ambientFilter.freq, ctx.currentTime);
      osc.connect(filter).connect(gain).connect(ctx.destination);
    } else {
      osc.connect(gain).connect(ctx.destination);
    }
    osc.start();
    ambientRef.current = osc;
  }, [theme]);

  const playScaleNote = useCallback((appId) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const scale = theme.musicalScale;
    if (!scale) return;

    // Play the note for this icon
    const note = scale[appId];
    if (note) {
      playBoop(note.freq, 0.15, 0.08, theme.scaleNoteType || 'sine');
    }

    // Track scale progress for melody unlock
    if (SCALE_ORDER[scaleProgressRef.current] === appId) {
      scaleProgressRef.current++;
      if (scaleProgressRef.current >= SCALE_ORDER.length && !melodyUnlockedRef.current) {
        melodyUnlockedRef.current = true;
        // Play full melody
        SCALE_ORDER.forEach((id, i) => {
          setTimeout(() => {
            const n = scale[id];
            if (n) playBoop(n.freq, 0.2, 0.1, theme.scaleNoteType || 'sine');
          }, i * 80);
        });
      }
    } else if (SCALE_ORDER[0] === appId) {
      scaleProgressRef.current = 1;
    } else {
      scaleProgressRef.current = 0;
    }
  }, [theme, playBoop]);

  const value = { initAudio, playBoop, playScaleNote, startAmbientHum };

  return (
    <AudioCtx.Provider value={value}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used within an AudioProvider');
  return ctx;
}
