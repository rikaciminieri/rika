export function EmojiSpringRenderer({ emojis }) {
  return emojis.map((emoji) => (
    <div
      key={emoji.id}
      className="fixed pointer-events-none"
      style={{
        left: `${emoji.x}px`,
        top: `${emoji.y}px`,
        fontSize: `${emoji.scale * 2}rem`,
        transform: `translate(-50%, -50%)`,
        zIndex: 9999,
        animation: `emoji-spring ${emoji.animationDuration}s ease-out forwards`,
        "--rotation": `${emoji.rotation}deg`,
        "--scale": emoji.scale,
        "--velocityX": emoji.velocityX,
        "--velocityY": emoji.velocityY,
      }}
    >
      {emoji.emoji}
    </div>
  ));
}
