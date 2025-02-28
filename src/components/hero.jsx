import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { decorationStyles } from "../definitions/reusableStyles";
import useBoop from "../hooks/useBoop";
import { animated } from "react-spring";

Hero.propTypes = {
  isJapanese: PropTypes.bool.isRequired,
  rikaImage: PropTypes.string.isRequired,
};

export default function Hero({ isJapanese, rikaImage }) {
  const [style, trigger] = useBoop({
    rotation: 10,
    springConfig: {
      tension: 600,
      friction: 10,
    },
  });
  return (
    <section className="text-center p-6">
      <img
        src={rikaImage}
        alt="Rika Profile Photo"
        className="w-36 h-36 rounded-full shadow-lg mb-4 mx-auto"
      />

      <h1 className="text-4xl font-extrabold mb-2 text-white dark:text-gray-100">
        {isJapanese ? (
          <>
            <animated.span
              style={style}
              onMouseEnter={trigger}
              className="inline-block"
            >
              👋🏼
            </animated.span>{" "}
            莉香です！
          </>
        ) : (
          <>
            <animated.span
              style={style}
              onMouseEnter={trigger}
              className="inline-block"
            >
              👋🏼
            </animated.span>
            , I&apos;m Rika!
          </>
        )}
      </h1>
      <p className="text-lg font-light text-white dark:text-gray-300">
        {isJapanese ? (
          <>
            フルスタックエンジニア | 問題解決者 | 自称コメディアン |{" "}
            <Link
              to="/grilled-cheese/jp"
              className={decorationStyles.underline}
            >
              グリルドチーズ大好き人間
            </Link>
          </>
        ) : (
          <>
            Full-Stack Engineer | Problem Solver | Self-proclaimed Comedian |{" "}
            <Link to="/grilled-cheese" className={decorationStyles.underline}>
              Grilled Cheese Enthusiast
            </Link>
          </>
        )}
      </p>
    </section>
  );
}
