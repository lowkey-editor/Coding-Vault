# PRD — lang/index (Programming Language Field Guide)

## Original Problem Statement
User had a plain HTML page listing 7 programming languages (Python, Java, C, C++, C#, JavaScript, TypeScript) with logos. Requested: brief details per language, a "learn basics" button, responsive clean minimal look with transition effects, extremely dynamic with advanced animations/interactivity, very detailed per-language pages, aesthetic color scheme, NO gradients.

## User Choices (confirmed)
- Dark editorial: deep ink background (#050505), warm off-white text (#F4F0EA), sharp accent (#FF3300), no gradients
- Dedicated detail page per language (React Router)
- Full interactive experience: hero, animated stats, code snippets with syntax styling, use cases, timeline, pros/cons
- Frontend-only (no backend/database)

## Architecture
- React 19 (CRA/craco) frontend-only; backend template left untouched
- React Router: `/` (home) and `/language/:slug` (detail pages)
- framer-motion (masked line reveals, scroll reveals, micro-interactions), lenis (momentum scrolling), react-fast-marquee (editorial marquee), react-syntax-highlighter (Prism, custom editorial theme), react-icons/si (monochrome language logos)
- All content in `/app/frontend/src/data/languages.js`
- Design system from `/app/design_guidelines.json`: Clash Display / Cormorant Garamond / Satoshi / JetBrains Mono; flat surfaces, 1px hairline grids, bento Tetris index grid, numbered chapters

## Implemented (July 2026)
- Rebrand to CodingVault: wordmark "Coding" (Clash Display) + "Vault" (Cormorant italic accent) with a masked color-swap hover animation; browser title and meta description updated; tagline "Seven Languages. One Coding Journey. / Learn the fundamentals, practice the basics, and discover which language fits you best" placed as the home hero kicker + description
- Language quick-picker: the navbar "07 LANGUAGES" button opens a full-screen staggered overlay of all languages (ESC/close button, Lenis scroll lock with data-lenis-prevent on the inner list so the overlay scrolls); picking one navigates to its page and auto-scrolls straight to the Basics chapter via #basics hash handling
- Navbar "Index" button scrolls to the language grid from anywhere (cross-page navigate + delayed re-aim scroll)
- Keyboard shortcuts: pressing 1–6 on any language page jumps straight to that chapter (guarded against modifier keys and text inputs); key hints shown in the chapter bar
- Reading progress: a 2px accent line fixed to the top of every detail page grows with scroll depth, spring-smoothed via framer-motion useScroll
- Section bookmarks: sticky chapter nav on detail pages (Story / Basics / Code / Timeline / Where it runs / Trade-offs) with smooth Lenis jumps, scroll-spy active highlighting, and a drift-correction re-aim for late font-swap layout shifts
- Copy code buttons: one-tap copy with Copied feedback on the main syntax-highlighted snippet and every basics mini-code block (with clipboard fallback)
- Language picker quiz at /quiz: 4 questions with animated slide transitions, progress hairline, weighted scoring, and a result screen (giant masked name, accent icon, tailored reason, "Start learning" CTA, retake); reachable via navbar "Find yours" link and a CTA banner at the bottom of the home index
- Terminal typing hero on detail pages: a terminal window types each language's hello-world line character by character with blinking cursor, syntax-tinted string literals, then prints the output; a "Re-run" button replays the animation on demand
- Home: kinetic hero ("SEVEN LANGUAGES, one MACHINE") with masked line-by-line reveal + mouse-parallax logo cluster; slow editorial marquee; numbered manifesto chapters; bento language index grid with hover micro-interactions and "Learn the basics" buttons; editorial footer
- 7 detail pages, each with: hero (giant masked title, rotating logo reveal, meta grid), animated stat bars (sticky), 3-paragraph story, "Learn the basics" (4 concept cards with mini code), full syntax-highlighted real-world code example, history timeline, use-case grid, honest pros/cons, prev/next language navigation
- Lenis smooth scrolling, noise texture overlay, custom scrollbar, accent selection color, responsive down to mobile, data-testids throughout

## User Personas
- Beginner choosing a first language
- Student exploring language history and trade-offs
- Curious developer comparing paradigms

## Verified
- Home renders + scroll reveals work (screenshot)
- Click "Learn the basics" on C# card → navigates to detail page (screenshot)
- Detail page: hero, stats, code block with syntax colors, timeline, pros/cons, prev/next (screenshots)
- Mobile viewport renders cleanly (screenshot)

## Backlog
- P2: Quiz result sharing (copyable link); chapter deep links (shareable URL per chapter)
- P3: Dark/light toggle (light editorial variant); more languages (Go, Rust, Kotlin); share buttons

## Credentials
- None required — no auth, no database.
