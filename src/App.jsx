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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-200 via-pink-300 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white fade-in">
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <LanguageToggle isJapanese={isJapanese} toggleLanguage={toggleLanguage} />
      <Hero isJapanese={isJapanese} rikaImage={rikaImage} />
      <AboutMe isJapanese={isJapanese} />
      <SocialLinks />
    </div>
  );
}

export default App;
