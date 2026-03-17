import PropTypes from "prop-types";
import { useState, useCallback, useRef, useEffect } from "react";
import { onePieceBounties } from "../definitions/onePiece";

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
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [randomBounty, setRandomBounty] = useState("");
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);
  const popupRef = useRef(null);
  const isRevealedRef = useRef(false);

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
      audioRef.current.volume = 0.3;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (displayedContent && popupRef.current) {
      popupRef.current.scrollIntoView({ behavior: "instant", block: "nearest" });
    }
  }, [!!displayedContent]);

  const reveal = useCallback(() => {
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    const randomIndex = Math.floor(Math.random() * content.length);
    const selectedContent = content[randomIndex];
    const bounty = onePieceBounties[Math.floor(Math.random() * onePieceBounties.length)];
    setRandomBounty(bounty);
    setIsTyping(true);
    setDisplayedContent(selectedContent.charAt(0));

    let index = 1;
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

  const dismissTimeoutRef = useRef(null);

  const dismiss = useCallback(() => {
    // Small delay to prevent oscillation from layout shifts
    if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
    dismissTimeoutRef.current = setTimeout(() => {
      isRevealedRef.current = false;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setDisplayedContent("");
      setIsTyping(false);
    }, 100);
  }, []);

  return (
    <span
      className="hover-reveal-wrapper"
      onMouseEnter={!isMobile ? reveal : undefined}
      onMouseLeave={!isMobile ? dismiss : undefined}
    >
      <span
        className={`hover-reveal-text ${className}`}
        onClick={isMobile ? () => {
          if (isRevealedRef.current) dismiss();
          else reveal();
        } : undefined}
      >
        {triggerText}
      </span>
      {displayedContent && (
        <span
          ref={popupRef}
          className={`whisper-reveal ${isMobile ? "mobile" : "desktop"}`}
        >
          <span className="whisper-inner">
            {isMobile && (
              <button
                onClick={dismiss}
                className="whisper-close"
                aria-label="Close"
              >
                &times;
              </button>
            )}
            <span className="whisper-skull" aria-hidden="true">&#x2620;</span>
            <span className="whisper-theory">
              <span className="whisper-content">
                {displayedContent}
                {isTyping && <span className="whisper-cursor" />}
              </span>
            </span>
            <span className="whisper-bounty">{"\u0E3F"} {randomBounty}</span>
          </span>
        </span>
      )}
    </span>
  );
}
