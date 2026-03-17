const FORTUNES = [
  "you will debug a CSS issue for 3 hours only to find a missing semicolon.",
  "a grilled cheese of great significance will enter your life soon.",
  "the One Piece is real. (source: trust me.)",
  "your next deploy will go smoothly. just kidding. check your env variables.",
  "someone will ask you to 'make the logo bigger.' stand firm.",
  "a mysterious stranger will offer you a job. they found you through this portfolio.",
  "you will discover a new onsen that changes your definition of relaxation.",
  "today's mass: perfectly proofed sourdough. tomorrow's mass: imposter syndrome. balance.",
  "Luffy wouldn't give up and neither should you. now go fix that bug.",
  "a Monopoly Deal betrayal is in your near future. you will recover. eventually.",
];

const COWSAY = (msg) => {
  const top = ' ' + '_'.repeat(msg.length + 2);
  const bot = ' ' + '-'.repeat(msg.length + 2);
  return `${top}
< ${msg} >
${bot}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
};

const NEOFETCH = (theme) => {
  return `
<span class="highlight">        rika@portfolio</span>
       ─────────────────
        <span class="prompt">os:</span>      RikaOS v2.1
        <span class="prompt">host:</span>    portfolio
        <span class="prompt">kernel:</span>  react 18.x
        <span class="prompt">shell:</span>   rika-shell
        <span class="prompt">theme:</span>   ${theme}
        <span class="prompt">de:</span>      RikaDE
        <span class="prompt">wm:</span>      draggable-windows
        <span class="prompt">font:</span>    Space Grotesk
        <span class="prompt">cpu:</span>     vibes @ 3.4GHz
        <span class="prompt">memory:</span>  847 grilled cheeses cached
        <span class="prompt">uptime:</span>  since 1997
`;
};

const HELP_TEXT = `
<span class="highlight">available commands:</span>

  <span class="prompt">help</span>          show this help message
  <span class="prompt">whoami</span>        who am i?
  <span class="prompt">ls</span>            list all apps
  <span class="prompt">open [app]</span>    open an app
  <span class="prompt">clear</span>         clear the terminal
  <span class="prompt">neofetch</span>      system info
  <span class="prompt">theme</span>         current theme info
  <span class="prompt">fortune</span>       get a random fortune
  <span class="prompt">cowsay [msg]</span>  make a cow say something
  <span class="prompt">rain</span>          toggle rain effect
  <span class="prompt">matrix</span>        toggle matrix effect
  <span class="prompt">grow</span>          grow something in the terrarium
  <span class="prompt">sudo</span>          escalate privileges
`;

export function processCmd(cmd, context) {
  const { theme, openApp, switchTheme, apps, closeAll } = context;
  const trimmed = cmd.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1).join(' ');

  switch (command) {
    case 'help':
      return HELP_TEXT;

    case 'whoami':
      return '<span class="highlight">rika ciminieri</span> \u2014 full-stack engineer, grilled cheese scientist, One Piece theorist';

    case 'ls': {
      if (!apps || apps.length === 0) {
        return '<span class="error">no apps found.</span>';
      }
      const list = apps.map((app) => `  <span class="prompt">${app}</span>`).join('\n');
      return `<span class="highlight">applications:</span>\n${list}`;
    }

    case 'open': {
      if (!args) {
        return '<span class="error">usage: open [app name]</span>';
      }
      const match = apps?.find(
        (a) => a.toLowerCase() === args.toLowerCase()
      );
      if (match) {
        openApp?.(match);
        return `opening <span class="highlight">${match}</span>...`;
      }
      return `<span class="error">app not found: "${args}"</span>. type <span class="prompt">ls</span> to see available apps.`;
    }

    case 'clear':
      return '__CLEAR__';

    case 'neofetch':
      return NEOFETCH(theme?.name || 'default');

    case 'theme': {
      /* THEMES_DISABLED — Re-enable theme switching via terminal when themes are back:
      if (args && switchTheme) {
        const result = switchTheme(args);
        if (result === false) return `<span class="error">Unknown theme: "${args}"</span>`;
        return `Switched to theme: <span class="highlight">${args}</span>`;
      }
      */
      return `current theme: <span class="highlight">${theme?.name || 'default'}</span>\nmore themes coming soon \u2728`;
    }

    case 'fortune':
      return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];

    case 'cowsay': {
      const message = args || 'moo';
      return COWSAY(message);
    }

    case 'sudo':
      return 'nice try \uD83D\uDE0F';

    case 'rain':
      return '__RAIN__';

    case 'matrix':
      return '__MATRIX__';

    case 'grow':
      return '__GROW__';

    case 'close':
      if (args === 'all' || args === '--all') {
        closeAll?.();
        return 'closing all windows...';
      }
      return '<span class="error">usage: close all</span>';

    case '':
      return '';

    default:
      return `<span class="error">command not found: ${command}</span>. type <span class="prompt">help</span> for available commands.`;
  }
}
