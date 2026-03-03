import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import { WindowProvider } from './contexts/WindowContext';
import Desktop from './components/os/Desktop';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AudioProvider>
          <WindowProvider>
            <Desktop />
          </WindowProvider>
        </AudioProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
