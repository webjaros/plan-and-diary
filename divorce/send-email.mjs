import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { config } from "dotenv";
import { Resend } from "resend";

config({ path: resolve(import.meta.dirname, "../.env") });

const TEST_TO = "webjaros@gmail.com";
const FROM = "Jaroslavs Kuprijanovs <j.kuprijanovs@weblab.lv>";
const LOG_PATH = resolve(import.meta.dirname, "sent-emails.json");

const TEMPLATES = {
  "first-email": {
    subject: "Attālināta laulības šķiršana",
    text: [
  "Labdien!",
  "",
  "Vai Jūs šķirat laulības attālināti? Abi esam Latvijas pilsoņi, dzīvojam Taizemē, ir nepilngadīgs bērns.",
  "",
  "* vīrs: Jaroslavs Kuprijanovs, 12.03.1983., 120383-10265",
  "* sieva: Arina Kuprijanova (Suslova), 23.02.1985., 230285-10646",
  "* laulība: 15.06.2012., Rīgas Ziemeļu Dzimtsarakstu nodaļa, ieraksts 568, LV AB 0374350",
  "* bērns: Elizabete Kuprijanova, 05.12.2015., 051215-25245, LVDA100813",
  "",
  "Ja jā — atbildiet, lūdzu, un detaļas pārrunāsim tālāk.",
  "",
  "Paldies!",
  "Jaroslavs Kuprijanovs",
    ].join("\n"),
  },
};

const parseArgs = (argv) => {
  const args = { test: false, to: null, name: null, subject: null, text: null, template: "first-email" };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--test") args.test = true;
    if (arg === "--to") {
      args.to = next;
      i += 1;
    }
    if (arg === "--name") {
      args.name = next;
      i += 1;
    }
    if (arg === "--subject") {
      args.subject = next;
      i += 1;
    }
    if (arg === "--text") {
      args.text = next;
      i += 1;
    }
    if (arg === "--template") {
      args.template = next;
      i += 1;
    }
  }
  return args;
};

const loadLog = () => {
  if (!existsSync(LOG_PATH)) return [];
  return JSON.parse(readFileSync(LOG_PATH, "utf8"));
};

const appendLog = (entry) => {
  const log = loadLog();
  log.push(entry);
  writeFileSync(LOG_PATH, `${JSON.stringify(log, null, 2)}\n`);
};

const toHtml = (text) =>
  text
    .split("\n")
    .map((line) => (line === "" ? "<br>" : `<p>${line}</p>`))
    .join("");

const sendEmail = async () => {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) throw new Error("RESEND_API_KEY is missing in .env");
  if (!args.test && !args.to) {
    throw new Error("Pass --test or --to email@example.com");
  }

  const template = TEMPLATES[args.template];
  if (!template) {
    throw new Error(`Unknown template: ${args.template}`);
  }

  const to = args.test ? TEST_TO : args.to;
  const subject = args.test
    ? `[TEST] ${args.subject ?? template.subject}`
    : (args.subject ?? template.subject);
  const text = args.text ?? template.text;
  const sentAt = new Date().toISOString();

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [to],
    subject,
    text,
    html: toHtml(text),
  });

  const entry = {
    sentAt,
    to,
    name: args.name ?? null,
    template: args.template,
    subject,
    text,
    from: FROM,
    test: args.test,
    resendId: data?.id ?? null,
    error: error ? error.message ?? JSON.stringify(error) : null,
  };

  appendLog(entry);

  if (error) {
    console.error(JSON.stringify(entry, null, 2));
    throw new Error(entry.error);
  }

  console.log(JSON.stringify(entry, null, 2));
};

sendEmail().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
