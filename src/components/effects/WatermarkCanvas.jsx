import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

function hexToRgba(hex, alpha) {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

export default function WatermarkCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { lang, t } = useLanguage();
  const stateRef = useRef({
    marks: [],
    lastMarkX: -Infinity,
    lastMarkY: -Infinity,
    colorIndex: 0,
    animId: null,
    w: 0,
    h: 0,
    textImageData: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    const colors = theme.cursorTrailColors || ['#f4a0b5', '#c4b0e8', '#f8c4a4', '#e88fc0'];
    const glow = theme.glowPaint || {};
    const glowRadius = glow.radius || 40;
    const glowOpacity = glow.opacity || 0.12;
    const glowNightOpacity = glow.nightOpacity || 0.15;
    const fadeTime = glow.fadeTime || 3000;
    const minDist = glow.minDistance || 20;
    const maxMarks = glow.maxMarks || 60;

    function init() {
      s.w = window.innerWidth;
      s.h = window.innerHeight;
      canvas.width = s.w * devicePixelRatio;
      canvas.height = s.h * devicePixelRatio;
      canvas.style.width = s.w + 'px';
      canvas.style.height = s.h + 'px';
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      // Pre-render watermark text to an offscreen canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = s.w * devicePixelRatio;
      offscreen.height = s.h * devicePixelRatio;
      const offCtx = offscreen.getContext('2d');
      offCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const text = t('watermark.text');
      const fontSize = lang === 'jp' ? 160 : 120;
      const fontFamily = lang === 'jp'
        ? "'Noto Sans JP', sans-serif"
        : "'Space Grotesk', var(--display), sans-serif";
      offCtx.font = `800 ${fontSize}px ${fontFamily}`;
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#f4a0b5';
      offCtx.fillStyle = accent;
      offCtx.globalAlpha = 0.06;
      offCtx.textAlign = 'right';
      offCtx.textBaseline = 'bottom';
      offCtx.fillText(text, s.w - 60, s.h - 80);

      s.textImageData = offscreen;
    }

    function frame() {
      s.animId = requestAnimationFrame(frame);
      if (document.hidden) return;

      const now = Date.now();
      const isNight = document.body.classList.contains(theme.nightModeClass || 'night-mode');
      const baseOpacity = isNight ? glowNightOpacity : glowOpacity;

      // Clear canvas
      ctx.clearRect(0, 0, s.w, s.h);

      // Draw static watermark text
      if (s.textImageData) {
        ctx.drawImage(s.textImageData, 0, 0, s.w, s.h);
      }

      // Draw glow marks
      const marks = s.marks;
      let writeIdx = 0;
      for (let i = 0; i < marks.length; i++) {
        const mark = marks[i];
        const age = now - mark.t;
        if (age >= fadeTime) continue; // expired

        const alpha = baseOpacity * (1 - age / fadeTime);
        const grad = ctx.createRadialGradient(mark.x, mark.y, 0, mark.x, mark.y, glowRadius);
        grad.addColorStop(0, hexToRgba(mark.color, alpha));
        grad.addColorStop(1, hexToRgba(mark.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mark.x, mark.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Compact — keep alive marks at front
        marks[writeIdx++] = mark;
      }
      marks.length = writeIdx;
    }

    const handleMouseMove = (e) => {
      const dx = e.clientX - s.lastMarkX;
      const dy = e.clientY - s.lastMarkY;
      if (dx * dx + dy * dy < minDist * minDist) return;

      s.lastMarkX = e.clientX;
      s.lastMarkY = e.clientY;

      s.marks.push({
        x: e.clientX,
        y: e.clientY,
        t: Date.now(),
        color: colors[s.colorIndex % colors.length],
      });
      s.colorIndex++;

      // Ring buffer cap
      if (s.marks.length > maxMarks) {
        s.marks.shift();
      }
    };

    const handleResize = () => init();

    init();
    s.animId = requestAnimationFrame(frame);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(s.animId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      s.marks = [];
      s.lastMarkX = -Infinity;
      s.lastMarkY = -Infinity;
      s.colorIndex = 0;
    };
  }, [theme, lang]);

  return (
    <canvas
      ref={canvasRef}
      className="watermark-canvas"
    />
  );
}
