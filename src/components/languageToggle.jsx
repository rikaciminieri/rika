import PropTypes from "prop-types";

LanguageToggle.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};

export default function LanguageToggle({ isJapanese, toggleLanguage }) {
  return (
    <button
      onClick={toggleLanguage}
      className="absolute top-14 right-4 inline-flex items-center cursor-pointer w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none"
    >
      <span className="sr-only">{isJapanese ? "English" : "日本語"}</span>
      <span className="absolute left-2 text-sm font-bold text-gray-700 dark:text-gray-300">
        EN
      </span>
      <span className="absolute right-2 text-sm font-bold text-gray-700 dark:text-gray-300">
        JP
      </span>
      <span
        className={`${
          isJapanese ? "translate-x-7" : "translate-x-1"
        } inline-block w-6 h-5 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
      />
    </button>
  );
}
