import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
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

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setDisplayedContent("");
    setIsTyping(false);
  }, []);

  return (
    <>
      <span
        className="hover-reveal-trigger"
        onMouseEnter={!isMobile ? handleMouseEnter : undefined}
        onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        onClick={isMobile ? handleMouseEnter : undefined}
      >
        <span className={`hover-reveal-text ${className}`}>
          {triggerText}
        </span>
        {displayedContent && (
          <div className={`hover-reveal-popup ${isMobile ? 'mobile' : 'desktop'}`}>
            <div className="hover-reveal-inner">
              {isMobile && (
                <button
                  onClick={handleMouseLeave}
                  className="hover-reveal-close"
                  aria-label="Close"
                >
                  ×
                </button>
              )}
              <div className={isMobile ? 'hover-reveal-padded' : ''}>
                <span className="hover-reveal-content">
                  {displayedContent}
                  {isTyping && <span className="hover-reveal-cursor">|</span>}
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
