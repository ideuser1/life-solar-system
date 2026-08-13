# Life Solar System

A personal dashboard where your life is a solar system: you're the sun, and each
part of your life is a planet orbiting you. A planet **glows green** when
something in that area is actively happening. Click a planet to see its goals,
tick off weekly habits, and check milestones. No accounts, no servers, no app —
one HTML file and one data file, running right on your computer.

## Quick start

1. Get the files: on this page, click the green **Code** button → **Download
   ZIP**, then unzip it anywhere. (Coders: `git clone` works too.)
2. Open `index.html` in any browser. You'll see a starter solar system.
3. Make it yours — pick ONE of these:
   - **Easiest — let an AI set it up:** open [START-PROMPT.md](START-PROMPT.md),
     paste the prompt into an AI chat (Claude, ChatGPT, …), answer its
     questions, and save the file it gives you as `data.js` (replacing the one
     here). Refresh the page.
   - **In the page:** use the **✎ Edit planets** button and each planet's
     **✎ Edit goals** button to add, remove, rename, and recolor everything.
   - **By hand:** edit `data.js` in any text editor — it's full of comments
     showing you how.

   Heads-up: the page saves ✎-button edits in your browser, and from then on
   that saved copy wins — later changes to `data.js` won't show up. So do your
   initial setup via the prompt or `data.js`, then live in the ✎ editors.

## Features

- **Goals per planet** with three statuses: `ongoing` (planet glows), `someday`,
  and `done` (kept as history).
- **Weekly habits** (`perWeek`): clickable tick circles that reset every Monday,
  with optional dashed **bonus** circles (`perWeekMax`) for overachieving weeks.
- **Milestones** (`subgoals`): checklists like "$500 saved" — checking one
  automatically marks the goal active.
- **Timeline view**: every goal with a `due` date, in order, with overdue flags.
- **Progress view**: history of completed goals, reached milestones, and an
  8-week habit grid — click any goal row to fix past weeks you forgot to log.
- **Calendar export**: the Timeline's ⬇ button downloads your deadlines as a
  `.ics` file for Google/Apple/Outlook Calendar.
- **Friends**: swap **friend codes** with other Life Solar System owners and
  see each other's systems in the Friends view — see below.

## Friends

The Friends view lets solar systems wave at each other without giving up
privacy:

- Click **Start sharing** to get a random friend code (like `sun-abc23-def45`).
  Give it to friends; enter theirs. You'll see each other's planets and which
  ones are glowing.
- By default friends see **only** planet names, colors, and glow — no goals.
  Tick "Also share goal titles" to share those too, and untick any planet or
  goal to keep it fully private. "Done" goals are never shared.
- Codes are read-only: a friend can look, never touch.
- How it works: your dashboard publishes just the summary you chose to a small
  public "hub" site under your code. Nothing else ever leaves your dashboard,
  and **Stop sharing** deletes your summary from the hub.
- Sharing and adding friends works even if you only use the local file — you
  just need to be online for the Friends view to update.

## Your data is yours

Everything lives in this folder and in your own browser. Nothing is uploaded
anywhere — there is no server, no account, no tracking. (The one exception is
opt-in: the Friends feature, which publishes only the summary you choose, only
after you click Start sharing.) The dashboard is **one per person**: it's your
private solar system. If a friend
wants one too, send them a fresh copy of the template (not your filled-in
folder — that contains your goals).

## Put it online (optional)

Hosting your dashboard on the web gets you: access from your phone, tick/goal
sync across devices, and a calendar feed your calendar app can subscribe to.
Each person hosts their **own** copy under their own secret link.

Any static host works, but the included files are set up for **Cloudflare
Pages** (free):

1. Create a free Cloudflare account and install their `wrangler` command-line
   tool (`npm install -g wrangler`, then `wrangler login`).
2. Create your own little cloud database for sync:
   `wrangler kv namespace create SOLAR_STATE` — paste the `id` it prints into
   `wrangler.toml` (there's a placeholder marking the spot).
3. Pick a project name in `wrangler.toml`. **Include a random suffix** (e.g.
   `orbit-x7k2q9`) — your site's address is its only protection, and a
   hard-to-guess name keeps it private.
4. Deploy from this folder:
   `wrangler pages deploy . --project-name YOUR-PROJECT-NAME --branch main`

Notes:
- **Anyone who has your link can see and change your system.** Treat the URL
  like a password. The included `_headers` file asks search engines not to
  index it.
- Calendar subscription: put your site address in the `SITE_URL` line at the
  top of `make-calendar.js`, run `node make-calendar.js`, and redeploy. Then in
  Google Calendar: Settings → Add calendar → From URL →
  `https://YOUR-SITE/life-goals.ics`. Re-run + redeploy whenever due dates
  change.

### AI suggestions button (optional, hosted only)

The **✨ Get Ideas** button asks Claude (an AI) for goal suggestions tailored
to your system. It only works on a hosted copy, and needs your own Anthropic
API key: in the Cloudflare dashboard, open your Pages project → Settings →
Variables and Secrets, add a secret named `ANTHROPIC_API_KEY`, and redeploy.
API usage costs a small amount per question; the endpoint is limited to 20
questions per hour. Until the key is set, the button simply explains it's not
configured.

## Good to know

- Tick and checkbox clicks are saved in your browser (localStorage). On the
  local version they don't sync between devices; on a hosted copy they do.
- Renaming a planet or goal with the ✎ buttons keeps your saved clicks.
  Renaming by editing `data.js` by hand orphans them (they're keyed by name).
