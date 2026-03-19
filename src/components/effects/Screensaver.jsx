import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

function SunsetScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id="ss-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8c4a4" />
          <stop offset="35%" stopColor="#f4a0b5" />
          <stop offset="70%" stopColor="#c4b0e8" />
          <stop offset="100%" stopColor="#97b8f0" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ss-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4a0b5" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#c4b0e8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#97b8f0" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="ss-glow" cx="50%" cy="55%">
          <stop offset="0%" stopColor="#f5c97e" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#f8c4a4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f8c4a4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ss-sky)" />
      {/* Sun glow + sun */}
      <circle cx="200" cy="155" r="80" fill="url(#ss-glow)" />
      <circle cx="200" cy="155" r="22" fill="#f5c97e" opacity="0.9" />
      {/* Sparkles on water */}
      <circle cx="180" cy="180" r="1.5" fill="white" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="220" cy="175" r="1" fill="white" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="185" r="1" fill="white" opacity="0.5">
        <animate attributeName="opacity" values="0.1;0.7;0.1" dur="1.8s" repeatCount="indefinite" />
      </circle>
      {/* Wave layer 1 */}
      <path fill="url(#ss-water)" opacity="0.8">
        <animate
          attributeName="d"
          dur="4s"
          repeatCount="indefinite"
          values="M0 170 Q50 155 100 170 Q150 185 200 170 Q250 155 300 170 Q350 185 400 170 V300 H0Z;M0 170 Q50 185 100 170 Q150 155 200 170 Q250 185 300 170 Q350 155 400 170 V300 H0Z;M0 170 Q50 155 100 170 Q150 185 200 170 Q250 155 300 170 Q350 185 400 170 V300 H0Z"
        />
      </path>
      {/* Wave layer 2 */}
      <path fill="#c4b0e8" opacity="0.3">
        <animate
          attributeName="d"
          dur="5s"
          repeatCount="indefinite"
          values="M0 185 Q60 172 120 185 Q180 198 240 185 Q300 172 360 185 Q400 193 400 185 V300 H0Z;M0 185 Q60 198 120 185 Q180 172 240 185 Q300 198 360 185 Q400 175 400 185 V300 H0Z;M0 185 Q60 172 120 185 Q180 198 240 185 Q300 172 360 185 Q400 193 400 185 V300 H0Z"
        />
      </path>
      {/* Wave layer 3 */}
      <path fill="#97b8f0" opacity="0.2">
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="M0 200 Q80 190 160 200 Q240 210 320 200 Q380 192 400 200 V300 H0Z;M0 200 Q80 210 160 200 Q240 190 320 200 Q380 208 400 200 V300 H0Z;M0 200 Q80 190 160 200 Q240 210 320 200 Q380 192 400 200 V300 H0Z"
        />
      </path>
      {/* Floating text */}
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fontFamily="'Space Grotesk',sans-serif"
        fontSize="22"
        fontWeight="600"
        fill="white"
        opacity="0.35"
      >
        <animate attributeName="y" values="260;255;260" dur="6s" repeatCount="indefinite" />
        rika
      </text>
    </svg>
  );
}

function NightScene() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id="ns-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1228" />
          <stop offset="50%" stopColor="#2a1f30" />
          <stop offset="100%" stopColor="#3d2c3e" />
        </linearGradient>
        <linearGradient id="ns-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4a0b5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#c4b0e8" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="ns-moonglow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#f5c97e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f5c97e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ns-sky)" />
      {/* Moon glow + crescent */}
      <circle cx="320" cy="55" r="50" fill="url(#ns-moonglow)" />
      <circle cx="320" cy="55" r="20" fill="#f5c97e" opacity="0.7" />
      <circle cx="312" cy="48" r="17" fill="#1a1228" />
      {/* Stars */}
      <circle cx="50" cy="30" r="1.2" fill="white" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="130" cy="20" r="1.5" fill="white" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="35" r="1" fill="white" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="65" r="0.8" fill="white" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="180" cy="50" r="1" fill="white" opacity="0.4">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="370" cy="80" r="0.8" fill="white" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="90" r="1" fill="white" opacity="0.35">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.8s" repeatCount="indefinite" />
      </circle>
      {/* Moon reflection */}
      <ellipse cx="320" cy="180" rx="3" fill="#f5c97e" opacity="0.15">
        <animate attributeName="ry" values="12;18;12" dur="4s" repeatCount="indefinite" />
      </ellipse>
      {/* Wave layer 1 */}
      <path fill="url(#ns-water)" opacity="0.5">
        <animate
          attributeName="d"
          dur="4s"
          repeatCount="indefinite"
          values="M0 170 Q50 155 100 170 Q150 185 200 170 Q250 155 300 170 Q350 185 400 170 V300 H0Z;M0 170 Q50 185 100 170 Q150 155 200 170 Q250 185 300 170 Q350 155 400 170 V300 H0Z;M0 170 Q50 155 100 170 Q150 185 200 170 Q250 155 300 170 Q350 185 400 170 V300 H0Z"
        />
      </path>
      {/* Wave layer 2 */}
      <path fill="#c4b0e8" opacity="0.15">
        <animate
          attributeName="d"
          dur="5s"
          repeatCount="indefinite"
          values="M0 185 Q60 172 120 185 Q180 198 240 185 Q300 172 360 185 Q400 193 400 185 V300 H0Z;M0 185 Q60 198 120 185 Q180 172 240 185 Q300 198 360 185 Q400 175 400 185 V300 H0Z;M0 185 Q60 172 120 185 Q180 198 240 185 Q300 172 360 185 Q400 193 400 185 V300 H0Z"
        />
      </path>
      {/* Wave layer 3 */}
      <path fill="#3d2c3e" opacity="0.4">
        <animate
          attributeName="d"
          dur="6s"
          repeatCount="indefinite"
          values="M0 200 Q80 190 160 200 Q240 210 320 200 Q380 192 400 200 V300 H0Z;M0 200 Q80 210 160 200 Q240 190 320 200 Q380 208 400 200 V300 H0Z;M0 200 Q80 190 160 200 Q240 210 320 200 Q380 192 400 200 V300 H0Z"
        />
      </path>
      {/* Floating text */}
      <text
        x="200"
        y="260"
        textAnchor="middle"
        fontFamily="'Space Grotesk',sans-serif"
        fontSize="20"
        fill="#f4a0b5"
        opacity="0.15"
      >
        <animate attributeName="y" values="260;255;260" dur="6s" repeatCount="indefinite" />
        rika
      </text>
    </svg>
  );
}

export default function Screensaver({ active, onDismiss }) {
  const { nightMode } = useTheme();
  const [visible, setVisible] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    if (active) {
      setDismissing(false);
      // Trigger fade-in on next frame
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      setDismissing(false);
    }
  }, [active]);

  const handleDismiss = useCallback(() => {
    if (dismissing) return;
    setDismissing(true);
    setVisible(false);
    setTimeout(() => {
      setDismissing(false);
      onDismiss();
    }, 500);
  }, [dismissing, onDismiss]);

  if (!active && !dismissing) return null;

  return (
    <div
      className={`screensaver active ${visible ? 'ss-visible' : ''}`}
      onClick={handleDismiss}
      onMouseMove={handleDismiss}
      aria-hidden="true"
    >
      {nightMode ? <NightScene /> : <SunsetScene />}
    </div>
  );
}
