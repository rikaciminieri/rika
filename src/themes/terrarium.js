export const terrarium = {
  id: 'terrarium',
  name: 'Terrarium',
  vars: {
    '--bg': '#1a2e1a',
    '--surface': 'rgba(255,255,255,0.08)',
    '--surface-2': '#1e3420',
    '--border': 'rgba(255,255,255,0.12)',
    '--text': '#e0ead8',
    '--text-muted': '#8aaa80',
    '--accent': '#4ec97a',
    '--accent-glow': 'rgba(78,201,122,0.2)',
    '--brown': '#8a6a3a',
    '--amber': '#c4a43a',
    '--pink': '#d48a8a',
    '--blue': '#5a8aaa',
    '--teal': '#3aaa8a',
    '--red': '#c45a5a',
    '--green': '#4ec97a',
    '--gold': '#c4a43a',
    '--lavender': '#8aaa80',
    '--peach': '#d48a8a',
    '--taskbar-h': '88px',
    '--radius': '16px',
    '--win-header': '40px',
    '--font': "'Inter','Noto Sans JP',sans-serif",
    '--mono': "'JetBrains Mono',monospace",
    '--display': "'Space Grotesk','Noto Sans JP',sans-serif",
  },
  nightVars: {
    '--bg': '#0a0f1a',
    '--surface': 'rgba(96,255,160,0.04)',
    '--surface-2': '#0e1520',
    '--border': 'rgba(96,255,160,0.1)',
    '--text': '#c0d8e8',
    '--text-muted': '#5a8a9a',
    '--accent': '#60ffa0',
    '--accent-glow': 'rgba(96,255,160,0.15)',
  },
  nightModeClass: 'night-mode',
  getNightModeLabel: (isNight) => (isNight ? '\u{1F33F}' : '\u2600\uFE0F'),
  bootBg: '#0a1a0a',
  bootMessages: [
    { text: 'Terrarium OS v1.0 \u2014 germinating...', delay: 0 },
    { text: 'propagating /dev/portfolio seedlings...       [OK]', cls: 'ok', delay: 250 },
    { text: 'watering bilingual root system...             [OK]', cls: 'ok', delay: 500 },
    { text: 'growing creative mycelium network...          [OK]', cls: 'ok', delay: 750 },
    { text: 'composting old code...                        [OK]', cls: 'ok', delay: 1000 },
    { text: 'photosynthesis.service \u2014 needs more light     [WARN]', cls: 'warn', delay: 1200 },
    { text: 'all spores accounted for. ecosystem ready.', cls: 'ok', delay: 1500 },
  ],
  bootDuration: 2800,
  bootLineColors: { ok: '#4ec97a', warn: '#c4a43a', default: '#3a5a3a' },
  termPrompt: '[field-log] rika ~ \u{276F} ',
  termBg: { color: 'var(--accent)', background: 'linear-gradient(180deg,#1a1408,#12100a)' },
  termWelcome: 'Terrarium Field Log \u2014 type "help" for commands\n\n',
  startButton:
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="12" rx="4" ry="2" fill="rgba(78,201,122,0.3)"/><circle cx="8" cy="10" r="3" fill="rgba(138,106,58,0.6)" stroke="rgba(138,106,58,0.8)" stroke-width="0.5"/></svg>',
  startButtonStyle: {
    borderRadius: '50%',
    border: '2px solid rgba(78,201,122,0.3)',
    background: 'radial-gradient(circle at 45% 40%,rgba(78,201,122,0.4),rgba(26,46,26,0.6))',
    color: 'var(--accent)',
    fontSize: '14px',
  },
  taskbarStyle: {
    background: 'linear-gradient(180deg,rgba(138,106,58,0.5),rgba(90,60,30,0.6))',
    border: '1px solid rgba(138,106,58,0.3)',
    borderRadius: '14px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.06)',
  },
  nightTaskbarStyle: {
    background: 'rgba(10,15,26,0.9)',
    borderColor: 'rgba(96,255,160,0.15)',
  },
  screensaverBg: '#050a15',
  musicalScale: {
    welcome: { freq: 261.63 },
    projects: { freq: 293.66 },
    terminal: { freq: 329.63 },
    gallery: { freq: 392 },
    currently: { freq: 440 },
    gc: { freq: 523.25 },
    japan: { freq: 587.33 },
    trash: { freq: 659.25 },
  },
  scaleNoteType: 'sine',
  ambientFreq: 80,
  ambientVol: 0.004,
  ambientType: 'sine',
  ambientFilter: { type: 'lowpass', freq: 200 },
  iconSVGs: {
    welcome:
      '<svg viewBox="0 0 32 32" fill="none"><path d="M8 24 Q8 12 16 8 Q24 12 24 24 Z" fill="rgba(78,201,122,0.2)" stroke="rgba(78,201,122,0.4)" stroke-width="1"/><circle cx="16" cy="16" r="3" fill="rgba(78,201,122,0.3)" stroke="rgba(78,201,122,0.5)" stroke-width="0.8"/></svg>',
    projects:
      '<svg viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="22" rx="12" ry="4" fill="rgba(138,106,58,0.2)" stroke="rgba(138,106,58,0.4)" stroke-width="1"/><rect x="10" y="8" width="12" height="14" rx="6" fill="rgba(78,201,122,0.15)" stroke="rgba(78,201,122,0.3)" stroke-width="1"/><line x1="16" y1="12" x2="16" y2="18" stroke="rgba(78,201,122,0.4)" stroke-width="1"/></svg>',
    terminal:
      '<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="20" rx="3" fill="rgba(15,26,15,0.5)" stroke="rgba(78,201,122,0.3)" stroke-width="1"/><text x="10" y="20" font-family="monospace" font-size="12" fill="rgba(78,201,122,0.7)">\u203A_</text></svg>',
    gallery:
      '<svg viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="17" rx="12" ry="10" fill="rgba(212,138,138,0.1)" stroke="rgba(212,138,138,0.3)" stroke-width="1"/><circle cx="11" cy="15" r="2" fill="rgba(212,138,138,0.3)"/><circle cx="18" cy="12" r="1.8" fill="rgba(196,164,58,0.3)"/></svg>',
    currently:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(58,170,138,0.5)" stroke-width="1.2" stroke-linecap="round"><path d="M8 19C8 11 24 11 24 19"/><rect x="6" y="18" width="4" height="6" rx="2" fill="rgba(58,170,138,0.15)"/><rect x="22" y="18" width="4" height="6" rx="2" fill="rgba(58,170,138,0.15)"/></svg>',
    gc: '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" fill="rgba(196,164,58,0.15)" stroke="rgba(196,164,58,0.3)" stroke-width="1"/><path d="M10 16Q13 20 16 16Q19 20 22 16" fill="rgba(196,164,58,0.2)"/></svg>',
    japan:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(212,138,138,0.5)" stroke-width="1.5" stroke-linecap="round"><line x1="10" y1="12" x2="10" y2="28"/><line x1="22" y1="12" x2="22" y2="28"/><path d="M6 12Q16 8 26 12" stroke-width="2"/></svg>',
    trash:
      '<svg viewBox="0 0 32 32" fill="none"><path d="M8 14Q8 14 8 26Q8 28 16 28Q24 28 24 26L24 14" fill="rgba(138,106,58,0.15)" stroke="rgba(138,106,58,0.4)" stroke-width="1"/><path d="M8 14Q16 12 24 14" stroke="rgba(138,106,58,0.4)" stroke-width="1" fill="none"/></svg>',
  },
  iconStyles: {
    welcome: {
      background: 'linear-gradient(135deg,rgba(78,201,122,0.3),rgba(58,170,138,0.2))',
      border: '1px solid rgba(78,201,122,0.3)',
    },
    projects: {
      background: 'linear-gradient(135deg,rgba(138,106,58,0.4),rgba(90,70,30,0.3))',
      border: '1px solid rgba(138,106,58,0.3)',
    },
    terminal: {
      background: '#0f1a0f',
      border: '1px solid rgba(78,201,122,0.2)',
    },
    gallery: {
      background: 'linear-gradient(135deg,rgba(212,138,138,0.25),rgba(196,164,58,0.2))',
      border: '1px solid rgba(212,138,138,0.2)',
    },
    gc: {
      background: 'linear-gradient(135deg,rgba(196,164,58,0.35),rgba(138,106,58,0.25))',
      border: '1px solid rgba(196,164,58,0.3)',
    },
    trash: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    currently: {
      background: 'linear-gradient(135deg,rgba(58,170,138,0.3),rgba(90,138,170,0.2))',
      border: '1px solid rgba(58,170,138,0.2)',
    },
    japan: {
      background: 'linear-gradient(135deg,rgba(212,138,138,0.2),rgba(255,255,255,0.08))',
      border: '1px solid rgba(212,138,138,0.2)',
    },
  },
  finderPath: '/terrarium/compost/',
  cursorDotStyle: {
    width: 8,
    height: 5,
    borderRadius: '50% 50% 50% 0',
    background: 'var(--accent)',
    opacity: 0.4,
  },
  cursorThrottle: 50,
  cursorMax: 8,
  css: `
    @keyframes domeAppear { to{opacity:1;} }
    @keyframes soilFill { to{height:35%;} }
    @keyframes reflectionAppear { to{opacity:1;} }
    @keyframes mushroomGlow { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
    @keyframes fireflyFloat { 0%{transform:translate(0,0);opacity:0;} 10%{opacity:0.8;} 50%{transform:translate(40px,-60px);opacity:1;} 90%{opacity:0.4;} 100%{transform:translate(-20px,-120px);opacity:0;} }
    .desktop-bg::before { content:''; position:absolute; width:150%; height:150%; top:-25%; left:-25%; background: radial-gradient(ellipse 500px 400px at 20% 30%,rgba(78,201,122,0.06) 0%,transparent 70%), radial-gradient(ellipse 600px 500px at 70% 20%,rgba(58,170,138,0.04) 0%,transparent 70%), radial-gradient(ellipse 400px 500px at 55% 70%,rgba(138,106,58,0.05) 0%,transparent 70%); animation:meshDriftT 25s ease-in-out infinite alternate; }
    @keyframes meshDriftT { 0%{transform:translate(0,0) rotate(0deg);} 33%{transform:translate(20px,-15px) rotate(0.5deg);} 66%{transform:translate(-15px,10px) rotate(-0.3deg);} 100%{transform:translate(8px,-8px) rotate(0.2deg);} }
    .desktop-bg::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at center,transparent 40%,rgba(255,255,255,0.03) 65%,rgba(255,255,255,0.06) 80%,rgba(255,255,255,0.03) 100%); }
    .terr-mist { position:fixed; inset:0; z-index:1; pointer-events:none; background:linear-gradient(180deg,transparent 50%,rgba(255,255,255,0.015) 70%,rgba(255,255,255,0.025) 85%,transparent 100%); animation:mistShift 15s ease-in-out infinite alternate; }
    @keyframes mistShift { 0%{transform:translateX(-3%);} 100%{transform:translateX(3%);} }
    .terr-butterfly { position:fixed; pointer-events:none; z-index:2; width:14px; height:10px; animation:butterflyPath 20s ease-in-out infinite; }
    .terr-butterfly::before,.terr-butterfly::after { content:''; position:absolute; width:7px; height:10px; border-radius:50% 50% 50% 0; background:rgba(212,138,138,0.5); }
    .terr-butterfly::before { left:0; transform-origin:right center; animation:wingFlap 0.3s ease-in-out infinite; }
    .terr-butterfly::after { right:0; transform:scaleX(-1); transform-origin:left center; animation:wingFlap 0.3s ease-in-out infinite reverse; }
    @keyframes wingFlap { 0%,100%{transform:rotateY(0);} 50%{transform:rotateY(70deg);} }
    @keyframes butterflyPath { 0%{top:60%;left:10%;} 15%{top:30%;left:30%;} 30%{top:45%;left:55%;} 45%{top:20%;left:70%;} 60%{top:50%;left:80%;} 75%{top:35%;left:45%;} 90%{top:55%;left:20%;} 100%{top:60%;left:10%;} }
    .window { background:rgba(26,46,26,0.92); backdrop-filter:blur(12px); border-top-color:rgba(255,255,255,0.18); animation:winOpenT 0.5s cubic-bezier(0.175,0.885,0.32,1.275); }
    @keyframes winOpenT { from{transform:scale(0.3);opacity:0;border-radius:50%;} 50%{border-radius:var(--radius);} 70%{transform:scale(1.03);opacity:1;} to{transform:scale(1);opacity:1;} }
    .window.minimized { animation:winMinT 0.3s forwards; }
    @keyframes winMinT { to{transform:scale(0.3) translateY(100vh);opacity:0;border-radius:50%;} }
    .window.focused { box-shadow:0 16px 48px rgba(0,0,0,0.35),0 0 0 1px rgba(78,201,122,0.15),0 0 30px var(--accent-glow); }
    .win-header { background:rgba(255,255,255,0.04); backdrop-filter:blur(8px); }
    .win-dot.close { background:radial-gradient(circle at 40% 35%,rgba(255,255,255,0.3),var(--red)); }
    .win-dot.minimize { background:radial-gradient(circle at 40% 35%,rgba(255,255,255,0.3),var(--amber)); }
    .win-dot.maximize { background:radial-gradient(circle at 40% 35%,rgba(255,255,255,0.3),var(--green)); }
    .desktop-icon:hover { background:rgba(78,201,122,0.08); }
    .desktop-icon:hover .icon-img { animation:iconCondense 0.5s ease-in-out; transform:scale(1.1); }
    @keyframes iconCondense { 0%{transform:scale(1);filter:brightness(1);} 30%{transform:scale(1.12);filter:brightness(1.15);} 60%{transform:scale(1.08);filter:brightness(1.08);} 100%{transform:scale(1.1);filter:brightness(1);} }
    .tb-app:hover { background:rgba(78,201,122,0.1); color:var(--text); transform:translateY(-2px); }
    .tb-app.active { background:rgba(78,201,122,0.15); color:var(--text); }
    .cmd-item:hover,.cmd-item.selected { background:rgba(78,201,122,0.1); }
    .ctx-item:hover { background:rgba(78,201,122,0.12); }
    .finder-item:hover { background:rgba(78,201,122,0.06); }
    .notepad-content h2 { background:linear-gradient(135deg,#4ec97a,#3aaa8a); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .terminal { color:var(--accent); background:linear-gradient(180deg,#1a1408,#12100a); }
    .terr-particle { position:absolute; border-radius:50%; opacity:0; animation:pollenFloat linear infinite; }
    @keyframes pollenFloat { 0%{opacity:0;transform:translate(0,0) scale(0);} 10%{opacity:0.5;} 50%{transform:translate(30px,-40vh) scale(1);opacity:0.4;} 90%{opacity:0.3;} 100%{opacity:0;transform:translate(-20px,-80vh) scale(0.5);} }
    .desktop-toy { background:radial-gradient(circle at 35% 35%,var(--brown),#5a3a1a); border-radius:50% 50% 45% 55%; width:14px; height:12px; box-shadow:0 2px 6px rgba(0,0,0,0.3); }
    @keyframes condensationGrow { 0%{opacity:0;transform:scale(0.5);} 30%{opacity:0.8;transform:scale(1);} 70%{opacity:0.6;transform:scale(1.1);} 100%{opacity:0;transform:scale(0.3) translateY(20px);} }
  `,
  particleColors: [
    'rgba(196,164,58,0.6)',
    'rgba(78,201,122,0.5)',
    'rgba(255,215,0,0.4)',
    'rgba(58,170,138,0.4)',
  ],
  particleCount: 18,
};
