export const ghibli = {
  id: 'ghibli',
  name: 'Ghibli',
  vars: {
    '--bg': '#f5ede0',
    '--surface': '#faf7f0',
    '--surface-2': '#ede4d3',
    '--border': '#d4c5a9',
    '--text': '#3a2e1e',
    '--text-muted': '#8a7e6a',
    '--accent': '#c75c3a',
    '--accent-glow': 'rgba(199,92,58,0.25)',
    '--green': '#5a7a4a',
    '--blue': '#4a6a8a',
    '--pink': '#d4858a',
    '--amber': '#c4943a',
    '--red': '#c75c3a',
    '--gold': '#c4943a',
    '--lavender': '#8a7e6a',
    '--peach': '#d4c5a9',
    '--teal': '#5a7a4a',
    '--brown': '#8a6a3a',
    '--taskbar-h': '72px',
    '--radius': '4px',
    '--win-header': '38px',
    '--font': "'Inter','Noto Sans JP',sans-serif",
    '--mono': "'JetBrains Mono',monospace",
    '--display': "'Playfair Display','Klee One',serif",
  },
  nightVars: {
    '--bg': '#0f1020',
    '--surface': '#1a1830',
    '--surface-2': '#141228',
    '--border': '#2a2840',
    '--text': '#e8dfd0',
    '--text-muted': '#8a7e9a',
    '--accent': '#e8a050',
  },
  nightModeClass: 'night-mode',
  getNightModeLabel: (isNight) => (isNight ? '月' : '灯'),
  bootBg: '#1a1510',
  bootMessages: [
    { text: 'RikaOS v2.1 (ghibli) \u2014 awakening...', delay: 0 },
    { text: 'unrolling scroll of /dev/portfolio...       [OK]', cls: 'ok', delay: 300 },
    { text: 'brewing tea for bilingual engine...         [OK]', cls: 'ok', delay: 600 },
    { text: 'summoning soot sprites...                   [OK]', cls: 'ok', delay: 900 },
    { text: 'painting clouds by hand...                  [OK]', cls: 'ok', delay: 1100 },
    { text: 'onsen.service \u2014 too relaxed to start        [WARN]', cls: 'warn', delay: 1300 },
    { text: 'all spirits accounted for. welcome home.', cls: 'ok', delay: 1600 },
  ],
  bootDuration: 3200,
  bootLineColors: { ok: '#5a7a4a', warn: '#c4943a', default: '#7a6e5a' },
  termPrompt: '\u58A8 rika ~ % ',
  termBg: { color: 'var(--text)', background: '#f0e8d0', borderLeft: '4px solid var(--accent)' },
  termWelcome: 'RikaOS \u66F8\u9053 Terminal \u2014 type "help" for commands\n\n',
  startButton: '\u5370',
  startButtonStyle: {
    borderRadius: '50%',
    border: '2px solid var(--accent)',
    background: 'var(--accent)',
    color: '#faf7f0',
    fontSize: '14px',
    fontFamily: 'var(--display)',
    width: '36px',
    height: '36px',
  },
  taskbarStyle: {
    background: 'linear-gradient(180deg,#c4a878,#a88a60)',
    border: '1px solid rgba(138,106,58,0.4)',
    borderRadius: '6px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12),inset 0 1px 0 rgba(255,255,255,0.15)',
  },
  nightTaskbarStyle: {
    background: 'rgba(15,16,32,0.85)',
    borderColor: 'rgba(232,160,80,0.2)',
  },
  musicalScale: {
    welcome: { freq: 293.66 },
    projects: { freq: 311.13 },
    terminal: { freq: 392 },
    gallery: { freq: 440 },
    currently: { freq: 466.16 },
    gc: { freq: 587.33 },
    japan: { freq: 622.25 },
    trash: { freq: 783.99 },
  },
  scaleNoteType: 'sine',
  ambientFreq: 80,
  ambientVol: 0.004,
  ambientType: 'sine',
  iconSVGs: {
    welcome:
      '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="rgba(255,255,255,0.6)" stroke-width="2.5" fill="none" opacity="0.8"/><circle cx="16" cy="16" r="3" fill="rgba(255,255,255,0.5)"/></svg>',
    projects:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"><rect x="6" y="10" width="20" height="14" rx="1.5" fill="rgba(255,255,255,0.1)"/><path d="M6 26h20M10 15h8M10 18h12"/></svg>',
    terminal:
      '<svg viewBox="0 0 32 32" fill="none"><rect x="5" y="7" width="22" height="18" rx="2" fill="rgba(90,122,74,0.15)" stroke="rgba(90,122,74,0.6)" stroke-width="1.2"/><text x="10" y="20" font-family="monospace" font-size="11" fill="rgba(90,122,74,0.9)">\u203A_</text></svg>',
    gallery:
      '<svg viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="17" rx="11" ry="9" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.6)" stroke-width="1.3"/><circle cx="11" cy="14" r="2.2" fill="#d4858a"/><circle cx="17" cy="11" r="1.8" fill="#c4943a"/></svg>',
    currently:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"><ellipse cx="16" cy="20" rx="6" ry="4" fill="rgba(255,255,255,0.1)"/><path d="M12 16v4M20 16v4"/></svg>',
    gc: '<svg viewBox="0 0 32 32" fill="none"><rect x="8" y="9" width="16" height="4" rx="2" fill="rgba(255,255,255,0.35)"/><path d="M8 13Q12 17 16 13Q20 17 24 13" fill="rgba(255,210,120,0.4)"/><rect x="8" y="15" width="16" height="4" rx="2" fill="rgba(255,255,255,0.3)"/></svg>',
    japan:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"><line x1="10" y1="12" x2="10" y2="27"/><line x1="22" y1="12" x2="22" y2="27"/><path d="M7 12Q16 8 25 12" stroke-width="2.5"/></svg>',
    trash:
      '<svg viewBox="0 0 32 32" fill="none"><path d="M10 14 C10 14,8 26,16 26 C24 26,22 14,22 14" fill="rgba(138,126,106,0.2)" stroke="rgba(138,126,106,0.5)" stroke-width="1.2"/></svg>',
  },
  iconStyles: {
    welcome: { background: 'linear-gradient(135deg,#c75c3a,#d4858a)' },
    projects: { background: 'linear-gradient(135deg,#4a6a8a,#5a7a4a)' },
    terminal: { background: '#2a2218', border: '1px solid #3a3228' },
    gallery: { background: 'linear-gradient(135deg,#d4858a,#c4943a)' },
    gc: { background: 'linear-gradient(135deg,#c4943a,#d4a040)' },
    trash: { background: 'var(--surface-2)', border: '1px solid var(--border)' },
    currently: { background: 'linear-gradient(135deg,#5a7a4a,#4a6a8a)' },
    japan: { background: 'linear-gradient(135deg,#c75c3a,#c4943a)' },
  },
  finderPath: '/Users/rika/Desktop/\u7D75\u5DFB\u7269/',
  cursorDotStyle: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--accent)',
    opacity: 0.3,
  },
  cursorThrottle: 60,
  cursorMax: 6,
  css: `
    @keyframes moonRise { from{bottom:20%;opacity:0;} to{bottom:60%;opacity:1;} }
    @keyframes twinkle { 0%,100%{opacity:0.2;} 50%{opacity:0.9;} }
    @keyframes totoroBreathe { 0%,100%{transform:scale(1);} 50%{transform:scale(1.03);} }
    @keyframes tanukiPeek { 0%{transform:translateX(-50%) translateY(100%);} 30%{transform:translateX(-50%) translateY(0);} 70%{transform:translateX(-50%) translateY(0);} 100%{transform:translateX(-50%) translateY(100%);} }
    .desktop-bg { background:linear-gradient(180deg,#c8d8e8 0%,#e0d8c8 35%,#f0e8d8 60%,#f5ede0 100%); transition:background 1s; }
    .desktop-bg::after { content:''; position:absolute; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E"); background-size:256px 256px; pointer-events:none; }
    body.night-mode .desktop-bg { background:linear-gradient(180deg,#0a0820 0%,#0f1020 40%,#141230 100%); }
    .window { animation:winOpenG 0.5s cubic-bezier(0.175,0.885,0.32,1.1); box-shadow:0 8px 32px rgba(0,0,0,0.06); }
    @keyframes winOpenG { from{transform:scaleY(0.1) scaleX(0.8);opacity:0;} 50%{transform:scaleY(1.02) scaleX(1.01);opacity:1;} to{transform:scaleY(1) scaleX(1);opacity:1;} }
    .window.minimized { animation:winMin 0.3s forwards; }
    @keyframes winMin { to{transform:scale(0.5) translateY(100vh);opacity:0;} }
    .window.focused { box-shadow:0 16px 48px rgba(0,0,0,0.1),0 0 0 1px rgba(199,92,58,0.2),0 0 24px var(--accent-glow); }
    .win-title { font-family:var(--display); }
    .desktop-icon .icon-label { font-family:var(--display); }
    .desktop-icon:hover { background:rgba(199,92,58,0.06); }
    .desktop-icon:hover .icon-img { transform:scale(1.08); }
    .tb-app:hover { background:rgba(255,255,255,0.2); color:var(--text); }
    .tb-app.active { background:rgba(255,255,255,0.25); }
    .cmd-item:hover,.cmd-item.selected { background:rgba(199,92,58,0.08); }
    .ctx-item:hover { background:rgba(199,92,58,0.08); }
    .finder-item:hover { background:rgba(199,92,58,0.04); }
    .notepad-content h2 { color:var(--accent); -webkit-text-fill-color:unset; }
    .terminal { color:var(--text);background:#f0e8d0;border-left:4px solid var(--accent); }
    .petal { position:absolute; width:8px; height:5px; background:var(--pink); border-radius:50% 0 50% 0; opacity:0.5; }
    @keyframes petalFall { 0%{transform:translateY(-5vh) rotate(0deg) translateX(0);opacity:0;} 10%{opacity:0.5;} 90%{opacity:0.5;} 100%{transform:translateY(105vh) rotate(540deg) translateX(80px);opacity:0;} }
    .soot-sprite { position:absolute; width:5px; height:5px; background:#3a2e1e; border-radius:50%; opacity:0.4; }
    @keyframes sootWander { 0%{transform:translate(0,0);} 25%{transform:translate(15px,-10px);} 50%{transform:translate(-8px,-20px);} 75%{transform:translate(20px,-5px);} 100%{transform:translate(0,0);} }
    .cloud { position:absolute; background:var(--surface-2); border-radius:50%; filter:blur(20px); opacity:0.4; }
    @keyframes cloudDrift { 0%{transform:translateX(0);} 100%{transform:translateX(100vw);} }
  `,
  particleColors: [
    'var(--accent)',
    'var(--pink)',
    'var(--green)',
    'var(--amber)',
    'var(--blue)',
    'var(--brown)',
  ],
  particleCount: 20,
};
