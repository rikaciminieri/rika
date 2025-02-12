import PropTypes from "prop-types";
import { Link } from "react-router-dom";

Hero.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
  rikaImage: PropTypes.string.isRequired,
};

export default function Hero({ isJapanese, rikaImage }) {
  return (
    <section className="text-center p-6">
      <img
        src={rikaImage}
        alt="Rika Profile Photo"
        className="w-36 h-36 rounded-full shadow-lg mb-4 mx-auto"
      />
      <h1 className="text-4xl font-extrabold mb-2 animate-pulse text-white dark:text-gray-100">
        {isJapanese ? "👋🏼 莉香です！" : "👋🏼, I'm Rika!"}
      </h1>
      <p className="text-lg font-light text-white dark:text-gray-300">
        {isJapanese ? (
          <>
            フルスタックエンジニア | 問題解決者 | 自称コメディアン |{" "}
            <Link
              to="/grilled-cheese/jp"
              className="underline hover:text-yellow-400 transition-colors"
            >
              グリルドチーズ大好き人間
            </Link>
          </>
        ) : (
          <>
            Full-Stack Engineer | Problem Solver | Self-proclaimed Comedian |{" "}
            <Link
              to="/grilled-cheese"
              className="underline hover:text-yellow-400 transition-colors"
            >
              Grilled Cheese Enthusiast
            </Link>
          </>
        )}
      </p>
    </section>
  );
}
