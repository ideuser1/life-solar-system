// ── Life Solar System — YOUR DATA FILE ─────────────────────────────────
// This file is the starting configuration for your solar system.
// Two ways to make it yours (pick one):
//
//   A. THE EASY WAY: don't edit this file at all. Open START-PROMPT.md,
//      paste the prompt into an AI chat (Claude, ChatGPT, ...), answer its
//      questions, and it will write this whole file for you.
//
//   B. BY HAND: edit below —
//      1. Change the title and sunLabel.
//      2. DELETE any areas (planets) you don't want — most people keep 4–7.
//      3. Rename areas or ADD YOUR OWN — copy the shape of any area below.
//         Colors are yours to change too (any hex color works).
//      4. Replace the example goals with real ones.
//
// (You can also add/edit planets and goals inside the page itself with the
//  ✎ buttons. Note: once you do, the page's own saved copy takes over and
//  changes made in this file will no longer show up.)
//
// Goal statuses:
//   "ongoing"  → actively working on it (planet glows green)
//   "someday"  → on the list, not started yet
//   "done"     → finished (add completed: "2026-10-02" for the Progress view)
//
// Optional extras on any goal (all shown in examples below):
//   due: "2026-09-15"   → appears in the Timeline view + calendar export
//   perWeek: 3          → weekly tick circles, reset every Monday
//   perWeekMax: 5       → extra dashed "bonus" circles past the minimum
//   subgoals: [...]     → clickable milestone checklist
//   note / updated      → context shown in the side panel
// ───────────────────────────────────────────────────────────────────────
const system = {
  title: "My Life Solar System",
  subtitle: "Each planet is a part of life. A green glow means something's actively happening.",
  sunLabel: "Me",
  areas: [
    {
      label: "Work",   // career, business, your main thing
      color: "#7aa2ff",
      goals: [
        { title: "Example: ship the big project by Oct 1", status: "ongoing", due: "2026-10-01" },
      ],
    },
    {
      label: "School", // classes, degrees, applications
      color: "#b48cff",
      goals: [
        { title: "Example: finish assignment 3", status: "someday" },
      ],
    },
    {
      label: "Money",  // earning, saving, investing
      color: "#ff8fa3",
      goals: [
        { title: "Example: save $1,000",
          status: "someday",
          subgoals: [
            { title: "$250 saved" },
            { title: "$500 saved" },
            { title: "$1,000 saved" },
          ] },
      ],
    },
    {
      label: "Body",   // fitness, sleep, food, health
      color: "#5fd0c7",
      goals: [
        { title: "Example: exercise at least 3x per week", status: "ongoing", perWeek: 3, perWeekMax: 7 },
      ],
    },
    {
      label: "Mind",   // mental health, mindfulness, emotional habits
      color: "#8fd3ff",
      goals: [
        { title: "Example: journal once a week", status: "ongoing", perWeek: 1, perWeekMax: 3 },
      ],
    },
    {
      label: "People", // family, friends, romance, community
      color: "#ff9d76",
      goals: [
        { title: "Example: call a friend or family member each week", status: "ongoing", perWeek: 1, perWeekMax: 3 },
      ],
    },
    {
      label: "Growth", // learning, skills, reading, curiosity
      color: "#5cb85c",
      goals: [
        { title: "Example: read 10 pages each week", status: "someday", perWeek: 1, perWeekMax: 3 },
      ],
    },
    {
      label: "Play",   // fun, adventure, hobbies, whimsy
      color: "#ff8fd8",
      goals: [
        { title: "Example: one small adventure per month", status: "someday" },
      ],
    },
    {
      label: "Home",   // your space, environment, life admin
      color: "#d9b26a",
      goals: [
        { title: "Example: declutter one drawer per week", status: "someday", perWeek: 1 },
      ],
    },
    {
      label: "Purpose", // spirituality, meaning, giving back
      color: "#b9a7f0",
      goals: [
        { title: "Example: volunteer once this quarter", status: "someday" },
      ],
    },
  ],
};
