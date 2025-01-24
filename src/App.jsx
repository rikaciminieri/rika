import "./App.css";
import { useState } from "react";
import rikaImage from "./assets/rika.jpeg";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isJapanese, setIsJapanese] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add or remove the "dark" class from the <html> element
    document.documentElement.classList.toggle("dark");
  };

  const toggleLanguage = () => {
    setIsJapanese(!isJapanese);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900 text-white fade-in">
      {/* Dark Mode Toggle - Now positioned absolutely */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 inline-flex items-center cursor-pointer w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none"
      >
        <span className="sr-only">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        {/* Sun icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-1 h-5 w-5 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        {/* Moon icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-1 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <span
          className={`${
            darkMode ? "translate-x-8" : "translate-x-1"
          } inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
        />
      </button>

      {/* Language Toggle - Positioned under dark mode toggle */}
      <button
        onClick={toggleLanguage}
        className="absolute top-14 right-4 inline-flex items-center cursor-pointer w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none"
      >
        <span className="sr-only">{isJapanese ? "English" : "日本語"}</span>
        {/* EN text */}
        <span className="absolute left-2 text-sm font-bold text-gray-700 dark:text-gray-300">
          EN
        </span>
        {/* JP text */}
        <span className="absolute right-2 text-sm font-bold text-gray-700 dark:text-gray-300">
          JP
        </span>
        <span
          className={`${
            isJapanese ? "translate-x-8" : "translate-x-1"
          } inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
        />
      </button>

      {/* Hero Section */}
      <section className="text-center p-6">
        <img
          src={rikaImage}
          alt="Rika Profile Photo"
          className="w-36 h-36 rounded-full shadow-lg mb-4 mx-auto"
        />
        <h1 className="text-4xl font-extrabold mb-2 animate-pulse dark:text-gray-100">
          Rika
        </h1>
        <p className="text-lg font-light dark:text-gray-300">
          {isJapanese
            ? "フルスタックソフトウェアエンジニア | クリエイター | 問題解決者"
            : "Full-Stack Software Engineer | Creator | Problem Solver"}
        </p>
      </section>

      {/* Links Section */}
      <section className="flex space-x-4 mt-6">
        <a
          href="https://github.com/rikaciminieri"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 rounded-full shadow-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/rika-ciminieri/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 rounded-full shadow-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a
          href="https://x.com/rikaciminieri"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 rounded-full shadow-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 transition"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </section>
    </div>
  );
}

export default App;
