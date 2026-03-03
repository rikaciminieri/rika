export const kawaii = {
  id: 'kawaii',
  name: 'Kawaii',
  vars: {
    '--bg': '#fdf6f3',
    '--surface': '#ffffff',
    '--surface-2': '#fef1ed',
    '--border': '#f0ddd8',
    '--text': '#3d2c3e',
    '--text-muted': '#9a8a9c',
    '--accent': '#f4a0b5',
    '--accent-glow': 'rgba(244,160,181,0.25)',
    '--pink': '#e88fc0',
    '--green': '#7ecba3',
    '--amber': '#f5c97e',
    '--red': '#f07070',
    '--blue': '#97b8f0',
    '--teal': '#7ec9c0',
    '--lavender': '#c4b0e8',
    '--peach': '#f8c4a4',
    '--gold': '#f5c97e',
    '--brown': '#8a6a3a',
    '--taskbar-h': '88px',
    '--radius': '16px',
    '--win-header': '40px',
    '--font': "'Inter','Noto Sans JP',sans-serif",
    '--mono': "'JetBrains Mono',monospace",
    '--display': "'Space Grotesk','Noto Sans JP',sans-serif",
  },
  nightVars: {
    '--bg': '#1e1525',
    '--surface': '#2a1f30',
    '--surface-2': '#322838',
    '--border': '#443a4c',
    '--text': '#f5eff8',
    '--text-muted': '#a89ab0',
  },
  nightModeClass: 'night-mode',
  getNightModeLabel: (isNight) => (isNight ? '\u{1F319}' : '\u2600\uFE0F'),
  bootBg: '#3d2c3e',
  bootMessages: [
    { text: 'RikaOS v2.1 \u2014 loading kernel...', delay: 0 },
    { text: 'mounting /dev/portfolio...                    [OK]', cls: 'ok', delay: 200 },
    { text: 'loading bilingual engine: en_US + ja_JP...    [OK]', cls: 'ok', delay: 400 },
    { text: 'initializing creative subsystems...           [OK]', cls: 'ok', delay: 600 },
    { text: 'calibrating vibes...                          [OK]', cls: 'ok', delay: 900 },
    { text: "pilates.service \u2014 skipped (it's not 7am)     [WARN]", cls: 'warn', delay: 1100 },
    { text: 'bridgerton-binge-tracker: 94% complete        [OK]', cls: 'ok', delay: 1300 },
    { text: 'all systems nominal. welcome home, rika.', cls: 'ok', delay: 1600 },
  ],
  bootDuration: 2400,
  bootLineColors: { ok: '#7ecba3', warn: '#f5c97e', default: '#555' },
  termPrompt: 'rika@portfolio ~ % ',
  termBg: { color: 'var(--green)', background: '#0a0a0f' },
  termWelcome: 'RikaOS Terminal v2.1 \u2014 type "help" for commands\n\n',
  startButton: 'R',
  startButtonStyle: {
    background: 'linear-gradient(135deg,#f4a0b5,#f8c4a4)',
    color: 'white',
    fontSize: '18px',
  },
  taskbarStyle: {
    background: 'rgba(255,255,255,0.75)',
    border: '1px solid rgba(244,160,181,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08),0 2px 8px rgba(244,160,181,0.1)',
  },
  nightTaskbarStyle: {
    background: 'rgba(30,21,37,0.85)',
    border: '1px solid rgba(244,160,181,0.15)',
  },
  musicalScale: {
    welcome: { freq: 523.25 },
    projects: { freq: 587.33 },
    terminal: { freq: 659.25 },
    gallery: { freq: 783.99 },
    currently: { freq: 880 },
    gc: { freq: 1046.5 },
    japan: { freq: 1174.66 },
    trash: { freq: 1318.51 },
  },
  scaleNoteType: 'sine',
  ambientFreq: 110,
  ambientVol: 0.006,
  ambientType: 'sine',
  iconSVGs: {
    welcome:
      '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="14" r="10" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/><circle cx="12.5" cy="12" r="1.8" fill="rgba(255,255,255,0.8)"/><circle cx="19.5" cy="12" r="1.8" fill="rgba(255,255,255,0.8)"/><path d="M13 17Q16 20 19 17" stroke="rgba(255,255,255,0.7)" stroke-width="1.3" fill="none" stroke-linecap="round"/><circle cx="9" cy="15" r="2.8" fill="rgba(255,180,200,0.35)"/><circle cx="23" cy="15" r="2.8" fill="rgba(255,180,200,0.35)"/></svg>',
    projects:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.3" stroke-linecap="round"><rect x="5" y="8" width="22" height="15" rx="2" fill="rgba(255,255,255,0.1)"/><path d="M3 25h26" stroke-width="1.5"/><line x1="9" y1="13" x2="18" y2="13"/><line x1="9" y1="16.5" x2="23" y2="16.5" opacity="0.5"/></svg>',
    terminal:
      '<svg viewBox="0 0 32 32" fill="none"><rect x="4" y="6" width="24" height="20" rx="3" fill="rgba(0,0,0,0.3)" stroke="rgba(126,203,163,0.5)" stroke-width="1"/><text x="10" y="20" font-family="monospace" font-size="12" font-weight="bold" fill="rgba(126,203,163,0.9)">\u203A_</text></svg>',
    gallery:
      '<svg viewBox="0 0 32 32" fill="none"><ellipse cx="16" cy="17" rx="12" ry="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/><circle cx="11" cy="14" r="2.5" fill="#ff9bb5"/><circle cx="18" cy="11" r="2" fill="#c4b0e8"/><circle cx="23" cy="16" r="2" fill="#7ecba3"/></svg>',
    currently:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"><path d="M8 19C8 11 24 11 24 19"/><rect x="5.5" y="18" width="5" height="7" rx="2.5" fill="rgba(255,255,255,0.2)"/><rect x="21.5" y="18" width="5" height="7" rx="2.5" fill="rgba(255,255,255,0.2)"/></svg>',
    gc: '<svg viewBox="0 0 32 32" fill="none"><rect x="7" y="8" width="18" height="4.5" rx="2" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/><path d="M7 12.5Q11.5 17 16 12.5Q20.5 17 25 12.5" fill="rgba(255,210,120,0.45)"/><rect x="7" y="15" width="18" height="4.5" rx="2" fill="rgba(255,255,255,0.3)"/></svg>',
    japan:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.8" stroke-linecap="round"><line x1="10" y1="12" x2="10" y2="28"/><line x1="22" y1="12" x2="22" y2="28"/><path d="M6 12Q16 8 26 12" stroke-width="2.2"/></svg>',
    trash:
      '<svg viewBox="0 0 32 32" fill="none" stroke="rgba(150,138,156,0.7)" stroke-width="1.2" stroke-linecap="round"><rect x="9" y="11" width="14" height="16" rx="2" fill="rgba(150,138,156,0.15)"/><path d="M7 9h18"/><path d="M13 7h6" stroke-width="1.5"/></svg>',
  },
  iconStyles: {
    welcome: { background: 'linear-gradient(135deg,#f4a0b5,#f8c4a4)' },
    projects: { background: 'linear-gradient(135deg,#c4b0e8,#97b8f0)' },
    terminal: { background: '#2a2035', border: '1px solid #443a4c' },
    gallery: { background: 'linear-gradient(135deg,#e88fc0,#c4b0e8)' },
    gc: { background: 'linear-gradient(135deg,#f5c97e,#f8c4a4)' },
    trash: { background: 'var(--surface-2)', border: '1px solid var(--border)' },
    currently: { background: 'linear-gradient(135deg,#7ec9c0,#7ecba3)' },
    japan: { background: 'linear-gradient(135deg,#f4a0b5,#f07070)' },
  },
  finderPath: '/Users/rika/Desktop/definitely-not-important/',
  cursorDotStyle: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--accent)',
    opacity: 0.5,
  },
  cursorThrottle: 50,
  cursorMax: 8,
  css: `
    .desktop-bg::before { content:''; position:absolute; width:150%; height:150%; top:-25%; left:-25%; background: radial-gradient(ellipse 600px 400px at 25% 35%,rgba(244,160,181,0.07) 0%,transparent 70%), radial-gradient(ellipse 500px 500px at 75% 25%,rgba(196,176,232,0.06) 0%,transparent 70%), radial-gradient(ellipse 400px 600px at 60% 75%,rgba(126,203,163,0.05) 0%,transparent 70%); animation:meshDrift 20s ease-in-out infinite alternate; }
    @keyframes meshDrift { 0%{transform:translate(0,0) rotate(0deg);} 33%{transform:translate(30px,-20px) rotate(1deg);} 66%{transform:translate(-20px,15px) rotate(-0.5deg);} 100%{transform:translate(10px,-10px) rotate(0.5deg);} }
    .desktop-bg::after { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(244,160,181,0.08) 1.5px,transparent 1.5px); background-size:28px 28px; }
    body.night-mode .desktop-bg::after { background-image:radial-gradient(circle,rgba(255,255,255,0.04) 1.5px,transparent 1.5px); }
    .particle { position:absolute; border-radius:50%; opacity:0; animation:particleFloat linear infinite; }
    @keyframes particleFloat { 0%{opacity:0;transform:translateY(100vh) scale(0);} 10%{opacity:0.6;} 90%{opacity:0.6;} 100%{opacity:0;transform:translateY(-10vh) scale(1);} }
    .window { animation:winOpen 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
    @keyframes winOpen { from{transform:scale(0.8) translateY(20px);opacity:0;} 60%{transform:scale(1.03) translateY(-3px);opacity:1;} to{transform:scale(1) translateY(0);opacity:1;} }
    .window.minimized { animation:winMin 0.2s forwards; }
    @keyframes winMin { to{transform:scale(0.5) translateY(100vh);opacity:0;} }
    .window.focused { box-shadow:0 16px 48px rgba(0,0,0,0.1),0 0 0 1px rgba(244,160,181,0.2),0 0 24px var(--accent-glow); }
    .desktop-icon:hover { background:rgba(244,160,181,0.08); }
    .desktop-icon:hover .icon-img { animation:iconWobble 0.5s ease-in-out; transform:scale(1.1); }
    @keyframes iconWobble { 0%{transform:scale(1) rotate(0deg);} 20%{transform:scale(1.12) rotate(-6deg);} 40%{transform:scale(1.08) rotate(5deg);} 60%{transform:scale(1.11) rotate(-3deg);} 80%{transform:scale(1.09) rotate(2deg);} 100%{transform:scale(1.1) rotate(0deg);} }
    .tb-app:hover { background:rgba(244,160,181,0.12); color:var(--text); transform:translateY(-2px); }
    .tb-app.active { background:rgba(244,160,181,0.18); color:var(--text); }
    .cmd-item:hover,.cmd-item.selected { background:rgba(244,160,181,0.1); }
    .ctx-item:hover { background:rgba(244,160,181,0.12); }
    .finder-item:hover { background:rgba(244,160,181,0.06); }
    .notepad-content h2 { background:linear-gradient(135deg,#f4a0b5,#f8c4a4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .terminal { color:var(--green); background:#0a0a0f; }
    .desktop-toy { background:radial-gradient(circle at 35% 35%,var(--accent),var(--pink)); box-shadow:0 2px 8px rgba(0,0,0,0.15),inset 0 -2px 4px rgba(0,0,0,0.1); }
    @keyframes aurora1 { 0%{transform:translateX(-10%) scaleY(1);} 100%{transform:translateX(10%) scaleY(1.3);} }
    @keyframes aurora2 { 0%{transform:translateX(15%) scaleY(1.2);} 100%{transform:translateX(-15%) scaleY(0.8);} }
    @keyframes aurora3 { 0%{transform:translateX(-5%) scaleY(0.9);} 100%{transform:translateX(5%) scaleY(1.1);} }
    @keyframes twinkle { 0%,100%{opacity:0.2;} 50%{opacity:0.8;} }
  `,
  particleColors: [
    'var(--accent)',
    'var(--lavender)',
    'var(--peach)',
    'var(--green)',
    'var(--teal)',
    'var(--pink)',
  ],
  particleCount: 15,
};
