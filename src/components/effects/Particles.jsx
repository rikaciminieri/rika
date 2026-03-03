import { useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Particles() {
  const { theme } = useTheme();

  const particles = useMemo(() => {
    const colors = theme.particleColors || ['var(--accent)'];
    const count = theme.particleCount || 15;
    const id = theme.id;
    const result = [];

    if (id === 'ghibli') {
      // Soot sprites
      for (let i = 0; i < 8; i++) {
        result.push({
          key: `soot-${i}`,
          className: 'soot-sprite',
          style: {
            left: `${Math.random() * 100}%`,
            top: `${30 + Math.random() * 50}%`,
            animation: `sootWander ${8 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          },
        });
      }
      // Petals
      for (let i = 0; i < 12; i++) {
        result.push({
          key: `petal-${i}`,
          className: 'petal',
          style: {
            left: `${Math.random() * 100}%`,
            animation: `petalFall ${18 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
          },
        });
      }
    } else if (id === 'holographic') {
      // Shards
      for (let i = 0; i < 10; i++) {
        result.push({
          key: `shard-${i}`,
          className: 'holo-shard',
          style: {
            left: `${Math.random() * 100}%`,
            borderBottomColor: colors[Math.floor(Math.random() * colors.length)],
            animationDuration: `${12 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 15}s`,
          },
        });
      }
      // Lines
      for (let i = 0; i < 6; i++) {
        result.push({
          key: `line-${i}`,
          className: 'holo-line',
          style: {
            left: `${Math.random() * 100}%`,
            animationDuration: `${20 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 20}s`,
          },
        });
      }
    } else if (id === 'terrarium') {
      // Pollen
      for (let i = 0; i < count; i++) {
        const s = 3 + Math.random() * 4;
        result.push({
          key: `pollen-${i}`,
          className: 'terr-particle',
          style: {
            width: s,
            height: s,
            left: `${Math.random() * 100}%`,
            top: `${50 + Math.random() * 50}%`,
            background: colors[Math.floor(Math.random() * colors.length)],
            animationDuration: `${12 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 15}s`,
          },
        });
      }
    } else {
      // Kawaii: floating circles
      for (let i = 0; i < count; i++) {
        const s = 4 + Math.random() * 6;
        result.push({
          key: `particle-${i}`,
          className: 'particle',
          style: {
            width: s,
            height: s,
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDuration: `${15 + Math.random() * 15}s`,
            animationDelay: `${Math.random() * 20}s`,
          },
        });
      }
    }

    return result;
  }, [theme.id, theme.particleColors, theme.particleCount]);

  return (
    <div className="floating-particles">
      {particles.map((p) => (
        <div key={p.key} className={p.className} style={p.style} />
      ))}
    </div>
  );
}
