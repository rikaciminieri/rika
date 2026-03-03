# RikaOS React Migration — Task Tracking

## Phase 1: Foundation — Theme Engine + Desktop Shell + Single Window
- [x] Create directory structure (contexts/, components/os/, components/apps/, themes/, content/, etc.)
- [x] Create ThemeContext with CSS var injection, night mode, localStorage persistence
- [x] Create LanguageContext with EN/JP toggle and t() translation function
- [x] Create AudioContext (stub for Phase 1)
- [x] Create WindowContext with full window management (open/close/minimize/maximize/focus/drag)
- [x] Create kawaii.js full theme config (vars, nightVars, boot messages, icon SVGs, CSS)
- [x] Stub ghibli.js, holographic.js, terrarium.js
- [x] Create themes/index.js registry
- [x] Create i18n.js translations dictionary
- [x] Create BootScreen component (terminal-style boot sequence with progress bar)
- [x] Create DesktopIcons component (8 icons with theme SVGs)
- [x] Create Desktop component (orchestrator: boot → desktop → auto-open About)
- [x] Create Window component (draggable, traffic lights, focus management)
- [x] Create WindowContainer (maps windows to app components)
- [x] Create Taskbar (start button, app tabs, night/lang toggles, clock)
- [x] Create AboutApp component (bilingual welcome content)
- [x] Rewrite index.css (Tailwind import + all structural CSS from prototype)
- [x] Rewrite App.jsx (context providers → Desktop, remove React Router)
- [x] Wire AboutApp into WindowContainer
- [x] Fix borderColor/border shorthand mixing warning
- [x] Verify: boot → desktop → open About → close/minimize → EN/JP toggle → night mode
- [x] npm run build succeeds

## Phase 2: Window Manager + All Apps + All Themes
- [x] Fix minimize animation (two-phase: CSS animation → display:none after 300ms)
- [x] Add functional window resize (mousedown on .win-resize → mousemove/mouseup)
- [x] Add snap-to-edge support (< 20px from edge → snap indicator → resize on mouseup)
- [x] Elevate desktop icon hover effects (scale, glow, label transitions)
- [x] Complete ghibli.js theme config (full vars, nightVars, CSS, icons, particles)
- [x] Complete holographic.js theme config (inverted night mode, scanlines, glitch)
- [x] Complete terrarium.js theme config (glass dome, pollen, mist, organic animations)
- [x] Create terminalCommands.js (help, whoami, ls, open, neofetch, theme, fortune, cowsay, sudo)
- [x] Create finderFiles.js (12 finder items with icons, sizes, metadata)
- [x] Expand i18n.js (50+ keys per language for all 8 apps)
- [x] Create ProjectsApp (6 project cards with tags)
- [x] Create TerminalApp + useTerminal hook (command input, output history, theme-aware)
- [x] Create GalleryApp (horizontal scroll, 5 items)
- [x] Create CurrentlyApp (2×2 grid, 6 categories)
- [x] Create GrilledCheeseApp (podium + tournament bracket)
- [x] Create JapanApp (header + 2×2 grid, 4 sections)
- [x] Create TrashApp (finder-style file browser with preview panel)
- [x] Create Particles.jsx (kawaii circles, ghibli soot+petals, holo shards, terrarium pollen)
- [x] Create BackgroundLayers.jsx (ghibli clouds, holo scanlines, terrarium mist+butterfly)
- [x] Update ThemeTransition.jsx + ThemeContext (isTransitioning state, fade overlay)
- [x] Update WindowContainer with all 8 app imports
- [x] Update Taskbar for theme-aware start button (SVG support)
- [x] Wire effects into Desktop.jsx (Particles, BackgroundLayers, ThemeTransition)
- [x] npm run build succeeds (271.77 KB JS, 37.24 KB CSS)
- [x] Browser verification: boot → all apps → all 4 themes → night mode → EN/JP → minimize/restore → resize → snap
- [x] Zero console errors

## Phase 3: Sound + Command Palette + Context Menu + Screensaver
- [x] Full AudioContext (playBoop, playScaleNote, startAmbientHum, melody unlock)
- [x] CommandPalette component (Cmd+K, search/filter, keyboard nav, 14 actions)
- [x] ContextMenu component (right-click, open apps, toggle lang, switch themes)
- [x] Screensaver component (120s idle timeout, dismiss on interaction)
- [x] CursorTrail component (theme-aware dots, throttled, fade out)
- [x] CheeseRain component (40 cheese emoji drops, 6s auto-cleanup)
- [x] useKonamiCode hook (arrow+B+A → cheese rain)
- [x] useIdleTimer hook (reset on keydown/mousemove/click/touch)
- [x] DesktopIcons play scale notes on hover (melody unlock easter egg)
- [x] Clock tooltip (hover 3s shows random fun fact)
- [x] Start button opens command palette
- [x] Mobile icons use single tap (< 768px)
- [x] npm run build succeeds (282.47 KB JS, 37.24 KB CSS)
- [x] Zero console errors

## Phase 4: Easter Eggs + Canvas Watermark + Polish
- [x] WatermarkCanvas (ripple simulation — Float32Array wave propagation, pixel displacement, bloom effect)
- [x] DesktopToy (bouncing physics ball — gravity, friction, bounce, wall collision)
- [x] themeEffects.js (triggerRain 60 drops, triggerMatrix 30×20 katakana cascade, triggerGrow 3-stage plant)
- [x] Terminal rain/matrix/grow commands wired to actual DOM effects
- [x] npm run build succeeds (288.92 KB JS, 37.34 KB CSS)
- [x] Zero console errors/warnings

## Phase 5: Mobile + Content + Cleanup
- [x] Google Fonts (Inter, Space Grotesk, JetBrains Mono, Klee One, Noto Sans JP, Playfair Display)
- [x] AboutApp: real content (profile photo, bilingual about, social links with useBoop, One Piece HoverReveal)
- [x] GrilledCheeseApp: real photos (andytown, starbucks, melt) + bilingual descriptions + restaurant links
- [x] HoverReveal: removed reusableStyles dependency
- [x] Mobile layout polish (stacked GC cards, centered about header, taskbar overflow, projects/currently grids)
- [x] Removed 9 old files (layout, hero, mainContent, aboutMe, socialLinks, darkModeToggle, languageToggle, grilledCheese, App.css, reusableStyles)
- [x] Removed react-router-dom dependency
- [x] npm run build succeeds (348.13 KB JS, 30.39 KB CSS, 91 modules)
- [x] Browser verified: all 4 themes (Kawaii, Ghibli, Holographic, Terrarium), bilingual EN/JP, mobile 375px, zero console errors
