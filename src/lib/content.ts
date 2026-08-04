/**
 * ============================================================
 *  SITE CONTENT — edit this file to personalize the whole site.
 *  Every section pulls its copy from here. No need to touch
 *  component code to change names, dates, or wording.
 *
 *  Quick start for your own gift:
 *  1. Update `graduates` and `signature` below.
 *  2. Drop two photos in public/gallery/ and update `galleryImages`.
 *  3. Adjust `timeline`, `letter`, and `roadmap` to their story.
 *  4. Run `npm run dev` and check every section.
 * ============================================================
 */

export const graduates = {
  names: ["Alex Rivera", "Jordan Kim"] as [string, string],
  shortNames: ["Alex", "Jordan"] as [string, string],
  degree: "Bachelor of Science in Computer Science",
  university: "Your University",
  gradYear: "2026",
};

export const signature = {
  from: "With love and pride,",
  name: "Mom & Dad",
};

export const bootSequence = [
  "Initializing Graduation Protocol...",
  "Loading Memories...",
  "Compiling Dreams...",
  "Linking 4 years of late nights...",
  "Resolving dependencies: coffee, code, chaos...",
  "Success.",
];

export const hero = {
  title: "Congratulations, Engineers.",
  subtitle: [
    "Every bug fixed,",
    "every deadline survived,",
    "every late night mattered.",
  ],
  cta: "Scroll to relive it",
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
  icon: "spark" | "code" | "book" | "bug" | "trophy" | "rocket";
};

export const timeline: TimelineItem[] = [
  {
    year: "Year 1",
    title: "First 'Hello, World'",
    description:
      "Two strangers in an intro CS lecture, terrified of a blinking cursor. Neither knew this was the beginning of everything.",
    icon: "spark",
  },
  {
    year: "Year 1",
    title: "The First All-Nighter",
    description:
      "A data structures assignment due at 9 AM. Coffee at 2 AM. A working linked list at 6 AM. A friendship forged in stack traces.",
    icon: "code",
  },
  {
    year: "Year 2",
    title: "Declared the Major",
    description:
      "Officially Computer Science. No turning back now — just recursion, and a growing pile of energy drink cans.",
    icon: "book",
  },
  {
    year: "Year 2",
    title: "The Bug That Took a Week",
    description:
      "A missing semicolon. A misplaced index. Whatever it was, it taught patience no textbook ever could.",
    icon: "bug",
  },
  {
    year: "Year 3",
    title: "First Internship Offer",
    description:
      "Proof that this wasn't just theory anymore. The real world wanted what they'd built in dorm rooms and libraries.",
    icon: "rocket",
  },
  {
    year: "Year 3",
    title: "The Capstone Project",
    description:
      "Late nights, group chats at 3 AM, a demo that almost crashed — and then didn't. A masterpiece, by their own hands.",
    icon: "code",
  },
  {
    year: "Year 4",
    title: "Final Exams, Final Boss",
    description:
      "The hardest semester. The most tired they'd ever been. And still — they showed up, every single time.",
    icon: "book",
  },
  {
    year: "2026",
    title: "Graduation Day",
    description:
      "Four years compiled into one moment. No errors. No warnings. Just two engineers, ready to ship.",
    icon: "trophy",
  },
];

// Add your own photos to public/gallery/ and reference them here.
// Recommended aspect ratio: 4:5 (portrait).
export const galleryImages = [
  {
    src: "/gallery/photo-1.svg",
    caption: `${graduates.shortNames[0]} — cap, gown, and four years well spent.`,
  },
  {
    src: "/gallery/photo-2.svg",
    caption: `${graduates.shortNames[1]} — Class of ${graduates.gradYear}, officially an engineer.`,
  },
];

export type TerminalResponse = {
  command: string;
  hint: string;
  output: string[];
};

