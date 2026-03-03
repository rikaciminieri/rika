import { useState, useEffect, useCallback } from 'react';

let triggerFn = null;

export function triggerCheeseRain() {
  if (triggerFn) triggerFn();
}

export default function CheeseRain() {
  const [drops, setDrops] = useState([]);

  const rain = useCallback(() => {
    const newDrops = Array.from({ length: 40 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: 20 + Math.random() * 30,
    }));
    setDrops(newDrops);
    setTimeout(() => setDrops([]), 6000);
  }, []);

  useEffect(() => {
    triggerFn = rain;
    return () => { triggerFn = null; };
  }, [rain]);

  if (drops.length === 0) return null;

  return (
    <div className="cheese-rain">
      {drops.map((d) => (
        <div
          key={d.id}
          className="cheese-drop"
          style={{
            left: `${d.left}vw`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            fontSize: `${d.size}px`,
          }}
        >
          {'\uD83E\uDDC0'}
        </div>
      ))}
    </div>
  );
}
