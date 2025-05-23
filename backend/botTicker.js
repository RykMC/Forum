// botTicker.js
import fetch from 'node-fetch';
import db from './db.js';

const bots = [
  "Rico", "Bernd", "Tom", "Fritz", "Klaus", "Marie", "Lisa", "Gabi", "Chantal"
];

const rollenMap = {
   Rico: `Du bist ein ultra hilfsbereiter Bot mit Herz. Du schreibst freundlich, ausführlich und motivierend. Du gibst Neulingen das Gefühl, willkommen zu sein, und erklärst Dinge geduldig. Du verwendest oft positive Floskeln wie "Mega Idee!", "Das ist super, dass du fragst!" oder "Kein Problem, ich helf dir gerne!"`,
   Bernd: `Du bist ein richtiger Forum-Hengst. Toxisch, passiv-aggressiv, sarkastisch und genervt. Du antwortest nie direkt auf die Frage, sondern mäkelst rum. Du sagst Dinge wie: "Hättste mal gegoogelt...", "Was soll denn der Müll?", "Lern erstmal die Basics, bevor du hier schreibst." Dein Ton ist kurz angebunden, überheblich und ständig leicht beleidigt.`,
   Tom: `Du bist ein bisschen lost, aber sehr engagiert. Du verstehst vieles falsch, gibst aber trotzdem deinen Senf dazu. Du schreibst sowas wie: "Also ich glaub, das geht mit useProp?", oder "Hab mal was Ähnliches gesehen, aber war bei mir anders... glaub ich." Du bist der klassische Foren-Mitredner, der nie so richtig weiß, wovon er redet.`,
   Fritz: `Du bist hilfsbereit, logisch, strukturiert und schreibst in jedem Satz "Diesdas". Du erklärst gerne in Steps, auch wenn niemand danach fragt. Du sagst sowas wie: "Also erstmal diesdas vorbereiten, dann jenes machen und diesdas beachten." Du bleibst freundlich, aber bist ein bisschen nerdig in deinem Stil.`,
   Klaus: `Du bist ein altgedienter Experte, der sich für den König des Forums hält. Du schreibst sehr technisch, nutzt viele Fachbegriffe, hast aber keinen Bock auf Anfängerfragen. Du sagst sowas wie: "In deiner Stelle würde ich ein debounce-Hook implementieren, bevor du mit der Performance-Kritik anfängst." Du bleibst sachlich, aber oft herablassend.`,
   Marie: `Du bist einfühlsam, verständnisvoll und ermutigend. Du versuchst, jedem ein gutes Gefühl zu geben, egal wie schlecht die Frage ist. Du schreibst Dinge wie: "Ich weiß, das kann am Anfang ganz schön viel sein 😊", oder "Mach dir keinen Stress, das haben wir alle mal nicht gewusst 💛". Deine Antworten wirken wie eine virtuelle Umarmung.`,
   Lisa: `Du bist eine Anfängerin, die versucht, anderen zu helfen, obwohl du selbst noch lernst. Du gibst Tipps, die oft nicht 100% korrekt sind, aber gut gemeint. Du schreibst sowas wie: "Ich bin mir nicht sicher, aber bei mir hat das so funktioniert 🤔", oder "Sorry wenn das falsch ist 😅". Du bist höflich, vorsichtig und lernwillig.`,
   Gabi: `Du bist nüchtern, sachlich und analysierst alles sehr genau. Du machst keine Scherze, sondern strukturierst deine Antworten mit Bullet Points oder "1. 2. 3.". Du schreibst wie ein Handbuch. Beispiel: "Das Problem liegt höchstwahrscheinlich an einer fehlerhaften Referenz. Prüfe bitte: 1. Komponentenstruktur, 2. Lifecycle, 3. API-Call."`,
    Chantal: `Du bist frech, rotzig und immer leicht genervt. Du sagst, was du denkst – ungeschönt. Du hast keine Zeit für Erklärbär, aber du haust raus. Du sagst Dinge wie: "Omg echt jetzt?", "Mach halt useEffect rein und gut ist 🙄", oder "Willst du programmieren oder basteln?". Dabei bist du manchmal überraschend präzise aber absolut unhöflich und herablassend`
};

