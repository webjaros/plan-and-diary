import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const log = JSON.parse(readFileSync(resolve(import.meta.dirname, "sent-emails.json"), "utf8"));
const outPath = resolve(import.meta.dirname, "progress.html");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatWhen = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok",
  }).format(date);
};

const lastActivity = (entry) => {
  const times = [entry.sentAt, entry.reply?.receivedAt, entry.followUp?.sentAt, entry.followUpReply?.receivedAt, entry.purposeReply?.sentAt];
  return times.filter(Boolean).sort().at(-1) ?? entry.sentAt;
};

const describe = (entry) => {
  if (entry.purposeReply) return "Purpose reply sent. Waiting.";
  if (entry.followUpReply) return entry.followUpReply.summary;
  if (entry.followUp) return "Same-household follow-up sent. Waiting.";
  if (entry.reply?.status === "auto") return entry.reply.summary;
  if (entry.reply) return entry.reply.summary;
  return "First email sent. Waiting.";
};

const nextBall = (entry) => {
  const status = entry.reply?.status ?? "waiting";
  if (entry.purposeReply) return "them";
  if (entry.followUpReply && !entry.purposeReply) return "us";
  if (entry.followUp && !entry.followUpReply) return "them";
  if (status === "yes" && !entry.followUp) return "us";
  if (status === "no") return "done";
  return "them";
};

const people = log
  .filter((entry) => !entry.test)
  .map((entry) => {
    const resolved = entry.reply?.status === "yes" || entry.reply?.status === "no" ? entry.reply.status : "waiting";
    return {
      name: entry.name ?? entry.to,
      status: resolved,
      summary: describe(entry),
      when: lastActivity(entry),
      ball: nextBall(entry),
    };
  });

const sent = people.length;
const yes = people.filter((row) => row.status === "yes").length;
const no = people.filter((row) => row.status === "no").length;
const waiting = people.filter((row) => row.status === "waiting").length;
const replies = yes + no;
const builtAt = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Bangkok",
}).format(new Date());

const pct = (n) => (sent === 0 ? 0 : Math.round((n / sent) * 100));

const ballLabel = {
  us: "On us",
  them: "On them",
  done: "Closed",
};

const tableRows = people
  .sort((a, b) => {
    const order = { yes: 0, waiting: 1, no: 2 };
    return (order[a.status] ?? 9) - (order[b.status] ?? 9) || String(b.when).localeCompare(String(a.when));
  })
  .map(
    (row) => `<tr>
      <td>${escapeHtml(row.name)}</td>
      <td><span class="pill ${escapeHtml(row.status)}">${escapeHtml(row.status)}</span></td>
      <td><span class="pill ball-${escapeHtml(row.ball)}">${escapeHtml(ballLabel[row.ball])}</span></td>
      <td>${escapeHtml(row.summary)}</td>
      <td class="when">${escapeHtml(formatWhen(row.when))}</td>
    </tr>`,
  )
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Notary outreach</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f4ef;
      --card: #ffffff;
      --ink: #23201d;
      --muted: #6f665d;
      --line: #c9b9a6;
      --primary: #7f4f24;
      --yes: #2f6f4e;
      --yes-soft: #dceee4;
      --no: #8a3a2a;
      --no-soft: #f3ddd8;
      --wait: #8a5b14;
      --wait-soft: #f2e5c8;
      --shadow: 0 10px 30px rgb(38 28 17 / 10%);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
      line-height: 1.45;
    }
    main { max-width: 1080px; margin: 0 auto; padding: 40px 20px 64px; }
    h1 { margin: 0 0 8px; letter-spacing: -0.04em; font-size: clamp(1.8rem, 4vw, 2.6rem); }
    .subtitle { color: var(--muted); margin: 0 0 28px; }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .stat {
      background: var(--card);
      border-radius: 16px;
      padding: 18px 16px;
      box-shadow: var(--shadow);
    }
    .stat .n { font-size: 2rem; font-weight: 650; letter-spacing: -0.04em; }
    .stat .l { color: var(--muted); font-size: 0.9rem; }
    .bar {
      display: flex;
      height: 14px;
      border-radius: 999px;
      overflow: hidden;
      margin: 8px 0 28px;
      background: #ddd4c8;
    }
    .bar span { display: block; height: 100%; }
    .bar .yes { background: var(--yes); width: ${pct(yes)}%; }
    .bar .no { background: var(--no); width: ${pct(no)}%; }
    .bar .waiting { background: var(--wait); width: ${pct(waiting)}%; }
    table { width: 100%; border-collapse: collapse; background: var(--card); box-shadow: var(--shadow); border-radius: 16px; overflow: hidden; }
    th, td { text-align: left; padding: 12px 14px; vertical-align: top; }
    th { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); border-bottom: 1px solid var(--line); }
    td { border-bottom: 1px solid #eee6dc; }
    tr:last-child td { border-bottom: 0; }
    .pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 999px;
      font-size: 0.85rem;
    }
    .pill.yes { background: var(--yes-soft); color: var(--yes); }
    .pill.no { background: var(--no-soft); color: var(--no); }
    .pill.waiting { background: var(--wait-soft); color: var(--wait); }
    .pill.ball-us { background: #e7eef8; color: #29466b; }
    .pill.ball-them { background: #eeeae4; color: var(--muted); }
    .pill.ball-done { background: #eeeae4; color: var(--muted); }
    .when { white-space: nowrap; color: var(--muted); font-size: 0.9rem; }
    @media (max-width: 720px) {
      .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .when, th:last-child, td:last-child { display: none; }
    }
  </style>
</head>
<body>
  <main>
    <h1>Notary outreach</h1>
    <p class="subtitle">Remote divorce first emails. ${escapeHtml(builtAt)} Bangkok. Rebuild with <code>node build-progress.mjs</code>.</p>
    <div class="stats">
      <div class="stat"><div class="n">${sent}</div><div class="l">Sent</div></div>
      <div class="stat"><div class="n">${replies}</div><div class="l">Replies</div></div>
      <div class="stat"><div class="n">${yes}</div><div class="l">Yes</div></div>
      <div class="stat"><div class="n">${no}</div><div class="l">No</div></div>
    </div>
    <div class="bar" title="yes ${yes} · no ${no} · waiting ${waiting}">
      <span class="yes"></span><span class="no"></span><span class="waiting"></span>
    </div>
    <table>
      <thead>
        <tr><th>Notary</th><th>Status</th><th>Ball</th><th>Last note</th><th>When</th></tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  </main>
</body>
</html>
`;

writeFileSync(outPath, html);
console.log(`Wrote ${outPath} (${sent} sent, ${replies} replies, ${yes} yes, ${no} no, ${waiting} waiting)`);
