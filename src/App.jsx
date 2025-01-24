import "./App.css";
import { useState } from "react";
import rikaImage from "./assets/rika.jpeg";
import DarkModeToggle from "./components/darkModeToggle";
import LanguageToggle from "./components/languageToggle";
import Hero from "./components/hero";
import AboutMe from "./components/aboutMe";
import SocialLinks from "./components/socialLinks";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isJapanese, setIsJapanese] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLanguage = () => {
    setIsJapanese(!isJapanese);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-300 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white fade-in px-8 sm:px-6 py-24">
      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-8 flex flex-col items-center">
        <div>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <LanguageToggle
            isJapanese={isJapanese}
            toggleLanguage={toggleLanguage}
          />
        </div>
        <Hero isJapanese={isJapanese} rikaImage={rikaImage} />
        <AboutMe isJapanese={isJapanese} />
        <SocialLinks />
      </div>
    </div>
  );
}

export default App;
