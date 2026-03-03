import { useState, useCallback, useRef } from 'react';
import { processCmd } from '../utils/terminalCommands';
import { triggerRain, triggerMatrix, triggerGrow } from '../utils/themeEffects';

export function useTerminal({ theme, openApp, switchTheme, closeAllWindows }) {
  const [output, setOutput] = useState([]);
  const scrollRef = useRef(null);

  const apps = ['welcome', 'projects', 'terminal', 'gallery', 'currently', 'gc', 'japan', 'trash'];

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  const execute = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const promptLine = `<span class="prompt">${theme.termPrompt || 'rika ~ % '}</span><span class="cmd-text">${trimmed}</span>`;

    const context = {
      theme,
      openApp,
      switchTheme,
      apps,
      closeAll: closeAllWindows,
    };

    const result = processCmd(trimmed, context);

    if (result === '__CLEAR__') {
      setOutput([]);
      return;
    }

    // Handle theme-specific effects
    let displayResult = result;
    if (result === '__RAIN__') {
      triggerRain();
      displayResult = 'Rain summoned...';
    } else if (result === '__MATRIX__') {
      triggerMatrix();
      displayResult = 'Entering the matrix...';
    } else if (result === '__GROW__') {
      triggerGrow();
      displayResult = 'Growing...';
    }

    setOutput((prev) => [
      ...prev,
      promptLine,
      ...(displayResult ? [`<span class="output">${displayResult}</span>`] : []),
    ]);

    scrollToBottom();
  }, [theme, openApp, switchTheme, closeAllWindows, scrollToBottom]);

  const clear = useCallback(() => {
    setOutput([]);
  }, []);

  return { output, execute, clear, scrollRef };
}
