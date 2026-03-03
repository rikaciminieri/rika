## Creative Direction

### Who I Am

Rika Ciminieri — half-Japanese full-stack engineer at Eventbrite. Former microbiology student turned tech advocate. Whimsical, witty, bubbly, warm. At work I'm the person who makes everyone laugh in a meeting AND the one who anticipates people's needs and gets things done before anyone has to ask. I have incredible range and I want this site to prove it.

I paint (paint-by-numbers for friends), do pilates, craft tiny book nooks that stack up on my shelves, and have deeply researched One Piece theories. I rank grilled cheeses competitively (recruiters already love this). I go to Japan almost every year, love onsens, and consume Japanese dramas, reality shows, and music (Hana Yori Dango, Terrace House, Yoasobi, Dodo). I'm currently into Bridgerton, The Traitors, Heated Rivalry, learning AI, Monopoly Deal, traveling, and learning how to sing.

Hills I'll die on: Michael Jackson is the king of pop. The Rock's Jumanji is actually a good movie. Health and time with people you love is the most important thing in the world.

### Site Purpose

Dual purpose: showcase engineering skill AND express personality. The site itself is the technical portfolio — the code is the proof of competence. But the experience should make someone think "wow, she's so cool" and "I want to work with this person." Technical credibility wrapped in genuine fun.

This is NOT a resume with links. It's also NOT a personality shrine. It's the work of a skilled engineer who happens to be an incredibly fun person. The personality is the seasoning, the engineering is the dish.

### The Feeling I Want People to Leave With

"This person has incredible range. She took the time to make her engineering as creative as her personality. I want to know her."

### Tone of Voice

Fun and approachable — like texting a smart friend. Never corporate, never trying too hard to be funny. The humor should feel effortless and natural, like it slipped out. Think: bubbly warmth with the occasional sharp, witty aside.

### Core Concept

Open for exploration — Claude has creative direction here. The site should feel like a world to explore, not a page to scroll. Some ideas I'm drawn to: a desktop/OS metaphor (like "RikaOS" where content lives in windows and apps), a museum or neighborhood you wander through, a game-like space with discovery and progression. But I don't want to commit to a metaphor before seeing what Claude comes up with. Surprise me. The only requirement is that the experience feels spatial, explorable, unique, and alive — not a traditional top-to-bottom portfolio layout.

### The "Rooms" — Content Areas

Think of the site as a space with distinct areas to explore:

- **Engineering** — projects, technical blog posts, work experience. This is the backbone. The site itself is the flagship project, with more added over time as I build with Claude.
- **Japan** — bilingual content, cultural connection, eventually a "Rika's Ultimate Japan Guide" blog. This is heritage, not decoration.
- **One Piece** — theories, passion, a space for the thing I nerd out about hardest
- **Grilled Cheese Olympics** — the signature content. Currently static cards with rankings. Should become an interactive, shareable, delightful experience that people talk about.
- **The Gallery** — a museum-like space for paintings and book nooks. The building journey matters as much as the finished pieces. These are how I turn my brain off and work with my hands.

### Identity & Language

- Half-Japanese — this is central to who I am, not decorative
- Full bilingual support (EN/JP toggle) with architecture that scales to more languages later
- Japanese typography, cultural references, and aesthetic sensibility woven in naturally
- Japanese dramas, music, and travel are real content — Terrace House, Yoasobi, onsen culture, annual trips
- The language toggle should feel like part of the OS, not an afterthought

### Vibe

- Whimsical, witty, bubbly, warm
- Playful but polished — the craft should be evident
- Funny and punchy — personality in microinteractions and copy, but never forced
- Not corporate, not template-y, not "developer portfolio #4,729"

### What Excites Me

- Easter eggs and hidden interactions users discover organically
- Mini-games or toys embedded in the site
- Desktop/OS metaphors where content lives in "apps" and "windows"
- Strong typographic choices — expressive font pairings, not just system fonts
- Texture and depth — grain, layering, subtle 3D touches (but not a full 3D scene like bruno-simon.com)
- The gallery/museum idea where paintings and book nooks are displayed as art

### Design Principles

- Unconventional navigation — no boring top nav bar
- Every page transition should feel intentional
- Mobile experience should be just as considered, not a watered-down desktop
- Technical content (blog posts, project write-ups) should be well-structured and demonstrate real engineering depth
- Personal content should be tasteful and inviting, not overwhelming
- The balance: if you only saw the engineering content, you'd be impressed. If you only saw the personal content, you'd be charmed. Together, the range is what makes it special.

### Reference: posthog.com

I love PostHog's personality-driven approach. Hedgehogs everywhere, playful illustrations, a brand that doesn't take itself too seriously but is clearly built by skilled people. I want that same energy.

### What to Avoid

- Generic component library aesthetics (no plain shadcn/Material UI defaults)
- Stock-feeling layouts (hero → about → projects → contact)
- Stiff or lifeless pages — if nothing moves, something's wrong
- Taking the "safe" route on any design decision
- Treating Japanese content as secondary or decorative
- Making it ALL personality with no substance — the engineering must speak for itself
- Personality that feels performative or try-hard — it should feel natural

## Workflow Orchestration

### 1. Plan Node Default

Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
If something
sideways,
STOP and re-plan immediately - don't keep pushing

Use plan mode for verification steps, not just building
Write detailed specs upfront to reduce ambiguity
Subagent Strategy

Use subagents liberally to keep main context window clean
Offload research, exploration, and parallel analysis to subagents
For complex problems, throw more compute at it via subagents
One tack per subagent for focused execution

### 3. Self-Improvement Loop

After ANY correction from the user: update 'tasks/lessons md with the pattern
Write rules for yourself that prevent the same mistake
Ruthlessly iterate on these lessons until mistake rate drops
Review lessons at session start for relevant project

### 4. Verification Before Done

Never mark a task complete without proving it works
Diff behavior between main and your changes when relevant
Ask yourself: "Would a staff engineer approve this?"
Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

For non-trivial changes: pause and ask "is there a more elegant way?"
If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
Skip this for simple, obvious fixes - don't over-engineer
Challenge your own work before presenting it

### 6. Autonomous Bug Fizing

When given a bug report: just fix it. Don't ask for hand-holding
Point at logs, errors, failing tests - then resolve them
Zero context switching required from the user
Go fix failing CI tests without being told how

## Task Management

**Plan First**: Write plan to 'tasks/todo.md\* with checkable items
**Verify Plan**: Check in before starting implementation

*Track Progress\*\*: Mark items complete as you go
*Explain Changes**: High-level summary at each step
\*Document Results**: Add review section
_Capture Lessons_: Update tasks/lessons-md
after corrections

## Core Principles

**Simplicity First**: Make every change as simple as possible. Impact minimal code.
**No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
**Minimat Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
