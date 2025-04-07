import PropTypes from "prop-types";
import { aboutMeContent } from "../definitions/aboutMeContent.jsx";
import HoverReveal from "./HoverReveal";
import { onePieceTheories } from "../definitions/onePiece.js";
import React from "react";

AboutMe.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
};

export default function AboutMe({ isJapanese }) {
  const currentContent = isJapanese ? aboutMeContent.jp : aboutMeContent.en;
  const theories = onePieceTheories[isJapanese ? "jp" : "en"];

  const renderParagraph = (paragraph) => {
    // If paragraph is a string, handle One Piece case
    if (
      typeof paragraph === "string" &&
      (paragraph.includes("One Piece") || paragraph.includes("ワンピース"))
    ) {
      return isJapanese ? (
        <div className="text-base">
          仕事をしていないときは、絵を描いたり 🎨、ピラティスをしたり
          🧘‍♀️、小さな本の隠れ家を作ったり 📚✨、
          <HoverReveal
            content={theories}
            variant="map"
            triggerText="ワンピースの考察"
          />
          に夢中になったりしています 🏴‍☠️。
        </div>
      ) : (
        <div className="text-base">
          When I&apos;m not working, you&apos;ll find me painting 🎨, doing
          pilates 🧘‍♀️, crafting tiny book nooks 📚✨, or diving into{" "}
          <HoverReveal
            content={theories}
            variant="map"
            triggerText="One Piece theories"
          />{" "}
          🏴‍☠️.
        </div>
      );
    }
    // If it's already a JSX element, return it as is
    if (React.isValidElement(paragraph)) {
      return paragraph;
    }
    // Otherwise, wrap it in a p tag
    return <p>{paragraph}</p>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto prose prose-lg font-semibold text-white dark:text-gray-200">
        {currentContent.map((paragraph, index) => (
          <div key={index} className="mb-4 relative">
            {renderParagraph(paragraph)}
          </div>
        ))}
      </div>
    </div>
  );
}
