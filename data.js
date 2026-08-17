// ── Life Solar System — YOUR DATA FILE ─────────────────────────────────
// `setup: true` below shows a friendly first-run wizard (name → pick your
// planets → optional first goal) to anyone who opens the page fresh. Their
// answers are saved in the browser; this file is the fallback starter.
//
// Three ways to make the system yours:
//   A. Just open index.html and follow the wizard (or use the ✎ buttons).
//   B. Open START-PROMPT.md and let an AI interview you, then save its
//      output as this file.
//   C. Edit this file by hand — planets are entries in `areas`, and goals
//      look like this:
//
//      goals: [
//        { title: "Exercise at least 3x per week",
//          status: "ongoing",          // "ongoing" (glows) | "someday" | "done"
//          perWeek: 3,                 // optional: weekly tick circles (reset Mondays)
//          perWeekMax: 7,              // optional: dashed bonus circles past the minimum
//          due: "2026-12-31",          // optional: shows in Timeline + calendar export
//          note: "Gym Tue/Thu",        // optional: context in the side panel
//          subgoals: [ { title: "First 5k" } ],   // optional: milestone checklist
//        },
//      ],
//
// NOTE: once someone edits planets in the page (wizard or ✎ buttons), the
// browser's saved copy takes over and this file no longer shows through.
// ───────────────────────────────────────────────────────────────────────
const system = {
  title: "My Life Solar System",
  subtitle: "Each planet is a part of life. A green glow means something's actively happening.",
  sunLabel: "Me",
  setup: true,
  areas: [
    { label: "Work",    color: "#7aa2ff", goals: [] }, // career, business, your main thing
    { label: "School",  color: "#b48cff", goals: [] }, // classes, degrees, learning
    { label: "Money",   color: "#ff8fa3", goals: [] }, // earning, saving, investing
    { label: "Body",    color: "#5fd0c7", goals: [] }, // fitness, sleep, food, health
    { label: "Mind",    color: "#8fd3ff", goals: [] }, // mental health, mindfulness
    { label: "People",  color: "#ff9d76", goals: [] }, // family, friends, romance
    { label: "Growth",  color: "#5cb85c", goals: [] }, // skills, reading, curiosity
    { label: "Play",    color: "#ff8fd8", goals: [] }, // fun, adventure, hobbies
    { label: "Home",    color: "#d9b26a", goals: [] }, // your space, life admin
    { label: "Purpose", color: "#b9a7f0", goals: [] }, // meaning, giving back
  ],
};
