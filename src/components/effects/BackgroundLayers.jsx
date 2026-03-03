import { useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function BackgroundLayers() {
  const { theme } = useTheme();

  const layers = useMemo(() => {
    const id = theme.id;

    if (id === 'ghibli') {
      // Clouds + mountains
      const clouds = [];
      for (let i = 0; i < 6; i++) {
        const s = 100 + Math.random() * 200;
        clouds.push({
          key: `cloud-${i}`,
          className: 'cloud',
          style: {
            width: s,
            height: s * 0.5,
            top: `${5 + Math.random() * 20}%`,
            left: `${Math.random() * 100}%`,
            animation: `cloudDrift ${40 + Math.random() * 40}s linear infinite`,
          },
        });
      }
      const mountainColors = ['#8a9a7a', '#7a8a6a', '#6a7a5a'];
      const mountains = [];
      for (let i = 0; i < 5; i++) {
        const h = 60 + Math.random() * 80;
        mountains.push({
          key: `mountain-${i}`,
          style: {
            position: 'absolute',
            bottom: 0,
            left: `${-5 + i * 22}%`,
            borderLeft: `${80 + Math.random() * 60}px solid transparent`,
            borderRight: `${80 + Math.random() * 60}px solid transparent`,
            borderBottom: `${h}px solid ${mountainColors[i % 3]}`,
            opacity: 0.15,
          },
        });
      }
      return { clouds, mountains, type: 'ghibli' };
    }

    if (id === 'holographic') {
      return { type: 'holographic' };
    }

    if (id === 'terrarium') {
      // Pebbles
      const pColors = ['rgba(138,106,58,0.15)', 'rgba(120,100,70,0.12)', 'rgba(160,130,80,0.1)'];
      const pebbles = [];
      for (let i = 0; i < 25; i++) {
        const s = 4 + Math.random() * 12;
        pebbles.push({
          key: `pebble-${i}`,
          style: {
            position: 'absolute',
            width: s,
            height: s * 0.8,
            borderRadius: '50% 45% 55% 50%',
            background: pColors[Math.floor(Math.random() * 3)],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          },
        });
      }
      // Condensation
      const drops = [];
      for (let i = 0; i < 12; i++) {
        const s = 4 + Math.random() * 8;
        drops.push({
          key: `drop-${i}`,
          style: {
            position: 'absolute',
            width: s,
            height: s,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%,rgba(255,255,255,0.15),rgba(255,255,255,0.03))',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            animation: `condensationGrow ${8 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          },
        });
      }
      return { pebbles, drops, type: 'terrarium' };
    }

    // Kawaii: background handled by CSS pseudo-elements
    return { type: 'kawaii' };
  }, [theme.id]);

  if (layers.type === 'ghibli') {
    return (
      <div id="themeBackgroundLayers">
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {layers.clouds.map((c) => (
            <div key={c.key} className={c.className} style={c.style} />
          ))}
        </div>
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '15vh', zIndex: 0, pointerEvents: 'none' }}>
          {layers.mountains.map((m) => (
            <div key={m.key} style={m.style} />
          ))}
        </div>
      </div>
    );
  }

  if (layers.type === 'holographic') {
    return (
      <div id="themeBackgroundLayers">
        <div className="holo-scanlines" />
        <div className="holo-vignette" />
      </div>
    );
  }

  if (layers.type === 'terrarium') {
    return (
      <div id="themeBackgroundLayers">
        <div className="terr-mist" />
        <div className="terr-butterfly" />
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {layers.pebbles.map((p) => (
            <div key={p.key} style={p.style} />
          ))}
        </div>
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          {layers.drops.map((d) => (
            <div key={d.key} style={d.style} />
          ))}
        </div>
      </div>
    );
  }

  // Kawaii: no extra layers needed (CSS handles it)
  return <div id="themeBackgroundLayers" />;
}
