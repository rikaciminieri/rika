import PropTypes from "prop-types";
import DarkModeToggle from "./darkModeToggle";
import LanguageToggle from "./languageToggle";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  forcedLanguage: PropTypes.string.isRequired,
};

function Layout({ children, forcedLanguage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [isJapanese, setIsJapanese] = useState(
    forcedLanguage === "jp" || searchParams.get("lang") === "jp"
  );

  useEffect(() => {
    setIsJapanese(forcedLanguage === "jp" || searchParams.get("lang") === "jp");
  }, [forcedLanguage, searchParams]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLanguage = () => {
    const newLanguage = !isJapanese;
    setSearchParams({ lang: newLanguage ? "jp" : "en" });

    const currentPath = window.location.pathname;
    if (currentPath.includes("grilled-cheese")) {
      navigate(newLanguage ? "/grilled-cheese/jp" : "/grilled-cheese");
    } else {
      navigate(newLanguage ? "/jp" : "/");
    }
  };

  // Simplified children handling
  const childWithProps = React.isValidElement(children)
    ? React.cloneElement(children, { isJapanese })
    : children;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-400 to-pink-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white fade-in px-8 sm:px-6 py-24">
      <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-8 flex flex-col items-center">
        <div>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <LanguageToggle
            isJapanese={isJapanese}
            toggleLanguage={toggleLanguage}
          />
        </div>
        {childWithProps}
      </div>
    </div>
  );
}

export default Layout;
