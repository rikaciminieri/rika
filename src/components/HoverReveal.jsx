import PropTypes from "prop-types";
import { useState, useCallback, useRef } from "react";

HoverReveal.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  triggerText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default function HoverReveal({ content, triggerText, className = "" }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const randomIndex = Math.floor(Math.random() * content.length);
    const selectedContent = content[randomIndex];
    setIsTyping(true);
    setDisplayedContent("");

    let index = 0;
    const typeNextChar = () => {
      if (index < selectedContent.length) {
        setDisplayedContent(selectedContent.slice(0, index + 1));
        index++;
        timeoutRef.current = setTimeout(typeNextChar, Math.random() * 5 + 10);
      } else {
        setIsTyping(false);
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, 10);
  }, [content]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedContent("");
    setIsTyping(false);
  }, []);

  const getVariantStyles = () => {
    return "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4";
  };

  return (
    <span
      className="inline relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={`cursor-help underline decoration-dotted decoration-2 hover:text-pink-300 dark:hover:text-blue-300 transition-colors duration-200 ${className}`}
      >
        {triggerText}
      </span>
      {displayedContent && (
        <>
          <div
            className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 min-w-[300px] max-w-[500px] z-50 animate-reveal-pop ${getVariantStyles()}`}
          >
            <div className="relative z-10">
              <span className="opacity-0 animate-text-reveal inline-block text-black dark:text-white">
                {displayedContent}
                {isTyping && <span className="animate-blink">|</span>}
              </span>
            </div>
          </div>
          <span className="absolute left-1/2 top-full mt-2 text-2xl opacity-0 animate-sparkle">
            ✨
          </span>
          <span className="absolute left-2/3 top-full mt-2 text-xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
          <span className="absolute left-1/3 top-full mt-1 text-2xl opacity-0 animate-sparkle">
            ✨
          </span>
          <span className="absolute right-1/3 top-full mt-3 text-xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
          <span className="absolute left-2/3 top-full mt-0 text-2xl opacity-0 animate-sparkle">
            ✨
          </span>
          <span className="absolute right-1/2 top-full mt-2 text-xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
        </>
      )}
    </span>
  );
}
