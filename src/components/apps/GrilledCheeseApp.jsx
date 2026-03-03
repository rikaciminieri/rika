import { useLanguage } from '../../contexts/LanguageContext';
import andytownGc from '../../assets/andytown-gc.jpg';
import starbucksGc from '../../assets/starbucks-gc.jpg';
import meltGc from '../../assets/melt-gc.jpg';

const SANDWICHES = [
  {
    medal: '\uD83E\uDD47',
    image: andytownGc,
    link: 'https://www.andytownsf.com',
    en: {
      name: 'Cheese Toastie @ Andytown',
      desc: "I had this sandwich literally 2 days ago (02/11/25) and it made me build this page. Perfectly toasted housemade pain de mie with cheddar cheese and mayonnaise. It's a good grilled cheese.",
    },
    jp: {
      name: '\u30C1\u30FC\u30BA\u30C8\u30FC\u30B9\u30C6\u30A3\u30FC @ \u30A2\u30F3\u30C7\u30A3\u30BF\u30A6\u30F3',
      desc: '\u3061\u3087\u3046\u30692\u65E5\u524D\uFF082025\u5E742\u670811\u65E5\uFF09\u306B\u3053\u306E\u30B5\u30F3\u30C9\u30A4\u30C3\u30C1\u3092\u98DF\u3079\u3066\u3001\u3053\u306E\u30DA\u30FC\u30B8\u3092\u4F5C\u308B\u3053\u3068\u306B\u3057\u305F\u304F\u3089\u3044\u7F8E\u5473\u3057\u3044\u3002\u7D76\u5999\u306B\u30C8\u30FC\u30B9\u30C8\u3055\u308C\u305F\u81EA\u5BB6\u88FD\u30D1\u30F3\u30FB\u30C9\u30FB\u30DF\u306B\u30C1\u30A7\u30C0\u30FC\u30C1\u30FC\u30BA\u3068\u30DE\u30E8\u30CD\u30FC\u30BA\u3002\u30B7\u30F3\u30D7\u30EB\u3060\u3051\u3069\u3001\u7F8E\u5473\u3057\u3044\u30B0\u30EA\u30EB\u30C9\u30C1\u30FC\u30BA\u3060\u3088\u3002',
    },
  },
  {
    medal: '\uD83E\uDD48',
    image: starbucksGc,
    link: 'https://www.starbucks.com/menu/product/2123039/single',
    en: {
      name: 'Crispy Grilled Cheese on Sourdough @ Starbucks',
      desc: "I know what you're thinking \u2014 it's a Starbucks sandwich and you're questioning my palate. PLEASE do not sleep on this and try it the next time you need a quick snack. It's garlicky, cheesy, and crispy. This had my gold medal slot until I had Andytown's.",
    },
    jp: {
      name: '\u30B5\u30EF\u30FC\u30C9\u30A6\u306E\u30AF\u30EA\u30B9\u30D4\u30FC\u30B0\u30EA\u30EB\u30C9\u30C1\u30FC\u30BA @ \u30B9\u30BF\u30FC\u30D0\u30C3\u30AF\u30B9',
      desc: '\u300C\u30B9\u30BF\u30D0\u306E\u30B5\u30F3\u30C9\u30A4\u30C3\u30C1\uFF1F\u300D\u3063\u3066\u601D\u3063\u305F\u3067\u3057\u3087\uFF1F \u305D\u3057\u3066\u3001\u79C1\u306E\u5473\u899A\u3092\u7591\u3063\u3066\u308B\u304B\u3082\u306D\u3002\u3060\u3051\u3069\u3001\u3053\u308C\u306F\u672C\u5F53\u306B\u4FAE\u308C\u306A\u3044\u304B\u3089\u3001\u6B21\u306B\u30B5\u30AF\u30C3\u3068\u4F55\u304B\u98DF\u3079\u305F\u3044\u3068\u304D\u306B\u305C\u3072\u8A66\u3057\u3066\u307B\u3057\u3044\u3002\u30AC\u30FC\u30EA\u30C3\u30AF\u306E\u98A8\u5473\u304C\u52B9\u3044\u3066\u3066\u3001\u30C1\u30FC\u30BA\u305F\u3063\u3077\u308A\u3067\u3001\u30AB\u30EA\u30C3\u3068\u3057\u305F\u98DF\u611F\u304C\u6700\u9AD8\u3002',
    },
  },
  {
    medal: '\uD83E\uDD49',
    image: meltGc,
    link: 'https://www.themelt.com/menu/melted-classics/three-cheese-classic',
    en: {
      name: 'Three Cheese Classic @ The Melt',
      desc: "The sandwich \uD83E\uDD1D tomato soup combo is unmatched. I get this delivered to my house which means I haven't even had it at its full potential yet, and it has never disappointed me.",
    },
    jp: {
      name: '3\u7A2E\u30C1\u30FC\u30BA\u30AF\u30E9\u30B7\u30C3\u30AF @ \u30B6\u30FB\u30E1\u30EB\u30C8',
      desc: '\u3053\u306E\u30B5\u30F3\u30C9\u30A4\u30C3\u30C1 \uD83E\uDD1D \u30C8\u30DE\u30C8\u30B9\u30FC\u30D7\u306E\u7D44\u307F\u5408\u308F\u305B\u306F\u6700\u5F37\u3002\u3057\u304B\u3082\u3001\u79C1\u306F\u3053\u308C\u3092\u30C7\u30EA\u30D0\u30EA\u30FC\u3067\u983C\u3093\u3067\u308B\u304B\u3089\u3001\u672C\u6765\u306E\u30DD\u30C6\u30F3\u30B7\u30E3\u30EB\u3092100%\u767A\u63EE\u3057\u305F\u72B6\u614B\u3067\u306F\u307E\u3060\u98DF\u3079\u305F\u3053\u3068\u304C\u306A\u3044\u306E\u306B\u3001\u305D\u308C\u3067\u3082\u6BCE\u56DE\u5927\u6E80\u8DB3\u3002',
    },
  },
];