const kategorieMap = {
  1: "🚀 Erste Schritte mit React",
  2: "📦 Komponenten & Props",
  3: "🔁 State & Events",
  4: "🔗 JSX & Grundlagen",
  5: "🧠 useState & useEffect",
  6: "🔄 useReducer & Context API",
  7: "🛠️ Custom Hooks teilen",
  8: "📊 Zustand global verwalten",
  9: "🧱 Aufbau & Wiederverwendbarkeit",
  10: "🎨 Styled Components & CSS",
  11: "📁 Projektstruktur & Patterns",
  12: "🌐 API-Aufrufe mit Axios / Fetch",
  13: "⚡ React Query & SWR",
  14: "🔌 REST vs GraphQL",
  15: "❌ Fehlerbehandlung & Loading States",
  16: "🎨 Tailwind, Material UI & Co",
  17: "🌓 Theme-Switching & Darkmode",
  18: "💥 Framer Motion & Animation",
  19: "🧭 React Router v6",
  20: "📍 Nested Routing & Layouts",
  21: "🔁 Redirects & Dynamic Routes",
  22: "🧪 Unit Tests mit Jest",
  23: "🧹 React Testing Library",
  24: "🐞 Debugging Tipps",
  25: "🚀 Vite vs CRA vs Next.js",
  26: "☁️ Deployment (Netlify, Vercel etc)",
  27: "📦 Code Splitting & Performance",
  28: "🧬 Render Props & HOCs",
  29: "🎯 Controlled vs. Uncontrolled",
  30: "🌀 Zustand in URL syncen"
};

function getSystemPrompt(botName, kategorieName) {
  const stil = rollenMap[botName] || 'Du bist ein Foren-Bot.';
  return `${stil} Thema: ${kategorieName}`;
}

export function startBotTicker() {
  setInterval(async () => {
    if (Math.random() > 0.5) return; // 50% Chance, dass was passiert

    try {
      const aktion =  'thema';
      const botName = bots[Math.floor(Math.random() * bots.length)];

      // Bot-ID holen
      const result  = await db.query(`SELECT id FROM users WHERE name = $1`, [botName]);
      const bot = result.rows[0];
      if (!bot) return;
      if (!result) return;
      console.log("Ja ich bin dabei: ", bot);
      if (aktion === 'antwort') {
        const result = await db.query(`SELECT * FROM forum_topics ORDER BY RANDOM() LIMIT 1`);
        const topic = result.rows[0];
        if (!topic) return;
        console.log("Ich gebe eine Antwort");
        const kategorieName = kategorieMap[topic.kategorie] || 'Allgemein';
        const systemPrompt = getSystemPrompt(botName, kategorieName);

        const postRes = await db.query(
          `SELECT inhalt FROM forum_posts WHERE topicid = $1 ORDER BY datum DESC LIMIT 1`,
          [topic.id]
        );
        const lastPost = postRes.rows[0];

        const userContent = lastPost?.inhalt || `${topic.titel}\n\n${topic.inhalt}`;

        const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userContent }
            ]
          })
        });

        const gptData = await gptRes.json();
        const antwort = gptData.choices?.[0]?.message?.content || null;
        console.log("Antwort: ", antwort);
        if (!antwort) return;

        const now = Math.floor(Date.now() / 1000);
        await db.query(
          `INSERT INTO forum_posts (topicid, userid, inhalt, datum) VALUES ($1, $2, $3, $4)`,
          [topic.id, bot.id, antwort, now]
        );

        console.log(`🤖 ${botName} hat auf Thema #${topic.id} geantwortet.`);
      } else {
        // Neues Thema erstellen
        const kategorieIds = Object.keys(kategorieMap);
        const kategorieId = parseInt(kategorieIds[Math.floor(Math.random() * kategorieIds.length)]);
        const kategorieName = kategorieMap[kategorieId];
        const systemPrompt = getSystemPrompt(botName, kategorieName);
        console.log("Ich poste was neues");

        const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              { role: "system", content: `${systemPrompt} Schreibe ein neues Thema.` },
              { role: "user", content: `Bitte formuliere eine passende Forenfrage zum Thema ${kategorieName}\n\nAntwortformat:\n[Titel der Frage]\n\n[Ausformulierter Beitragstext]`}
            ]
          })
        });
        
        const gptData = await gptRes.json();
        const raw = gptData.choices?.[0]?.message?.content || '';
        const [rawTitle, ...inhaltArray] = raw.split("\n\n");

        const titel = rawTitle
          .replace("[Titel der Frage]", "")
          .replace(/[[]]/g, "") 
          .trim();

        const inhalt = inhaltArray.join("\n\n")
          .replace("[Ausformulierter Beitragstext]", "")
          .replace(/[[]]/g, "")
          .trim();
        console.log (titel, inhalt, kategorieId, bot.id);
        if (!titel || !inhalt) return;
        
        const now = Math.floor(Date.now() / 1000);
        await db.query(
          `INSERT INTO forum_topics (titel, inhalt, kategorie, datum, userid) VALUES ($1, $2, $3, $4, $5)`,
          [titel.trim(), inhalt, kategorieId, now, bot.id]
        );

        console.log(`📝 ${botName} hat ein neues Thema erstellt (${kategorieName}).`);
      }
    } catch (err) {
      console.error("❌ Bot-Ticker-Fehler:", err);
    }
  }, 10_000);
}
