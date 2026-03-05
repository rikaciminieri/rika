import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function CursorTrail() {
  const { theme } = useTheme();
  const dotsRef = useRef([]);
  const lastTimeRef = useRef(0);
  const indexRef = useRef(0);

  useEffect(() => {
    // Kawaii uses glow painting in WatermarkCanvas — no DOM dots needed
    if (theme.id === 'kawaii') return;

    const throttle = theme.cursorThrottle || 50;
    const maxDots = theme.cursorMax || 8;
    const dotStyle = theme.cursorDotStyle || {};
    const trailColors = theme.cursorTrailColors;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTimeRef.current < throttle) return;
      lastTimeRef.current = now;

      const colorOverride = trailColors
        ? { background: trailColors[indexRef.current % trailColors.length] }
        : {};
      indexRef.current++;

      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      Object.assign(dot.style, {
        left: `${e.clientX - 3}px`,
        top: `${e.clientY - 3}px`,
        ...dotStyle,
        ...colorOverride,
      });
      document.body.appendChild(dot);
      dotsRef.current.push(dot);

      requestAnimationFrame(() => dot.classList.add('fade'));
      setTimeout(() => {
        dot.remove();
        dotsRef.current = dotsRef.current.filter((d) => d !== dot);
      }, 400);

      while (dotsRef.current.length > maxDots) {
        const old = dotsRef.current.shift();
        old.remove();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      dotsRef.current.forEach((d) => d.remove());
      dotsRef.current = [];
    };
  }, [theme]);

  return null;
}
