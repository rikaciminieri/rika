# RikaOS Feature List

Running list of everything implemented. Check off when production-ready.

## Core OS Shell
- [x] Desktop with icon grid (8 apps)
- [x] Window manager: drag, resize, minimize, maximize, close
- [x] Window snap-to-edge (left half, right half, fullscreen)
- [x] Cascading window positioning on open
- [x] Z-index stacking / focus management
- [x] Taskbar with open app tabs, clock, tray area
- [x] Boot sequence with themed messages
- [x] Mobile: fullscreen windows, single-tap icons

## Apps
- [x] **About** — profile photo, bio, social links (GitHub/LinkedIn/X), boop animations
- [x] **Projects** — engineering portfolio (placeholder content)
- [x] **Terminal** — 12 commands: help, whoami, ls, open, clear, neofetch, theme, fortune, cowsay, rain, matrix, grow, sudo
- [x] **Gallery** — paintings and book nooks display
- [x] **Currently** — watching/reading/listening
- [x] **Grilled Cheese** — rankings with photos and descriptions
- [x] **Japan** — heritage content
- [x] **Trash** — finder-style file browser

## Interactions & Effects
- [x] Kawaii floating particles (stars, sparkles, hearts) with mouse repulsion physics
- [x] Soft blurred cloud background layers
- [x] Watermark canvas with glow painting cursor trail
- [x] One Piece HoverReveal with typewriter effect + 3 randomized reveal effects (Haki Crack lightning, Manga Panel ink splash, Treasure Map parchment with compass)
- [x] Icon hover boop animations (useBoop)
- [x] Social link spring animations
- [x] Screensaver (120s idle)
- [x] Night mode toggle (sun/moon)

## System Features
- [x] Command palette (Cmd+K / Ctrl+K)
- [x] Right-click context menu
- [x] Bilingual EN/JP toggle with full i18n
- [x] Audio: icon hover scale notes, ambient hum
- [x] Konami code easter egg (cheese rain)
- [x] Desktop bouncing ball easter egg
- [x] Watermark ripple canvas

## Theming (DISABLED — kawaii-only for MVP)
- [ ] Ghibli theme (ink & nature)
- [ ] Holographic theme (neon & glitch)
- [ ] Terrarium theme (moss & glass)
- [ ] Theme switching UI (context menu, command palette, terminal)
- [ ] Theme transition fade overlay

## Data Pipeline
- [x] Letterboxd RSS integration (build-time Vite plugin fetches fresh data on every deploy)
- [x] Goodreads CSV processor (`npm run data:books`)
- [x] Currently app reads real watching/reading data from generated JSON
- [ ] Apple Music API integration (listening data)
- [ ] Instagram personality mining (voice/copy calibration)
- [ ] Site copy rewrite using voice profile

## TODO for MVP
- [ ] Review all app content for filler vs real
- [ ] Responsive polish pass
- [ ] Performance audit
- [ ] Deploy
