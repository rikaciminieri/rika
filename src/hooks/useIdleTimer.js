import { useEffect, useRef, useCallback } from 'react';

const IDLE_TIMEOUT = 120000; // 2 minutes

export default function useIdleTimer(onIdle, onActive) {
  const timerRef = useRef(null);

  const reset = useCallback(() => {
    if (onActive) onActive();
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onIdle, IDLE_TIMEOUT);
  }, [onIdle, onActive]);

  useEffect(() => {
    timerRef.current = setTimeout(onIdle, IDLE_TIMEOUT);

    document.addEventListener('keydown', reset);
    document.addEventListener('mousemove', reset);
    document.addEventListener('click', reset);
    document.addEventListener('touchstart', reset);

    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('keydown', reset);
      document.removeEventListener('mousemove', reset);
      document.removeEventListener('click', reset);
      document.removeEventListener('touchstart', reset);
    };
  }, [reset, onIdle]);
}
