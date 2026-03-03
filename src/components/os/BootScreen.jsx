import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function BootScreen({ onComplete }) {
  const { theme } = useTheme();
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    // Schedule boot messages
    const timers = theme.bootMessages.map((msg) => {
      return setTimeout(() => {
        setLines(prev => [...prev, msg]);
      }, msg.delay);
    });
    timersRef.current = timers;

    // End boot
    const endTimer = setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        onComplete();
      }, 600); // wait for fade-out transition
    }, theme.bootDuration);
    timers.push(endTimer);

    return () => timers.forEach(clearTimeout);
  }, [theme, onComplete]);

  return (
    <div
      id="boot-screen"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', background: theme.bootBg,
        transition: 'opacity 0.6s',
        opacity: done ? 0 : 1,
        pointerEvents: done ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* Boot logo */}
      <div style={{
        fontFamily: 'var(--display)', fontSize: 48, fontWeight: 800,
        background: 'linear-gradient(135deg,#f4a0b5,#f8c4a4)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: 32, letterSpacing: '-0.03em',
      }}>
        RikaOS
      </div>

      {/* Boot lines */}
      <div style={{ fontSize: 12, textAlign: 'left', width: 400, maxWidth: '90vw' }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.cls ? (theme.bootLineColors[line.cls] || theme.bootLineColors.default) : theme.bootLineColors.default,
              animation: 'bootFade 0.3s forwards',
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        width: 400, maxWidth: '90vw', height: 3, borderRadius: 2,
        marginTop: 24, overflow: 'hidden', background: '#222',
      }}>
        <div style={{
          height: '100%', width: 0, borderRadius: 2,
          background: 'linear-gradient(90deg,#f4a0b5,#f8c4a4)',
          animation: `bootFill ${theme.bootDuration / 1000}s ease-in-out forwards`,
        }} />
      </div>
    </div>
  );
}
