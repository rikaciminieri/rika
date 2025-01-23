import "./App.css";
import { useState } from "react";
import rikaImage from "./assets/rika.jpeg";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add or remove the "dark" class from the <html> element
    document.documentElement.classList.toggle("dark");
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
          Full-Stack Software Engineer | Creator | Problem Solver
        </p>
      </section>

      {/* Links Section */}
      <section className="flex space-x-4 mt-6">
        <a
          href="https://github.com/rikaciminieri"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 transition"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 transition"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/rikaciminieri"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 transition"
        >
          X
        </a>
      </section>
    </div>
  );
}

export default App;
