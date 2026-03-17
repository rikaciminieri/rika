import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useWindows } from '../../contexts/WindowContext';
import { useTerminal } from '../../hooks/useTerminal';

export default function TerminalApp() {
  const { theme, switchTheme } = useTheme();
  const { openApp, closeAllWindows } = useWindows();
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const { output, execute } = useTerminal({
    theme,
    openApp,
    switchTheme,
    closeAllWindows,
  });

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      execute(input);
      setInput('');
    }
  };

  // Derive terminal style from theme
  const termStyle = theme.termBg || {};

  return (
    <div
      className="terminal"
      style={termStyle}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Welcome message */}
      <div className="output" style={{ whiteSpace: 'pre-wrap' }}>
        {theme.termWelcome || 'RikaOS terminal — type "help" for commands\n\n'}
      </div>

      {/* Output history */}
      {output.map((line, i) => (
        <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
      ))}

      {/* Input line */}
      <div className="term-input-line">
        <span className="prompt">{theme.termPrompt || 'rika ~ % '}</span>
        <input
          ref={inputRef}
          className="term-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
