const FORTUNES = [
  "You will debug a CSS issue for 3 hours only to find a missing semicolon.",
  "A grilled cheese of great significance will enter your life soon.",
  "The One Piece is real. (Source: trust me.)",
  "Your next deploy will go smoothly. Just kidding. Check your env variables.",
  "Someone will ask you to 'make the logo bigger.' Stand firm.",
  "A mysterious stranger will offer you a job. They found you through this portfolio.",
  "You will discover a new onsen that changes your definition of relaxation.",
  "Today's mass: perfectly proofed sourdough. Tomorrow's mass: imposter syndrome. Balance.",
  "Luffy wouldn't give up and neither should you. Now go fix that bug.",
  "A Monopoly Deal betrayal is in your near future. You will recover. Eventually.",
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
        <span class="prompt">OS:</span>      RikaOS v2.1
        <span class="prompt">Host:</span>    portfolio
        <span class="prompt">Kernel:</span>  react 18.x
        <span class="prompt">Shell:</span>   rika-shell
        <span class="prompt">Theme:</span>   ${theme}
        <span class="prompt">DE:</span>      RikaDE
        <span class="prompt">WM:</span>      draggable-windows
        <span class="prompt">Font:</span>    Space Grotesk
        <span class="prompt">CPU:</span>     vibes @ 3.4GHz
        <span class="prompt">Memory:</span>  847 grilled cheeses cached
        <span class="prompt">Uptime:</span>  since 1997
`;
};

const HELP_TEXT = `
<span class="highlight">Available Commands:</span>

  <span class="prompt">help</span>          Show this help message
  <span class="prompt">whoami</span>        Who am I?
  <span class="prompt">ls</span>            List all apps
  <span class="prompt">open [app]</span>    Open an app
  <span class="prompt">clear</span>         Clear the terminal
  <span class="prompt">neofetch</span>      System info
  <span class="prompt">theme</span>         Current theme info
  <span class="prompt">fortune</span>       Get a random fortune
  <span class="prompt">cowsay [msg]</span>  Make a cow say something
  <span class="prompt">rain</span>          Toggle rain effect
  <span class="prompt">matrix</span>        Toggle matrix effect
  <span class="prompt">grow</span>          Grow something in the terrarium
  <span class="prompt">sudo</span>          Escalate privileges
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
      return '<span class="highlight">rika ciminieri</span> \u2014 full-stack engineer, grilled cheese scientist, one piece theorist';

    case 'ls': {
      if (!apps || apps.length === 0) {
        return '<span class="error">No apps found.</span>';
      }
      const list = apps.map((app) => `  <span class="prompt">${app}</span>`).join('\n');
      return `<span class="highlight">Applications:</span>\n${list}`;
    }

    case 'open': {
      if (!args) {
        return '<span class="error">Usage: open [app name]</span>';
      }
      const match = apps?.find(
        (a) => a.toLowerCase() === args.toLowerCase()
      );
      if (match) {
        openApp?.(match);
        return `Opening <span class="highlight">${match}</span>...`;
      }
      return `<span class="error">App not found: "${args}"</span>. Type <span class="prompt">ls</span> to see available apps.`;
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
      return `Current theme: <span class="highlight">${theme?.name || 'default'}</span>\nMore themes coming soon \u2728`;
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
        return 'Closing all windows...';
      }
      return '<span class="error">Usage: close all</span>';

    case '':
      return '';

    default:
      return `<span class="error">command not found: ${command}</span>. Type <span class="prompt">help</span> for available commands.`;
  }
}
