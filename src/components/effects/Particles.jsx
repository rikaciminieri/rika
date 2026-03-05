import { useMemo, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/* THEMES_DISABLED — This component previously rendered theme-specific particles
   (ghibli soot sprites/petals, holographic shards/lines, terrarium pollen).
   When re-enabling themes, restore the theme.id branching from git history. */

const PUSH_RADIUS = 120;
const PUSH_STRENGTH = 40;
const SPRING_DECAY = 0.92;
const MAX_DISPLACEMENT = 60;

export default function Particles() {
  const { theme } = useTheme();
  const particleEls = useRef([]);
  const offsetsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  const setParticleRef = useCallback((el, index) => {
    particleEls.current[index] = el;
  }, []);

  const particles = useMemo(() => {
    const colors = theme.particleColors || ['var(--accent)'];
    const result = [];

    // Kawaii: stars, sparkles, and hearts
    for (let i = 0; i < 14; i++) {
      const s = 8 + Math.random() * 10;
      result.push({
        key: `star-${i}`,
        className: 'kawaii-star',
        style: {
          width: s,
          height: s,
          left: `${Math.random() * 100}%`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: `${18 + Math.random() * 15}s`,
          animationDelay: `${Math.random() * 20}s`,
        },
      });
    }
    for (let i = 0; i < 10; i++) {
      const s = 5 + Math.random() * 6;
      result.push({
        key: `sparkle-${i}`,
        className: 'kawaii-sparkle',
        style: {
          width: s,
          height: s,
          left: `${Math.random() * 100}%`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: `${16 + Math.random() * 14}s`,
          animationDelay: `${Math.random() * 20}s`,
        },
      });
    }
    for (let i = 0; i < 4; i++) {
      const s = 10 + Math.random() * 6;
      result.push({
        key: `heart-${i}`,
        className: 'kawaii-heart',
        style: {
          width: s,
          height: s,
          left: `${Math.random() * 100}%`,
          animationDuration: `${20 + Math.random() * 12}s`,
          animationDelay: `${Math.random() * 20}s`,
        },
      });
    }

    return result;
  }, [theme.particleColors]);

  // Mouse repulsion for kawaii particles
  useEffect(() => {
    offsetsRef.current = particles.map(() => ({ x: 0, y: 0 }));

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const els = particleEls.current;
      const offsets = offsetsRef.current;

      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const off = offsets[i];

        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - off.x;
        const cy = rect.top + rect.height / 2 - off.y;

        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PUSH_RADIUS && dist > 0) {
          const force = PUSH_STRENGTH * (1 - dist / PUSH_RADIUS);
          const nx = dx / dist;
          const ny = dy / dist;
          off.x += nx * force;
          off.y += ny * force;
        }

        off.x *= SPRING_DECAY;
        off.y *= SPRING_DECAY;

        const mag = Math.sqrt(off.x * off.x + off.y * off.y);
        if (mag > MAX_DISPLACEMENT) {
          off.x = (off.x / mag) * MAX_DISPLACEMENT;
          off.y = (off.y / mag) * MAX_DISPLACEMENT;
        }

        el.style.translate = `${off.x}px ${off.y}px`;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      particleEls.current.forEach((el) => {
        if (el) el.style.translate = '';
      });
    };
  }, [particles]);

  return (
    <div className="floating-particles">
      {particles.map((p, i) => (
        <div
          key={p.key}
          className={p.className}
          style={p.style}
          ref={(el) => setParticleRef(el, i)}
        />
      ))}
    </div>
  );
}
