import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
import { decorationStyles } from "../definitions/reusableStyles";
import { useEmojiSpring } from "../hooks/useEmojiSpring";
import { EmojiSpringRenderer } from "./EmojiSpringRenderer";
import { onePieceEmojis } from "../definitions/onePiece";

HoverReveal.propTypes = {
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  triggerText: PropTypes.string.isRequired,
  className: PropTypes.string,
  audioSrc: PropTypes.string,
};

export default function HoverReveal({
  content,
  triggerText,
  className = "",
  audioSrc,
}) {
  const { emojis, createEmojis } = useEmojiSpring(onePieceEmojis);
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize audio
  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const handleMouseEnter = useCallback(
    (event) => {
      // If content is already displayed, close it (toggle behavior)
      if (displayedContent) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setDisplayedContent("");
        setIsTyping(false);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Play audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      // Get the trigger element's position for emoji spawn
      if (event?.target) {
        const rect = event.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        createEmojis(x, y);
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
    },
    [content, displayedContent, createEmojis]
  );

  const handleMouseLeave = useCallback(() => {
    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Clear text and stop typing animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedContent("");
    setIsTyping(false);
  }, []);

  const getVariantStyles = () => {
    return "bg-white dark:bg-black rounded-lg shadow-lg";
  };

  return (
    <>
      <span
        className="inline relative"
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        onClick={isMobile ? handleMouseEnter : undefined}
      >
        <span
          className={`cursor-pointer ${decorationStyles.underline} ${className}`}
        >
          {triggerText}
        </span>
        {displayedContent && (
          <div
            className={`${
              isMobile
                ? "fixed left-1/2 top-1/2 -translate-y-1/2 w-[85%] max-w-[500px] max-h-[70vh] overflow-y-auto mx-auto"
                : "absolute left-1/2 top-full mt-2 w-auto min-w-[250px] max-w-[600px]"
            } z-50 animate-reveal-pop ${getVariantStyles()}`}
          >
            <div className={`relative z-10 ${isMobile ? "p-5" : "p-4"}`}>
              {isMobile && (
                <button
                  onClick={handleMouseLeave}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold leading-none z-20 w-8 h-8 flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              )}
              <div className={isMobile ? "pr-10" : ""}>
                <span className="opacity-0 animate-text-reveal inline-block text-black dark:text-white break-words">
                  {displayedContent}
                  {isTyping && <span className="animate-blink">|</span>}
                </span>
              </div>
            </div>
          </div>
        )}
      </span>

      <EmojiSpringRenderer emojis={emojis} />
    </>
  );
}
