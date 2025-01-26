import PropTypes from "prop-types";

AboutMe.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
};

export default function AboutMe({ isJapanese }) {
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
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
