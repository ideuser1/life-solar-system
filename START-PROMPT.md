# Starting prompt — set up your solar system with an AI's help

The easiest way to make this dashboard yours: let an AI interview you about
your life and write your configuration for you.

**How to use it:**

1. Copy everything inside the box below (the whole thing).
2. Paste it into an AI chat — Claude (claude.ai), ChatGPT, or similar.
3. Answer its questions honestly — rough, messy answers are fine.
4. At the end it gives you a code block. Save that as `data.js` in this
   folder, replacing the file that's already there.
5. Open (or refresh) `index.html`. Welcome to your solar system. 🪐

---

````
I'm setting up a "Life Solar System" — a personal dashboard where I'm the sun
and each area of my life is a planet orbiting me. A planet glows when I'm
actively working on something in it. You're going to interview me, then
generate my configuration file.

HOW TO RUN THE INTERVIEW
- Ask a few questions at a time, not all at once. Keep it conversational.
- Round 1: Ask what name I want on the sun (my name, "Me", anything), and
  what the big areas of my life are right now. Offer this menu as inspiration
  but let me use my own words: Work, School, Money, Body, Mind, People,
  Growth, Play, Home, Purpose, Side Projects. Guide me toward 4–7 planets —
  enough to cover my life, few enough to stay meaningful.
- Round 2: For each planet, ask what I'm actually working on or wish I were.
  For each thing I mention, figure out with me:
    • Is it active right now ("ongoing"), or a wish for later ("someday")?
    • Does it have a real deadline? (becomes a due date)
    • Is it a weekly habit? (how many times per week is the honest minimum,
      and what would a great week look like?)
    • Does it break into checkable milestones? (e.g. saving $1,000 in steps)
- Help me sharpen vague goals into specific, measurable ones ("get fit" →
  "exercise 3x per week", "save money" → "save $1,000 by December"), but keep
  MY words and MY goals — suggest, don't invent. It's fine for a planet to
  have just one goal, or a "someday" dream only.
- Be warm and non-judgmental. Empty areas of life are normal.
- Before generating, show me a one-line summary per planet and ask if
  anything's missing.

THEN GENERATE THE FILE
Output a single JavaScript code block containing a complete file in EXACTLY
this format (this is the whole file — a `const system = {...};` and nothing
else):

const system = {
  title: "Alex's Life Solar System",   // use my name / whatever I chose
  subtitle: "Each planet is a part of life. A green glow means something's actively happening.",
  sunLabel: "Alex",                    // the label on the sun
  areas: [                             // one entry per planet, 4–7 of them
    {
      label: "Body",                   // short planet name, 1–2 words
      color: "#5fd0c7",                // any hex color; give every planet a
                                       // distinct, bright color (they sit on
                                       // a near-black background)
      goals: [
        { title: "Exercise at least 3x per week",  // specific & measurable
          status: "ongoing",           // "ongoing" | "someday" | "done"
          perWeek: 3,                  // OPTIONAL weekly habit: minimum/week
          perWeekMax: 7,               // OPTIONAL stretch ceiling (> perWeek)
          due: "2026-12-31",           // OPTIONAL deadline, YYYY-MM-DD
          note: "Gym Tue/Thu, run Sat",// OPTIONAL one short line of context
          subgoals: [                  // OPTIONAL milestone checklist
            { title: "First 5k run", due: "2026-09-01" },  // due is optional
          ],
        },
      ],
    },
  ],
};

RULES FOR THE FILE
- Valid JavaScript, double-quoted strings, no comments needed in the output.
- Only include optional fields that apply — omit them otherwise.
- perWeek only for genuine weekly habits (with perWeekMax ≥ perWeek if I gave
  a stretch number). due only for real deadlines. Milestones only where steps
  are naturally checkable.
- status "ongoing" only for things I'm truly doing now — that's what makes a
  planet glow, and the glow should mean something.

After the code block, tell me in one or two lines: save it as data.js in my
Life Solar System folder (replacing the existing file) and refresh
index.html — and that from then on I can edit everything in the page itself
with the ✎ buttons.
````
