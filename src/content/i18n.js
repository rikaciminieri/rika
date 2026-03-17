// i18n Strategy:
// - All plain text → i18n.js via t('section.key')
// - JSX content (contains <a>, <span>, components) → inline isJP ternary in component
// - Data arrays (sandwiches, theories) → co-located { en, jp } objects

export const i18n = {
  en: {
    apps: {
      about: 'about',
      projects: 'projects',
      terminal: 'terminal',
      gallery: 'gallery',
      gc: 'grilled cheese',
      contact: 'contact',
      trash: 'trash',
      currently: 'currently',
      japan: 'japan',
    },

    welcome: {
      title: 'welcome to RikaOS!',
      body: `<p>hey! i'm <strong>Rika Ciminieri</strong> — half-japanese full-stack engineer at Eventbrite.</p><p>former microbiology student turned tech advocate. i pivoted from petri dishes to pixels because i realized i liked debugging code more than debugging cell cultures.</p><p>i paint, build tiny book nooks, do pilates, have deeply researched One Piece theories, and rank grilled cheeses competitively. i go to japan almost every year.</p><p class="aside">currently into: Bridgerton, The Traitors, Heated Rivalry, learning AI, Monopoly Deal, and learning how to sing.</p><p class="aside">pro tip: press ⌘K to open the command palette. right-click anywhere for more options.</p>`,
    },

    about: {
      greeting: '\uD83D\uDC4B\uD83C\uDFFC, i\'m Rika!',
      subtitle: 'full-stack engineer | problem solver | self-proclaimed comedian | grilled cheese enthusiast',
      para2: 'former microbiology student \uD83E\uDDEB\uD83D\uDD2C turned tech advocate \uD83D\uDCBB. i pivoted from petri dishes to pixels because i realized i liked debugging code more than debugging cell cultures.',
      para4: 'let\'s connect if you want to chat about pop culture, human biology, or The Rock (yes i mean Dwayne Johnson).',
      opTrigger: 'One Piece theories',
      opPrefix: 'when i\'m not working, you\'ll find me painting \uD83C\uDFA8, doing pilates \uD83E\uDDD8\u200D\u2640\uFE0F, crafting tiny book nooks \uD83D\uDCDA\u2728, or diving into ',
      opSuffix: ' \uD83C\uDFF4\u200D\u2620\uFE0F',
      tip: 'pro tip: press \u2318K to open the command palette. right-click anywhere for more options.',
    },

    gc: {
      title: 'grilled cheese olympics',
      hunt: "i'm on the hunt to find the best grilled cheese in america. here are my favorites so far.",
    },

    projects: {
      title: 'projects',
      portfolio: 'this portfolio',
      portfolioDesc: 'a full desktop OS experience built with React, Vite, and Tailwind CSS. 4 themes, window manager, terminal, easter eggs.',
      cms: 'bilingual CMS',
      cmsDesc: 'content management system with full EN/JP support, MDX rendering, and automatic language detection.',
      events: 'event platform',
      eventsDesc: 'real-time event management platform with live attendee tracking and analytics dashboard.',
      lab: 'lab dashboard',
      labDesc: 'data visualization dashboard with live WebSocket feeds, built for monitoring scientific equipment.',
      gcApi: 'grilled cheese API',
      gcApiDesc: 'RESTful API for rating and ranking grilled cheese sandwiches. yes, this is real.',
      ai: 'AI experiments',
      aiDesc: 'collection of experiments with the Claude API — from code generation to creative writing assistants.',
    },

    gallery: {
      title: 'gallery',
      sunset: 'sunset over Shibuya',
      sunsetDesc: 'paint-by-numbers, acrylic on canvas. gift for a friend.',
      hobbit: 'hobbit hole book nook',
      hobbitDesc: 'miniature diorama. balsa wood, LED lights, moss.',
      wave: 'the great wave (remix)',
      waveDesc: 'paint-by-numbers with my own color palette twist.',
      diagon: 'Diagon Alley nook',
      diagonDesc: 'book nook insert. 60% complete. tiny wands inside.',
      cherry: 'cherry blossom garden',
      cherryDesc: 'miniature zen garden with hand-painted cherry blossoms.',
    },

    currently: {
      title: 'currently',
      watching: 'watching',
      reading: 'reading',
      playing: 'playing',
      learning: 'learning',
      listening: 'listening',
      hills: 'hills i\'ll die on',
    },

    japan: {
      title: '日本 — japan',
      subtitle: 'heritage, not decoration.',
      onsen: 'onsen rankings',
      konbini: 'konbini tier list',
      drama: 'drama corner',
      nowplaying: 'now playing',
    },

    contact: {
      step1Title: "who's sliding into my inbox?",
      step1Placeholder: 'your name',
      step2Title: "what's this about?",
      topics: {
        work: "let's work together \uD83D\uDCBC",
        hi: "just saying hi \uD83D\uDC4B",
        cheese: "grilled cheese debate \uD83E\uDDC0",
        other: "something else \u2728",
      },
      step3Title: 'tell me more...',
      step3Placeholders: [
        'tell me about your wildest project idea...',
        'hot take on grilled cheese? i\'m listening...',
        'fun fact about yourself? i\'ll trade you one...',
      ],
      step4Title: 'where should i reply?',
      step4Placeholder: 'your@email.com',
      send: 'send it! \u2728',
      sending: 'sending...',
      successTitle: 'message sent!',
      successBody: "thanks, {name}! i'll get back to you soon.",
      errorTitle: 'oops!',
      errorBody: 'something went wrong. try again or email me directly.',
      back: '\u2190 back',
      next: 'next \u2192',
      sendAnother: 'send another?',
      tryAgain: 'try again',
      typing: 'rika is typing',
      charEmpty: 'crickets...',
      charGoing: 'now we\'re talking!',
      charLong: 'i love the enthusiasm!',
      mailTo: 'to: rikaciminieri@gmail.com',
      mailFrom: 'from: {name}',
      mailSubject: 're: {topic}',
    },

    trash: {
      title: 'trash',
      finderBack: '← back',
    },

    context: {
      switchLang: 'switch to 日本語',
    },

    watermark: {
      text: 'rika ciminieri',
    },
  },

  jp: {
    apps: {
      about: 'プロフィール',
      projects: 'プロジェクト',
      terminal: 'ターミナル',
      gallery: 'ギャラリー',
      gc: 'グリルドチーズ',
      contact: 'メール',
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

    contact: {
      step1Title: '誰からのメッセージ？',
      step1Placeholder: 'お名前',
      step2Title: 'どんな用件？',
      topics: {
        work: '一緒に働きましょう \uD83D\uDCBC',
        hi: 'ちょっと挨拶 \uD83D\uDC4B',
        cheese: 'グリルドチーズ論争 \uD83E\uDDC0',
        other: 'その他 \u2728',
      },
      step3Title: 'もう少し詳しく...',
      step3Placeholders: [
        '最高にワクワクするプロジェクトのアイデアを教えて...',
        'グリルドチーズについての熱い意見？聞かせて...',
        'あなたの面白い事実は？交換しよう...',
      ],
      step4Title: 'どこに返信すればいい？',
      step4Placeholder: 'your@email.com',
      send: '送信！ \u2728',
      sending: '送信中...',
      successTitle: '送信完了！',
      successBody: 'ありがとう、{name}さん！すぐにお返事しますね。',
      errorTitle: 'おっと！',
      errorBody: '何か問題が発生しました。もう一度試すか、直接メールしてください。',
      back: '\u2190 戻る',
      next: '次へ \u2192',
      sendAnother: 'もう一通送る？',
      tryAgain: 'もう一度',
      typing: '莉香が入力中',
      charEmpty: 'しーん...',
      charGoing: 'いい感じ！',
      charLong: '熱意がすごい！',
      mailTo: 'To: rikaciminieri@gmail.com',
      mailFrom: 'From: {name}',
      mailSubject: 'Re: {topic}',
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
