// i18n Strategy:
// - All plain text → i18n.js via t('section.key')
// - JSX content (contains <a>, <span>, components) → inline isJP ternary in component
// - Data arrays (sandwiches, theories) → co-located { en, jp } objects

export const i18n = {
  en: {
    apps: {
      about: 'About',
      projects: 'Projects',
      terminal: 'Terminal',
      gallery: 'Gallery',
      gc: 'Grilled Cheese',
      trash: 'Trash',
      currently: 'Currently',
      japan: 'Japan',
    },

    welcome: {
      title: 'Welcome to RikaOS!',
      body: `<p>Hey! I'm <strong>Rika Ciminieri</strong> — half-Japanese full-stack engineer at Eventbrite.</p><p>Former microbiology student turned tech advocate. I pivoted from petri dishes to pixels because I realized I liked debugging code more than debugging cell cultures.</p><p>I paint, build tiny book nooks, do pilates, have deeply researched One Piece theories, and rank grilled cheeses competitively. I go to Japan almost every year.</p><p class="aside">Currently into: Bridgerton, The Traitors, Heated Rivalry, learning AI, Monopoly Deal, and learning how to sing.</p><p class="aside">Pro tip: Press ⌘K to open the command palette. Right-click anywhere for more options.</p>`,
    },

    about: {
      greeting: '\uD83D\uDC4B\uD83C\uDFFC, I\'m Rika!',
      subtitle: 'Full-Stack Engineer | Problem Solver | Self-proclaimed Comedian | Grilled Cheese Enthusiast',
      para2: 'Former microbiology student \uD83E\uDDEB\uD83D\uDD2C turned tech advocate \uD83D\uDCBB. I pivoted from petri dishes to pixels because I realized I liked debugging code more than debugging cell cultures.',
      para4: 'Let\'s connect if you want to chat about pop culture, human biology, or The Rock (yes I mean Dwayne Johnson).',
      opTrigger: 'One Piece theories',
      opPrefix: 'When I\'m not working, you\'ll find me painting \uD83C\uDFA8, doing pilates \uD83E\uDDD8\u200D\u2640\uFE0F, crafting tiny book nooks \uD83D\uDCDA\u2728, or diving into ',
      opSuffix: ' \uD83C\uDFF4\u200D\u2620\uFE0F',
      tip: 'Pro tip: Press \u2318K to open the command palette. Right-click anywhere for more options.',
    },

    gc: {
      title: 'Grilled Cheese Olympics',
      hunt: "I'm on the hunt to find the best grilled cheese in America. Here are my favorites so far.",
      bracketTitle: 'Tournament Bracket',
    },

    projects: {
      title: 'Projects',
      portfolio: 'This Portfolio',
      portfolioDesc: 'A full desktop OS experience built with React, Vite, and Tailwind CSS. 4 themes, window manager, terminal, Easter eggs.',
      cms: 'Bilingual CMS',
      cmsDesc: 'Content management system with full EN/JP support, MDX rendering, and automatic language detection.',
      events: 'Event Platform',
      eventsDesc: 'Real-time event management platform with live attendee tracking and analytics dashboard.',
      lab: 'Lab Dashboard',
      labDesc: 'Data visualization dashboard with live WebSocket feeds, built for monitoring scientific equipment.',
      gcApi: 'Grilled Cheese API',
      gcApiDesc: 'RESTful API for rating and ranking grilled cheese sandwiches. Yes, this is real.',
      ai: 'AI Experiments',
      aiDesc: 'Collection of experiments with the Claude API — from code generation to creative writing assistants.',
    },

    gallery: {
      title: 'Gallery',
      sunset: 'Sunset Over Shibuya',
      sunsetDesc: 'Paint-by-numbers, acrylic on canvas. Gift for a friend.',
      hobbit: 'Hobbit Hole Book Nook',
      hobbitDesc: 'Miniature diorama. Balsa wood, LED lights, moss.',
      wave: 'The Great Wave (Remix)',
      waveDesc: 'Paint-by-numbers with my own color palette twist.',
      diagon: 'Diagon Alley Nook',
      diagonDesc: 'Book nook insert. 60% complete. Tiny wands inside.',
      cherry: 'Cherry Blossom Garden',
      cherryDesc: 'Miniature zen garden with hand-painted cherry blossoms.',
    },

    currently: {
      title: 'Currently',
      watching: 'Watching',
      reading: 'Reading',
      playing: 'Playing',
      learning: 'Learning',
      listening: 'Listening',
      hills: 'Hills I\'ll Die On',
    },

    japan: {
      title: '日本 — Japan',
      subtitle: 'Heritage, not decoration.',
      onsen: 'Onsen Rankings',
      konbini: 'Konbini Tier List',
      drama: 'Drama Corner',
      nowplaying: 'Now Playing',
    },

    trash: {
      title: 'Trash',
      finderBack: '← Back',
    },

    context: {
      switchLang: 'Switch to 日本語',
    },

    watermark: {
      text: 'RIKA CIMINIERI',
    },
  },

  jp: {
    apps: {
      about: 'プロフィール',
      projects: 'プロジェクト',
      terminal: 'ターミナル',
      gallery: 'ギャラリー',
      gc: 'グリルドチーズ',
      trash: 'ゴミ箱',
      currently: '今ハマってる',
      japan: '日本',
    },

    welcome: {
      title: 'RikaOSへようこそ！',
      body: `<p>こんにちは！<strong>Rika Ciminieri</strong>です。日米ハーフのフルスタックエンジニアで、Eventbriteで働いています。</p><p>元微生物学の学生からテック業界へ転身。シャーレの培養よりコードのデバッグの方が好きだと気づきました。</p><p>絵を描いたり、小さなブックヌックを作ったり、ピラティスをしたり、ワンピースの考察を深く研究したり、グリルドチーズのランキングも本気でやっています。</p><p class="aside">ヒント: ⌘Kでコマンドパレットを開けます。右クリックでメニューも。</p>`,
    },

    about: {
      greeting: '\uD83D\uDC4B\uD83C\uDFFC 莉香です！',
      subtitle: 'フルスタックエンジニア | 問題解決者 | 自称コメディアン | グリルドチーズ大好き人間',
      para2: '微生物学専攻の学生 \uD83E\uDDEB\uD83D\uDD2C からテックアドボケイト \uD83D\uDCBB に転身。クリエイティブな方法で人々をサポートし、エンパワーメントすることに情熱を注いでいます。',
      para4: 'ポップカルチャー、人類生物学、そしてもちろんあの「ロック様」（そう、ドウェイン・ジョンソンのことです）についてお話ししたい方、ぜひつながりましょう！',
      opTrigger: 'ワンピースの考察',
      opPrefix: '仕事をしていないときは、絵を描いたり \uD83C\uDFA8、ピラティスをしたり \uD83E\uDDD8\u200D\u2640\uFE0F、小さな本の隠れ家を作ったり \uD83D\uDCDA\u2728、',
      opSuffix: ' に夢中になったりしています \uD83C\uDFF4\u200D\u2620\uFE0F',
      tip: 'ヒント: ⌘Kでコマンドパレットを開けます。右クリックでメニューも。',
    },

    gc: {
      title: 'グリルドチーズオリンピック',
      hunt: 'アメリカ最高のグリルドチーズを探す旅に出てる。今のところのお気に入りはこれ！',
      bracketTitle: 'トーナメント表',
    },

    projects: {
      title: 'プロジェクト',
      portfolio: 'このポートフォリオ',
      portfolioDesc: 'React、Vite、Tailwind CSSで構築したデスクトップOS体験。4テーマ、ウィンドウマネージャー、ターミナル、隠し機能あり。',
      cms: 'バイリンガルCMS',
      cmsDesc: 'EN/JP完全対応のコンテンツ管理システム。MDXレンダリングと自動言語検出機能付き。',
      events: 'イベントプラットフォーム',
      eventsDesc: 'リアルタイム参加者トラッキングと分析ダッシュボード搭載のイベント管理プラットフォーム。',
      lab: 'ラボダッシュボード',
      labDesc: 'WebSocketライブフィード対応のデータ可視化ダッシュボード。科学機器モニタリング用。',
      gcApi: 'グリルドチーズAPI',
      gcApiDesc: 'グリルドチーズサンドイッチの評価・ランキング用RESTful API。はい、本物です。',
      ai: 'AI実験室',
      aiDesc: 'Claude APIを使った実験コレクション — コード生成からクリエイティブライティングアシスタントまで。',
    },

    gallery: {
      title: 'ギャラリー',
      sunset: '渋谷の夕日',
      sunsetDesc: '塗り絵、アクリル画。友人へのプレゼント。',
      hobbit: 'ホビットの穴ブックヌック',
      hobbitDesc: 'ミニチュアジオラマ。バルサ材、LED、苔。',
      wave: '神奈川沖浪裏（リミックス）',
      waveDesc: 'オリジナルカラーパレットで塗り絵をアレンジ。',
      diagon: 'ダイアゴン横丁ヌック',
      diagonDesc: 'ブックヌック。60%完成。中に小さな杖あり。',
      cherry: '桜の庭',
      cherryDesc: '手描きの桜付きミニチュア枯山水。',
    },

    currently: {
      title: '今ハマってる',
      watching: '観てる',
      reading: '読んでる',
      playing: '遊んでる',
      learning: '学んでる',
      listening: '聴いてる',
      hills: '譲れないこと',
    },

    japan: {
      title: '日本',
      subtitle: '文化遺産であり、飾りではない。',
      onsen: '温泉ランキング',
      konbini: 'コンビニティアリスト',
      drama: 'ドラマコーナー',
      nowplaying: '今聴いてる曲',
    },

    trash: {
      title: 'ゴミ箱',
      finderBack: '← 戻る',
    },

    context: {
      switchLang: 'Switch to English',
    },

    watermark: {
      text: '莉香チミニエリ',
    },
  },
};
