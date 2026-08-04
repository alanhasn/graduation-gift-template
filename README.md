# 🎓 Graduation Gift Template

An extraordinary, interactive graduation gift website — dark, futuristic,
cinematic. Built to feel like a premium digital experience (think
Apple × GitHub × Stripe × Linear), not a normal "congrats" page.

A fake terminal boot sequence leads into an animated hero, a scroll-driven
timeline of the university years, a photo gallery, a **real, typeable
terminal** with easter eggs, a confetti achievement unlock, an animated
roadmap of what's next, a heartfelt letter, a fireworks-and-starfield
finale with an ambient music toggle, and a closing signature.

Everything is driven by one content file — no need to touch component
code to make it yours.

**[Live demo instructions below ↓](#-run-it-locally)**

## ✨ Features

- Dark, glassmorphic, neon-accented UI with animated gradients
- Fake terminal boot sequence on load
- Animated hero with a WebGL starfield (React Three Fiber) and mouse parallax
- Scroll-triggered vertical timeline with a GitHub-style contribution graph
- Photo gallery with hover effects and a keyboard-navigable lightbox
- A working terminal: `help`, `whoami`, `skills`, `future`, `coffee`,
  `sudo graduate`, `rm exams`, `debug life`, autocomplete, command history,
  and a couple of hidden easter eggs
- Achievement-unlock card with confetti
- Animated "what's next" roadmap
- Heartfelt letter section with elegant typography
- Finale with fireworks, floating particles, and a synthesized ambient
  music toggle (no audio files required — it's generated with WebAudio)
- Global extras: keyboard shortcuts (`?` to view them), cursor glow,
  scroll progress bar, matrix rain, floating code snippets, Konami code

## 🛠 Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
React Three Fiber / drei · GSAP · canvas-confetti · lucide-react

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🎨 Make it yours

Everything you need to personalize lives in **[`src/lib/content.ts`](src/lib/content.ts)**:

| Field | What it controls |
|---|---|
| `graduates` | Names, degree, university, graduation year |
| `signature` | Who the gift is from, shown at the very end |
| `bootSequence` | Lines of the opening terminal boot animation |
| `hero` | Big headline + subtitle |
| `timeline` | Each milestone card in the scrolling timeline |
| `galleryImages` | Photos + captions (see below) |
| `terminalCommands` | What each terminal command prints |
| `achievement` | The unlocked-achievement card copy |
| `roadmap` | Steps in the "what's next" roadmap |
| `letter` | The heartfelt letter's paragraphs |
| `ending` | Final closing line |
| `keyboardShortcuts` | Text shown in the `?` shortcuts overlay |

### Adding real photos

1. Drop your photos in `public/gallery/` (portrait orientation, ~4:5
   aspect ratio looks best).
2. Update `galleryImages` in `src/lib/content.ts` to point at them:

   ```ts
   export const galleryImages = [
     { src: "/gallery/your-photo-1.jpg", caption: "..." },
     { src: "/gallery/your-photo-2.jpg", caption: "..." },
   ];
   ```

3. Delete the placeholder `photo-1.svg` / `photo-2.svg` once replaced.

## 📦 Deploy it (free)

The site is a static export — no server required — so it deploys for
free almost anywhere.

**Fastest — Netlify Drop (no account needed):**

```bash
npm run build
```

Then drag the generated `out/` folder onto
[app.netlify.com/drop](https://app.netlify.com/drop) — you'll get a live
link in seconds.

**Or Vercel / Netlify / Cloudflare Pages via GitHub:** connect this repo,
build command `npm run build`, output directory `out`.

## 📁 Project structure

```
src/
  app/                # Next.js App Router entry (layout, page, globals.css)
  components/          # One folder per section (hero, timeline, terminal, ...)
  context/              # Shared ambient-music context
  hooks/                # useMousePosition, useSound, useAmbientMusic
  lib/
    content.ts           # <- all site copy lives here
    utils.ts
public/
  gallery/               # Your photos go here
```

## 📄 License

MIT — use this for your own graduation gift, a friend's, or fork it into
something else entirely. See [LICENSE](LICENSE).

---

If you build a gift with this, it'd be lovely to hear about it — but
there's no obligation. Good luck with the surprise. 🎉
