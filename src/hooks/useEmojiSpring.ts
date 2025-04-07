import { useState, useCallback } from "react";

interface EmojiInstance {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  animationDuration: number;
}

export const useEmojiSpring = (customEmojis?: string[]) => {
  const [emojis, setEmojis] = useState<EmojiInstance[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const cleanupEmoji = useCallback((id: number) => {
    setEmojis((prev) => prev.filter((emoji) => emoji.id !== id));
  }, []);

  const createEmojis = useCallback(
    (x: number, y: number) => {
      const count = 3 + Math.floor(Math.random() * 4);
      const newEmojis: EmojiInstance[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 4;
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        const emojiId = idCounter + i;
        newEmojis.push({
          id: emojiId,
          emoji:
            customEmojis && customEmojis.length > 0
              ? customEmojis[Math.floor(Math.random() * customEmojis.length)]
              : "✨",
          x,
          y,
          scale: 0.7 + Math.random() * 0.8,
          rotation: Math.random() * 720 - 360,
          velocityX,
          velocityY,
          animationDuration: 1 + Math.random() * 0.8,
        });

        setTimeout(() => {
          cleanupEmoji(emojiId);
        }, newEmojis[i].animationDuration * 1000 + 100);
      }

      setEmojis((prev) => [...prev, ...newEmojis]);
      setIdCounter((prev) => prev + count);
    },
    [idCounter, cleanupEmoji, customEmojis]
  );

  return { emojis, createEmojis };
};
