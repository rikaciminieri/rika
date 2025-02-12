import PropTypes from "prop-types";
import andytownGc from "../assets/andytown-gc.jpg";
import starbucksGc from "../assets/starbucks-gc.jpg";
import meltGc from "../assets/melt-gc.jpg";
import { useNavigate } from "react-router-dom";
const GrilledCheese = ({ isJapanese = false }) => {
  const navigate = useNavigate();
  const grilledCheeses = [
    {
      name: isJapanese
        ? "チーズトースティー　＠アンディタウン"
        : "Cheese Toastie @ Andytown",
      description: isJapanese
        ? "ちょうど2日前（2025年2月11日）にこのサンドイッチを食べて、このページを作ることにしたくらい美味しい。絶妙にトーストされた自家製パン・ド・ミにチェダーチーズとマヨネーズ。シンプルだけど、美味しいグリルドチーズだよ。"
        : "I had this sandwich literally 2 days ago (02/11/25) and it made me build this page. Perfectly toasted housemade pain de mie with cheddar cheese and mayonnaise. It's a good grilled cheese.",
      image: andytownGc,
      medal: "🥇",
      link: "https://www.andytownsf.com",
    },
    {
      name: isJapanese
        ? "サワードウのクリスピーグリルドチーズ @ スターバックス"
        : "Crispy Grilled Cheese on Sourdough @ Starbucks",
      description: isJapanese ? (
        "「スタバのサンドイッチ？」って思ったでしょ？ そして、私の味覚を疑ってるかもね。だけど、これは本当に侮れないから、次にサクッと何か食べたいときにぜひ試してほしい。ガーリックの風味が効いてて、チーズたっぷりで、カリッとした食感が最高。実は、これが私の“金メダル”だったんだけど、Andytownのを食べるまではね。"
      ) : (
        <>
          I know what you&apos;re thinking - it&apos;s a Starbucks sandwich and
          you&apos;re questioning my palate.{" "}
          <span className="font-bold italic">PLEASE</span> do not sleep on this
          and try it the next time you need a quick snack. It&apos;s garlicky,
          cheesy, and crispy. This had my gold medal slot until I had
          Andytown&apos;s.
        </>
      ),
      image: starbucksGc,
      medal: "🥈",
      link: "https://www.starbucks.com/menu/product/2123039/single",
    },
    {
      name: isJapanese
        ? "3種チーズクラシック @ ザ・メルト"
        : "Three Cheese Classic @ The Melt",
      description: isJapanese
        ? "このサンドイッチ 🤝 トマトスープの組み合わせは最強。しかも、私はこれをデリバリーで頼んでるから、本来のポテンシャルを100%発揮した状態ではまだ食べたことがないのに、それでも毎回大満足。"
        : "The sandwich 🤝 tomato soup combo is unmatched. I get this delivered to my house which means I haven't even had it at it's full potential yet, and it has never disappointed me. ",
      image: meltGc,
      medal: "🥉",
      link: "https://www.themelt.com/menu/melted-classics/three-cheese-classic",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => (isJapanese ? navigate("/jp") : navigate("/"))}
        className="mb-6 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      >
        {isJapanese ? "⬅️ ホームに戻る" : "⬅️ Back to Home"}
      </button>

      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
        {isJapanese
          ? "グリルドチーズ・オリンピック 🏅🧀"
          : "Grilled Cheese Olympics 🏅🧀"}
      </h1>
      <h3 className="text-center text-gray-900 dark:text-white mb-8">
        {isJapanese
          ? "アメリカで最高のグリルドチーズを探す旅に出てる。今のところのお気に入りはこれ！"
          : "I'm on the hunt to find the best grilled cheese in America. Here are my favorites so far."}
      </h3>

      {/* Top 3 Sandwiches */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {grilledCheeses.map((sandwich, index) => (
          <div
            key={index}
            className="card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={() => {
              window.open(sandwich.link, "_blank");
            }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={sandwich.image}
                alt={sandwich.name}
                className="w-full h-full object-cover"
              />
              <span className="medal absolute top-2 right-2 text-6xl">
                {sandwich.medal}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {sandwich.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {sandwich.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Honorable Mentions */}
      {/* <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        {isJapanese ? "特別賞" : "Honorable Mentions"}
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {honorableMentions.map((sandwich, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={sandwich.image}
                alt={sandwich.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {sandwich.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {sandwich.description}
              </p>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

GrilledCheese.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
};

export default GrilledCheese;
