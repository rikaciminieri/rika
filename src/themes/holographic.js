export const holographic = {
  id: 'holographic',
  name: 'Holographic',
  vars: {
    '--bg': '#08080f',
    '--surface': '#12121f',
    '--surface-2': '#1a1a2e',
    '--border': '#2a2a44',
    '--text': '#e0e0f0',
    '--text-muted': '#6a6a8a',
    '--accent': '#00ffcc',
    '--accent-glow': 'rgba(0,255,204,0.2)',
    '--pink': '#ff3399',
    '--blue': '#3366ff',
    '--gold': '#ffcc00',
    '--red': '#ff4444',
    '--green': '#33ff99',
    '--amber': '#ffcc00',
    '--lavender': '#6a6a8a',
    '--peach': '#2a2a44',
    '--teal': '#00ffcc',
    '--brown': '#2a2a44',
    '--taskbar-h': '88px',
    '--radius': '12px',
    '--win-header': '40px',
    '--font': "'Inter','Noto Sans JP',sans-serif",
    '--mono': "'JetBrains Mono',monospace",
    '--display': "'Space Grotesk','Noto Sans JP',sans-serif",
  },
  nightVars: {
    '--bg': '#f0f0f8',
    '--surface': '#ffffff',
    '--surface-2': '#e8e8f0',
    '--border': '#d0d0e0',
    '--text': '#1a1a2e',
    '--text-muted': '#6a6a8a',
    '--accent': '#0088aa',
  },
  nightModeClass: 'day-mode',
  getNightModeLabel: (isNight) => (isNight ? 'DEFRAG' : 'GLITCH'),
  bootBg: '#000',
  bootMessages: [
    { text: 'HOLO_OS v3.0 \u2014 scanning frequencies...', delay: 0 },
    { text: 'decoding /dev/portfolio stream...              [OK]', cls: 'ok', delay: 250 },
    { text: 'calibrating holographic matrix...              [OK]', cls: 'ok', delay: 500 },
    { text: 'loading bilingual codex: en_US + ja_JP...      [OK]', cls: 'ok', delay: 750 },
    { text: 'SIGNAL NOISE detected in vibe.module            [WARN]', cls: 'warn', delay: 1000 },
    { text: 'rendering phosphor grid...                     [OK]', cls: 'ok', delay: 1250 },
    { text: 'all channels locked. transmission active.', cls: 'ok', delay: 1500 },
  ],
  bootDuration: 2600,
  bootLineColors: { ok: '#33ff99', warn: '#ffcc00', default: '#4a4a6a' },
  termPrompt: 'rika@holo ~ % ',
  termBg: {
    color: '#33ff99',
    background: '#060610',
    textShadow: '0 0 3px rgba(51,255,153,0.3)',
  },
  termWelcome: 'HOLO_OS Terminal \u2014 type "help" for commands\n\n',
  startButton: 'R',
  startButtonStyle: {
    borderRadius: '12px',
    border: '1px solid rgba(0,255,204,0.3)',
    background: 'linear-gradient(135deg,rgba(0,255,204,0.15),rgba(255,51,153,0.1))',
    color: 'var(--accent)',
    fontSize: '18px',
    textShadow: '0 0 8px var(--accent)',
  },
  taskbarStyle: {
    background: 'rgba(18,18,31,0.8)',
    border: '1px solid rgba(0,255,204,0.15)',
    borderRadius: '18px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3),0 0 20px rgba(0,255,204,0.05)',
  },
  nightTaskbarStyle: {
    background: 'rgba(255,255,255,0.85)',
    borderColor: 'rgba(0,136,170,0.2)',
  },
  screensaverBg: '#000',
  musicalScale: {
    welcome: { freq: 220 },
    projects: { freq: 261.63 },
    terminal: { freq: 293.66 },
    gallery: { freq: 349.23 },
    currently: { freq: 392 },
    gc: { freq: 440 },
    japan: { freq: 523.25 },
    trash: { freq: 587.33 },
  },
  scaleNoteType: 'triangle',
  ambientFreq: 60,
  ambientVol: 0.003,
  ambientType: 'sawtooth',
  iconSVGs: {
    welcome:
      '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="14" r="10" stroke="rgba(0,255,204,0.5)" stroke-width="1" fill="rgba(0,255,204,0.05)"/><circle cx="12.5" cy="12" r="1.5" fill="rgba(0,255,204,0.6)"/><circle cx="19.5" cy="12" r="1.5" fill="rgba(0,255,204,0.6)"/><path d="M13 17Q16 19 19 17" stroke="rgba(0,255,204,0.5)" stroke-width="1" fill="none"/></svg>',
    projects:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(0,255,204,0.5)" stroke-width="1" stroke-linecap="round"><rect x="5" y="8" width="22" height="15" rx="2" fill="rgba(0,255,204,0.05)"/><line x1="9" y1="13" x2="18" y2="13"/><line x1="9" y1="17" x2="23" y2="17" opacity="0.4"/></svg>',
    terminal:
      '<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="20" rx="3" fill="rgba(0,255,204,0.05)" stroke="rgba(0,255,204,0.4)" stroke-width="1"/><text x="10" y="20" font-family="monospace" font-size="12" fill="rgba(0,255,204,0.7)">\u203A_</text></svg>',
    gallery:
      '<svg viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="17" rx="12" ry="10" fill="rgba(0,255,204,0.05)" stroke="rgba(0,255,204,0.4)" stroke-width="1"/><circle cx="11" cy="14" r="2" fill="rgba(255,51,153,0.4)"/><circle cx="18" cy="11" r="1.8" fill="rgba(51,102,255,0.4)"/></svg>',
    currently:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(0,255,204,0.5)" stroke-width="1.2" stroke-linecap="round"><path d="M8 19C8 11 24 11 24 19"/><rect x="6" y="18" width="4" height="6" rx="2" fill="rgba(0,255,204,0.1)"/><rect x="22" y="18" width="4" height="6" rx="2" fill="rgba(0,255,204,0.1)"/></svg>',
    gc: '<svg viewBox="0 0 32 32" fill="none"><rect x="7" y="8" width="18" height="4" rx="2" fill="rgba(0,255,204,0.15)" stroke="rgba(0,255,204,0.3)" stroke-width="0.8"/><path d="M7 12Q11.5 16 16 12Q20.5 16 25 12" fill="rgba(255,204,0,0.2)"/><rect x="7" y="14" width="18" height="4" rx="2" fill="rgba(0,255,204,0.1)"/></svg>',
    japan:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(0,255,204,0.5)" stroke-width="1.5" stroke-linecap="round"><line x1="10" y1="12" x2="10" y2="28"/><line x1="22" y1="12" x2="22" y2="28"/><path d="M6 12Q16 8 26 12" stroke-width="2"/></svg>',
    trash:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(106,106,138,0.6)" stroke-width="1" stroke-linecap="round"><rect x="9" y="11" width="14" height="16" rx="2" fill="rgba(106,106,138,0.1)"/><path d="M7 9h18M13 7h6"/></svg>',
  },
  iconStyles: {
    welcome: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      backgroundImage:
        'linear-gradient(135deg,rgba(0,255,204,0.08),rgba(255,51,153,0.06),rgba(51,102,255,0.08))',
    },
    projects: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      backgroundImage:
        'linear-gradient(135deg,rgba(0,255,204,0.08),rgba(255,51,153,0.06))',
    },
    terminal: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
    },
    gallery: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      backgroundImage:
        'linear-gradient(135deg,rgba(255,51,153,0.06),rgba(51,102,255,0.08))',
    },
    gc: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      backgroundImage:
        'linear-gradient(135deg,rgba(255,204,0,0.08),rgba(0,255,204,0.06))',
    },
    trash: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
    },
    currently: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
    },
    japan: {
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
    },
  },
  finderPath: '/holo/signal/trash/',
  cursorDotStyle: {
    width: 6,
    height: 6,
    background: 'var(--accent)',
    clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
    opacity: 0.6,
  },
  cursorThrottle: 40,
  cursorMax: 10,
  css: `
    @keyframes bootStatic { 0%{transform:translateY(0);} 25%{transform:translateY(-2px);} 50%{transform:translateY(1px);} 75%{transform:translateY(-1px);} 100%{transform:translateY(0);} }
    @keyframes trackingBars { 0%{top:-30px;} 100%{top:110%;} }
    @keyframes signalFlicker { 0%{opacity:0;} 20%{opacity:1;} 30%{opacity:0.3;} 50%{opacity:1;} 60%{opacity:0.6;} 100%{opacity:1;} }
    @keyframes staticNoise { 0%{transform:translate(0,0);} 20%{transform:translate(-5%,5%);} 40%{transform:translate(5%,-5%);} 60%{transform:translate(-5%,-5%);} 80%{transform:translate(5%,5%);} 100%{transform:translate(0,0);} }
    @keyframes signalPulse { 0%,100%{opacity:0.3;} 50%{opacity:0.7;} }
    .desktop-bg::before { content:''; position:absolute; width:200%; height:200%; top:-50%; left:-50%; background: radial-gradient(ellipse 600px 500px at 20% 30%,rgba(0,255,204,0.06) 0%,transparent 60%), radial-gradient(ellipse 500px 600px at 80% 25%,rgba(255,51,153,0.05) 0%,transparent 60%), radial-gradient(ellipse 500px 400px at 55% 75%,rgba(51,102,255,0.05) 0%,transparent 60%); animation:holoDrift 25s ease-in-out infinite alternate; }
    @keyframes holoDrift { 0%{transform:translate(0,0) rotate(0deg) scale(1);} 25%{transform:translate(40px,-30px) rotate(1.5deg) scale(1.02);} 50%{transform:translate(-30px,20px) rotate(-1deg) scale(0.98);} 75%{transform:translate(20px,10px) rotate(0.5deg) scale(1.01);} 100%{transform:translate(-10px,-15px) rotate(-0.5deg) scale(1);} }
    .holo-scanlines { position:fixed; inset:0; z-index:0; pointer-events:none; background:repeating-linear-gradient(0deg,transparent 0px,transparent 1px,rgba(255,255,255,0.015) 1px,rgba(255,255,255,0.015) 2px); animation:scanScroll 8s linear infinite; }
    @keyframes scanScroll { 0%{transform:translateY(0);} 100%{transform:translateY(40px);} }
    .holo-vignette { position:fixed; inset:0; z-index:0; pointer-events:none; background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.4) 100%); }
    .window { background:rgba(18,18,31,0.85); backdrop-filter:blur(12px); animation:winMaterialize 0.45s cubic-bezier(0.16,1,0.3,1); box-shadow:2px 0 0 rgba(255,51,153,0.08),-2px 0 0 rgba(51,102,255,0.08),0 8px 32px rgba(0,0,0,0.4); }
    @keyframes winMaterialize { 0%{transform:scaleY(0.02) scaleX(1);opacity:0;filter:brightness(3) hue-rotate(90deg);} 30%{transform:scaleY(0.02) scaleX(1);opacity:1;filter:brightness(2);} 50%{transform:scaleY(0.5) scaleX(1.02);filter:brightness(1.5) hue-rotate(45deg);} 75%{transform:scaleY(1.02) scaleX(0.99);filter:brightness(1.1);} 100%{transform:scaleY(1) scaleX(1);opacity:1;filter:none;} }
    .window.minimized { animation:winMinH 0.25s forwards; }
    @keyframes winMinH { to{transform:scaleY(0.02) scaleX(0.5);opacity:0;filter:brightness(2);} }
    .window.focused { box-shadow:2px 0 0 rgba(255,51,153,0.12),-2px 0 0 rgba(51,102,255,0.12),0 12px 48px rgba(0,0,0,0.5),0 0 30px var(--accent-glow); }
    .win-header { background:rgba(26,26,46,0.9); }
    .win-dot.close { box-shadow:0 0 6px rgba(255,68,68,0.4); }
    .win-dot.minimize { box-shadow:0 0 6px rgba(255,204,0,0.3); }
    .win-dot.maximize { box-shadow:0 0 6px rgba(51,255,153,0.3); }
    .desktop-icon:hover { background:rgba(0,255,204,0.04); }
    .desktop-icon:hover .icon-img { transform:scale(1.08) rotateY(8deg) rotateX(-4deg); border-color:var(--accent); box-shadow:0 0 16px rgba(0,255,204,0.2); }
    .tb-app:hover { background:rgba(0,255,204,0.08); color:var(--text); transform:translateY(-2px); }
    .tb-app.active { background:rgba(0,255,204,0.12); color:var(--accent); }
    .cmd-item:hover,.cmd-item.selected { background:rgba(0,255,204,0.08); }
    .ctx-item:hover { background:rgba(0,255,204,0.1); }
    .finder-item:hover { background:rgba(0,255,204,0.04); }
    .notepad-content h2 { background:linear-gradient(135deg,var(--accent),var(--pink),var(--blue)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .terminal { color:var(--green); background:#060610; text-shadow:0 0 3px rgba(51,255,153,0.3); }
    body.day-mode .holo-scanlines { opacity:0; }
    body.day-mode .holo-vignette { opacity:0; }
    body.day-mode .desktop-bg::before { opacity:0; }
    .holo-shard { position:absolute; width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent; border-bottom:8px solid var(--accent); filter:blur(0.5px); opacity:0; animation:holoFloat linear infinite; }
    .holo-line { position:absolute; width:30px; height:1px; background:linear-gradient(90deg,transparent,var(--accent),transparent); opacity:0; animation:holoFloat linear infinite; }
    @keyframes holoFloat { 0%{opacity:0;transform:translateY(100vh) rotate(0deg);} 10%{opacity:0.4;} 90%{opacity:0.4;} 100%{opacity:0;transform:translateY(-10vh) rotate(180deg);} }
    .desktop-toy { background:transparent; clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%); box-shadow:0 0 8px var(--accent); width:12px; height:12px; }
    .cursor-dot:nth-child(odd) { background:var(--pink) !important; }
    .cursor-dot:nth-child(3n) { background:var(--blue) !important; }
  `,
  particleColors: ['var(--accent)', 'var(--pink)', 'var(--blue)', 'var(--gold)'],
  particleCount: 16,
};
