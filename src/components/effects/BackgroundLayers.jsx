import { useMemo } from 'react';

/* THEMES_DISABLED — This component previously rendered theme-specific backgrounds
   (ghibli clouds/mountains, holographic scanlines, terrarium mist/pebbles/drops).
   When re-enabling themes, restore the theme.id branching from git history. */

export default function BackgroundLayers() {
  const clouds = useMemo(() => {
    const cloudConfigs = [
      { color: 'rgba(244,160,181,0.08)', w: 350, h: 200, top: '10%', left: '15%', dur: 35 },
      { color: 'rgba(196,176,232,0.07)', w: 280, h: 180, top: '25%', left: '65%', dur: 42 },
      { color: 'rgba(248,196,164,0.06)', w: 320, h: 160, top: '55%', left: '35%', dur: 38 },
      { color: 'rgba(126,203,163,0.05)', w: 260, h: 200, top: '70%', left: '80%', dur: 45 },
      { color: 'rgba(244,160,181,0.06)', w: 300, h: 170, top: '40%', left: '5%', dur: 40 },
    ];
    return cloudConfigs.map((c, i) => ({
      key: `kawaii-cloud-${i}`,
      style: {
        position: 'absolute',
        width: c.w,
        height: c.h,
        top: c.top,
        left: c.left,
        borderRadius: '50%',
        background: c.color,
        filter: 'blur(40px)',
        animation: `kawaiiCloudDrift ${c.dur}s ease-in-out infinite`,
        animationDelay: `${i * -7}s`,
      },
    }));
  }, []);

  return (
    <div id="themeBackgroundLayers">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {clouds.map((c) => (
          <div key={c.key} style={c.style} />
        ))}
      </div>
    </div>
  );
}
