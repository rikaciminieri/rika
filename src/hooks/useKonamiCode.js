import { useEffect, useRef } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function useKonamiCode(onActivate) {
  const idxRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === KONAMI[idxRef.current]) {
        idxRef.current++;
        if (idxRef.current === KONAMI.length) {
          idxRef.current = 0;
          onActivate();
        }
      } else {
        idxRef.current = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onActivate]);
}
