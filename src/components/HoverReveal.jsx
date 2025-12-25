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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Play audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      // Get the trigger element's position for emoji spawn
      if (event?.target && !displayedContent) {
        const rect = event.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        createEmojis(x, y);
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
    return "bg-white dark:bg-black rounded-lg shadow-lg p-4";
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
          </>
        )}
      </span>

      <EmojiSpringRenderer emojis={emojis} />
    </>
  );
}
