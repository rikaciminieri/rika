import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const RIPPLE_RES = 4;
const RIPPLE_DAMPING = 0.97;

export default function WatermarkCanvas() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { lang, t } = useLanguage();
  const stateRef = useRef({
    grid: null,
    prevGrid: null,
    refImage: null,
    gridW: 0,
    gridH: 0,
    w: 0,
    h: 0,
    mouseX: -1,
    mouseY: -1,
    animId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const s = stateRef.current;

    function init() {
      s.w = window.innerWidth;
      s.h = window.innerHeight;
      canvas.width = s.w;
      canvas.height = s.h;
      s.gridW = Math.ceil(s.w / RIPPLE_RES);
      s.gridH = Math.ceil(s.h / RIPPLE_RES);
      s.grid = new Float32Array(s.gridW * s.gridH);
      s.prevGrid = new Float32Array(s.gridW * s.gridH);
      renderText(ctx, s);
    }

    function renderText(ctx2d, state) {
      ctx2d.clearRect(0, 0, state.w, state.h);
      const text = t('watermark.text');
      const fontSize = lang === 'jp' ? 160 : 120;
      const fontFamily = lang === 'jp'
        ? "'Noto Sans JP', sans-serif"
        : "'Space Grotesk', var(--display), sans-serif";
      ctx2d.font = `800 ${fontSize}px ${fontFamily}`;
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#f4a0b5';
      ctx2d.fillStyle = accent;
      ctx2d.globalAlpha = 0.06;
      ctx2d.textAlign = 'right';
      ctx2d.textBaseline = 'bottom';
      ctx2d.fillText(text, state.w - 60, state.h - 80);
      ctx2d.globalAlpha = 1.0;
      state.refImage = ctx2d.getImageData(0, 0, state.w, state.h);
      state.grid.fill(0);
      state.prevGrid.fill(0);
    }

    function frame() {
      const { grid, prevGrid, refImage, gridW, gridH, w, h, mouseX, mouseY } = s;
      if (!refImage) { s.animId = requestAnimationFrame(frame); return; }

      // Add ripple at mouse position
      if (mouseX >= 1 && mouseX < gridW - 1 && mouseY >= 1 && mouseY < gridH - 1) {
        grid[mouseY * gridW + mouseX] = 512;
      }

      // Wave propagation
      const newGrid = new Float32Array(gridW * gridH);
      for (let y = 1; y < gridH - 1; y++) {
        for (let x = 1; x < gridW - 1; x++) {
          const idx = y * gridW + x;
          newGrid[idx] = (
            grid[idx - 1] + grid[idx + 1] +
            grid[idx - gridW] + grid[idx + gridW]
          ) / 2 - prevGrid[idx];
          newGrid[idx] *= RIPPLE_DAMPING;
        }
      }
      s.prevGrid = s.grid;
      s.grid = newGrid;

      // Render displaced pixels
      const imgData = new ImageData(new Uint8ClampedArray(refImage.data), w, h);
      const pixels = imgData.data;

      for (let y = 1; y < gridH - 1; y++) {
        for (let x = 1; x < gridW - 1; x++) {
          const idx = y * gridW + x;
          const displacement = newGrid[idx];
          if (Math.abs(displacement) < 0.5) continue;

          const offsetX = Math.round((newGrid[idx - 1] - newGrid[idx + 1]) * 0.5);
          const offsetY = Math.round((newGrid[idx - gridW] - newGrid[idx + gridW]) * 0.5);

          for (let py = 0; py < RIPPLE_RES; py++) {
            for (let px = 0; px < RIPPLE_RES; px++) {
              const destX = x * RIPPLE_RES + px;
              const destY = y * RIPPLE_RES + py;
              const srcX = Math.min(Math.max(destX + offsetX, 0), w - 1);
              const srcY = Math.min(Math.max(destY + offsetY, 0), h - 1);
              const destIdx = (destY * w + destX) * 4;
              const srcIdx = (srcY * w + srcX) * 4;

              pixels[destIdx] = refImage.data[srcIdx];
              pixels[destIdx + 1] = refImage.data[srcIdx + 1];
              pixels[destIdx + 2] = refImage.data[srcIdx + 2];
              pixels[destIdx + 3] = refImage.data[srcIdx + 3];

              const absDisp = Math.abs(displacement);
              if (absDisp > 3) {
                const bloom = Math.min(absDisp / 25, 1);
                pixels[destIdx] = Math.min(255, pixels[destIdx] + bloom * 80);
                pixels[destIdx + 1] = Math.min(255, pixels[destIdx + 1] + bloom * 20);
                pixels[destIdx + 2] = Math.min(255, pixels[destIdx + 2] + bloom * 50);
                pixels[destIdx + 3] = Math.min(255, pixels[destIdx + 3] + bloom * 100);
              }
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      s.animId = requestAnimationFrame(frame);
    }

    const handleMouseMove = (e) => {
      s.mouseX = Math.floor(e.clientX / RIPPLE_RES);
      s.mouseY = Math.floor(e.clientY / RIPPLE_RES);
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
    };
  }, [theme, lang]);

  return (
    <canvas
      ref={canvasRef}
      className="watermark-canvas"
    />
  );
}
