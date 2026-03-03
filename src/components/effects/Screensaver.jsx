import { useTheme } from '../../contexts/ThemeContext';

export default function Screensaver({ active, onDismiss }) {
  const { theme } = useTheme();

  if (!active) return null;

  return (
    <div
      className="screensaver active"
      onClick={onDismiss}
      onMouseMove={onDismiss}
      onKeyDown={onDismiss}
      tabIndex={-1}
      style={{ background: 'var(--bg)', cursor: 'pointer' }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 48,
          opacity: 0.3,
          animation: 'screensaverFloat 6s ease-in-out infinite',
          fontFamily: 'var(--display)',
          color: 'var(--accent)',
        }}
      >
        {theme.startButton?.startsWith('<') ? 'R' : (theme.startButton || 'R')}
      </div>
      <style>{`
        @keyframes screensaverFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -55%) scale(1.1); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
