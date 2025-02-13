import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
import { decorationStyles } from "../definitions/reusableStyles";
HoverReveal.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  triggerText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default function HoverReveal({ content, triggerText, className = "" }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (displayedContent) {
      setDisplayedContent("");
      return;
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
  }, [content, displayedContent]);

  const getVariantStyles = () => {
    return "bg-white dark:bg-black rounded-lg shadow-lg p-4";
  };

  return (
    <span
      className="inline relative"
      onMouseEnter={!isMobile ? handleInteraction : undefined}
      onMouseLeave={!isMobile ? handleInteraction : undefined}
      onClick={isMobile ? handleInteraction : undefined}
    >
      <span
        className={`cursor-pointer ${decorationStyles.underline} ${className}`}
      >
        {triggerText}
      </span>
      {displayedContent && (
        <>
          <div
            className={`absolute left-1/2 ${
              isMobile ? "fixed top-1/2 -translate-y-1/2" : "top-full"
            } mt-2 translate-x-1/2 min-w-[250px] w-[80%] ml-10 sm:w-auto max-w-[600px] z-50 animate-reveal-pop ${getVariantStyles()}`}
          >
            <div className="relative z-10">
              <span className="opacity-0 animate-text-reveal inline-block text-black dark:text-white">
                {displayedContent}
                {isTyping && <span className="animate-blink">|</span>}
              </span>
            </div>
          </div>

          {/* Improved Sparkle Placement for Mobile */}
          <span className="absolute left-[50%] top-[95%] sm:top-[89%] -mt-3 text-2xl opacity-0 animate-sparkle">
            ✨
          </span>
          <span className="absolute left-[60%] top-[95%] sm:top-[90%] -mt-4 text-xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
          <span className="absolute left-[35%] top-[95%] sm:top-[90%] -translate-y-4 text-2xl opacity-0 animate-sparkle">
            ✨
          </span>
          <span className="absolute right-[40%] top-[96%] sm:top-[92%] -translate-y-6 text-xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
          <span className="absolute left-[70%] top-[95%] sm:top-[89%] -mt-3 text-2xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
          <span className="absolute right-[50%] top-[96%] sm:top-[91%] -translate-y-5 text-xl opacity-0 animate-sparkle-delayed">
            ✨
          </span>
        </>
      )}
    </span>
  );
}
