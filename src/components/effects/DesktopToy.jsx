import { useEffect, useRef } from 'react';
import { useAudio } from '../../contexts/AudioContext';

export default function DesktopToy() {
  const { playBoop } = useAudio();
  const toysRef = useRef([]);

  useEffect(() => {
    const handleDblClick = (e) => {
      // Don't spawn on icons, windows, or taskbar
      if (e.target.closest('.desktop-icon, .window, .taskbar, .cmd-overlay, .ctx-menu')) return;

      playBoop(600, 0.05, 0.06, 'sine');
      spawnToy(e.clientX, e.clientY);
    };

    function spawnToy(x, y) {
      const toy = document.createElement('div');
      toy.className = 'desktop-toy';
      toy.style.left = x + 'px';
      toy.style.top = y + 'px';
      document.body.appendChild(toy);
      toysRef.current.push(toy);

      let vx = (Math.random() - 0.5) * 8;
      let vy = -8 - Math.random() * 4;
      const gravity = 0.3;
      const bounce = 0.6;
      const friction = 0.99;
      let px = x, py = y, life = 0;

      function animate() {
        vy += gravity;
        vx *= friction;
        px += vx;
        py += vy;

        const floor = window.innerHeight - 100;
        if (py > floor) {
          py = floor;
          vy = -vy * bounce;
          if (Math.abs(vy) < 1) vy = 0;
        }
        if (px < 0 || px > window.innerWidth - 18) {
          vx = -vx;
          px = Math.max(0, Math.min(px, window.innerWidth - 18));
        }

        toy.style.left = px + 'px';
        toy.style.top = py + 'px';
        life++;

        if (life < 200 && (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.5 || py < floor)) {
          requestAnimationFrame(animate);
        } else {
          toy.style.transition = 'opacity 0.5s';
          toy.style.opacity = '0';
          setTimeout(() => {
            toy.remove();
            toysRef.current = toysRef.current.filter((t) => t !== toy);
          }, 500);
        }
      }

      requestAnimationFrame(animate);
    }

    document.getElementById('desktop')?.addEventListener('dblclick', handleDblClick);
    return () => {
      document.getElementById('desktop')?.removeEventListener('dblclick', handleDblClick);
      toysRef.current.forEach((t) => t.remove());
      toysRef.current = [];
    };
  }, [playBoop]);

  return null;
}