const BRACKET = [
  [
    { a: 'The Classic', b: 'Swiss & Mushroom', winner: 'The Classic' },
    { a: 'Truffle Melt', b: 'Pepper Jack Jalape\u00F1o', winner: 'Truffle Melt' },
    { a: 'Brie & Fig', b: 'Mac & Cheese Melt', winner: 'Brie & Fig' },
    { a: 'Gouda Smoked', b: 'Caprese Grilled', winner: 'Gouda Smoked' },
  ],
  [
    { a: 'The Classic', b: 'Truffle Melt', winner: 'The Classic' },
    { a: 'Brie & Fig', b: 'Gouda Smoked', winner: 'Brie & Fig' },
  ],
  [
    { a: 'The Classic', b: 'Brie & Fig', winner: 'The Classic' },
  ],
];

export default function GrilledCheeseApp() {
  const { lang, t } = useLanguage();
  const isJP = lang === 'jp';

  return (
    <div className="notepad-content gc-app">
      <h2>{t('gc.title')}</h2>
      <p className="gc-hunt">{t('gc.hunt')}</p>

      {/* Real sandwich cards with photos */}
      <div className="gc-real-cards">
        {SANDWICHES.map((s, i) => {
          const info = isJP ? s.jp : s.en;
          return (
            <div
              key={i}
              className="gc-real-card"
              onClick={() => window.open(s.link, '_blank')}
            >
              <div className="gc-card-image">
                <img src={s.image} alt={info.name} />
                <span className="gc-card-medal">{s.medal}</span>
              </div>
              <div className="gc-card-body">
                <h3>{info.name}</h3>
                <p>{info.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tournament bracket */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, marginTop: 24 }}>
        {t('gc.bracketTitle')}
      </h3>
      <div className="gc-bracket">
        {BRACKET.map((round, ri) => (
          <div key={ri} className="gc-round">
            {round.map((match, mi) => (
              <div key={mi} className="gc-match">
                <div className={`gc-matchup ${match.winner === match.a ? 'winner' : ''}`}>
                  <span>{match.a}</span>
                </div>
                <div className={`gc-matchup ${match.winner === match.b ? 'winner' : ''}`}>
                  <span>{match.b}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