export const terminalCommands: TerminalResponse[] = [
  {
    command: "help",
    hint: "list available commands",
    output: [
      "Available commands:",
      "  help          show this list",
      "  whoami        display graduate identity",
      "  skills        list acquired abilities",
      "  future        preview what's next",
      "  coffee        emergency fuel injection",
      "  sudo graduate run the graduation protocol",
      "  rm exams      permanently delete exam anxiety",
      "  debug life    run diagnostics on life itself",
      "  clear         clear the terminal",
    ],
  },
  {
    command: "whoami",
    hint: "who wrote this code",
    output: [
      `${graduates.shortNames[0]} & ${graduates.shortNames[1]}`,
      "role: Computer Science Graduates",
      "status: officially dangerous with a keyboard",
      "uptime: 4 years, 0 days of giving up",
    ],
  },
  {
    command: "skills",
    hint: "acquired abilities",
    output: [
      "[■■■■■■■■■■] Debugging under pressure",
      "[■■■■■■■■■□] Turning coffee into code",
      "[■■■■■■■■■■] Googling the exact right error message",
      "[■■■■■■■□□□] Sleeping on a normal schedule",
      "[■■■■■■■■■■] Never giving up on a broken build",
      "[■■■■■■■■■■] Friendship.exe — fully compiled",
    ],
  },
  {
    command: "future",
    hint: "cat future.txt",
    output: [
      "Loading future.txt...",
      "",
      "  > Great products, shipped with care.",
      "  > Teams that trust you with hard problems.",
      "  > A career built one commit at a time.",
      "  > And a friendship that started with a shared syntax error.",
      "",
      "future.txt written successfully.",
    ],
  },
  {
    command: "coffee",
    hint: "emergency fuel injection",
    output: [
      "brewing...",
      "☕ ☕ ☕",
      "Caffeine levels: critical → optimal",
      "Bugs remaining: unchanged, but you feel ready now.",
    ],
  },
  {
    command: "sudo graduate",
    hint: "requires 4 years of privilege escalation",
    output: [
      "[sudo] password for student: ****************",
      "Verifying 4 years of credit hours... OK",
      "Verifying countless nights of debugging... OK",
      "Verifying you never actually gave up... OK",
      "",
      "Permission granted.",
      "🎓 GRADUATED. Root access to your future: unlocked.",
    ],
  },
  {
    command: "rm exams",
    hint: "rm -rf ./anxiety",
    output: [
      "rm: preparing to remove 'exams' and all subdirectories...",
      "  deleting final_exam_stress.tmp",
      "  deleting all_nighter_regret.log",
      "  deleting 'what if I fail' thoughts",
      "exams: permanently deleted.",
      "Disk space freed: an enormous amount of mental energy.",
    ],
  },
  {
    command: "debug life",
    hint: "run diagnostics",
    output: [
      "Running diagnostics on life.js...",
      "  [OK] Passion for building things — detected",
      "  [OK] Resilience — detected",
      "  [OK] Good people around you — detected",
      "  [WARN] Imposter syndrome — present, but ignorable",
      "  [OK] Everything you need to succeed — already installed",
      "",
      "0 critical errors found. You're ready to deploy.",
    ],
  },
];

export const achievement = {
  title: "Bachelor of Computer Science",
  subtitle: "Unlocked",
  rarity: "Legendary",
  description:
    "Awarded for surviving four years of compilers, algorithms, and existential debugging sessions.",
};

export type RoadmapStep = {
  label: string;
  detail: string;
};

export const roadmap: RoadmapStep[] = [
  { label: "University", detail: "Where it all began" },
  { label: "Graduation", detail: "You are here" },
  { label: "First Job", detail: "Real code, real stakes" },
  { label: "Senior Engineer", detail: "Mentor. Architect. Builder." },
  { label: "Dream Company", detail: "The one you always talked about" },
  { label: "Keep Building", detail: "The story never really ends" },
];

export const letter = {
  salutation: `Dear ${graduates.shortNames[0]} and ${graduates.shortNames[1]},`,
  paragraphs: [
    "Four years ago, you sat down in front of a blinking cursor and had no idea what you were capable of. Today, you know.",
    "We watched you debug things that seemed unfixable — in your code, and in yourselves. We watched you stay up too late, worry too much, and show up anyway, every single time. That's not talent. That's character.",
    "Nothing about this was easy, and that's exactly why it matters. You didn't just learn to write software — you learned to think clearly under pressure, to solve problems no one taught you the answer to, and to keep going when it would've been easier to stop.",
    "We are unbelievably proud of the engineers — and the people — you've become.",
    "This diploma is not a finish line. It's a compiled build of everything you've learned so far, ready to run in the real world. Whatever you build next, know that you're not building it alone.",
  ],
  closing: "Congratulations. You earned every bit of this.",
};

export const ending = {
  line1: "The journey doesn't end here.",
  line2: "It only begins.",
};

export const keyboardShortcuts = [
  { keys: "↑ / ↓", action: "navigate command history in terminal" },
  { keys: "Tab", action: "autocomplete terminal command" },
  { keys: "G then T", action: "jump to terminal section" },
  { keys: "G then H", action: "jump back to hero" },
  { keys: "M", action: "toggle background music" },
  { keys: "?", action: "show keyboard shortcuts" },
];
