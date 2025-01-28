import PropTypes from "prop-types";
import { useState } from "react";
import { onePieceTheories } from "../definitions/onePieceTheories";

AboutMe.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
};

export default function AboutMe({ isJapanese }) {
  const [currentTheory, setCurrentTheory] = useState(null);

  const getRandomTheory = () => {
    const theories = onePieceTheories[isJapanese ? "jp" : "en"];
    const randomIndex = Math.floor(Math.random() * theories.length);
    setCurrentTheory(theories[randomIndex]);
  };

  const clearTheory = () => {
    setCurrentTheory(null);
  };

  const content = {
    en: [
      "Helping women and POC thrive in tech @ LWT 🏳️‍🌈✨",
      "Former microbiology student 🧫🔬 turned tech advocate 💻, finding new ways to support and empower others.",
      "When I'm not working, you'll find me painting 🎨, doing pilates 🧘‍♀️, crafting tiny book nooks 📚✨, or diving into One Piece theories 🏴‍☠️.",
      "Let's connect if you want to chat about pop culture, human biology, or The Rock (yes I mean Dwayne Johnson).",
    ],
    jp: [
      "テック業界にて、女性と有色人種の方々の支援に尽力しています @ LWT 🏳️‍🌈✨",
      "微生物学専攻の学生 🧫🔬 から、テックアドボケイト 💻 に転身。クリエイティブな方法で人々をサポートし、エンパワーメントすることに情熱を注いでいます。",
      "仕事をしていないときは、絵を描いたり 🎨、ピラティスをしたり 🧘‍♀️、小さな本の隠れ家を作ったり 📚✨、ワンピースの考察に夢中になったりしています 🏴‍☠️。",
      "ポップカルチャー、人類生物学、そしてもちろんあの「ロック様」（そう、ドウェイン・ジョンソンのことです）についてお話ししたい方、ぜひつながりましょう！",
    ],
  };

  const currentContent = isJapanese ? content.jp : content.en;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Description Section */}
      <div className="max-w-2xl mx-auto prose prose-lg font-semibold text-white dark:text-gray-200">
        {currentContent.map((paragraph, index) => (
          <p key={index} className="mb-4 relative">
            {paragraph.includes("One Piece") ||
            paragraph.includes("ワンピース") ? (
              <p>
                {isJapanese ? (
                  <>
                    仕事をしていないときは、絵を描いたり 🎨、ピラティスをしたり
                    🧘‍♀️、小さな本の隠れ家を作ったり 📚✨、
                    <span
                      onMouseEnter={getRandomTheory}
                      onMouseLeave={clearTheory}
                      className="cursor-help relative underline decoration-dotted decoration-2 hover:text-pink-300 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      ワンピースの考察
                    </span>
                    に夢中になったりしています 🏴‍☠️。
                  </>
                ) : (
                  <>
                    When I&apos;m not working, you&apos;ll find me painting 🎨,
                    doing pilates 🧘‍♀️, crafting tiny book nooks 📚✨, or diving
                    into{" "}
                    <span
                      onMouseEnter={getRandomTheory}
                      onMouseLeave={clearTheory}
                      className="cursor-help relative underline decoration-dotted decoration-2 hover:text-pink-300 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                      One Piece theories
                    </span>{" "}
                    🏴‍☠️.
                  </>
                )}
                {currentTheory && (
                  <div className="absolute left-0 top-full mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-sm text-gray-800 dark:text-gray-200 w-full z-10 transition-opacity duration-200">
                    {currentTheory}
                  </div>
                )}
              </p>
            ) : (
              paragraph
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
