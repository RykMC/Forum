import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./db.js";
import { authenticateToken } from "./authMiddleware.js";


const router = express.Router();

// Registrierung
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Alle Felder ausfüllen." });
  }

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE name = $1 OR email = $2",
      [username, email]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Benutzername oder E-Mail existiert bereits." });
    }

    const hashed = await bcrypt.hash(password, 10);
    const jetzt = Math.floor(Date.now() / 1000);

    await db.query(
      "INSERT INTO users (name, email, password, create_date) VALUES ($1, $2, $3, $4)",
      [username, email, hashed, jetzt]
    );

    res.status(201).json({ message: "Erfolgreich registriert!" });
  } catch (err) {
    console.error("❌ Fehler bei Registrierung:", err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE name = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Benutzer nicht gefunden" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Falsches Passwort" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    console.error("❌ Fehler beim Login:", err);
    res.status(500).json({ message: "Serverfehler" });
  }
});

// Themen abrufen
router.get("/topics/", async (req, res) => {
  const { kategorie } = req.query;
  console.log(kategorie);
  try {
    let query = `
      SELECT t.id, t.titel, t.datum, t.kategorie, t.inhalt, u.name
      FROM forum_topics t
      LEFT JOIN users u ON t.userid = u.id
    `;
    const params = [];

    if (kategorie) {
      query += " WHERE t.kategorie = $1";
      params.push(kategorie);
    }

    query += " ORDER BY datum DESC";

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Fehler beim Laden der Topics:", err);
    res.status(500).json({ message: "Serverfehler beim Laden der Topics" });
  }
});


// Einzelnes Thema abrufen
router.get("/topic/:id", async (req, res) => {
  const topicId = req.params.id;

  try {
    const result = await db.query(`
      SELECT t.id, t.titel, t.datum, t.kategorie, t.inhalt, u.name, u.avatar
      FROM forum_topics t
      LEFT JOIN users u ON t.userid = u.id
      WHERE t.id = $1
    `, [topicId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Thema nicht gefunden" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Fehler beim Laden des Themas:", err);
    res.status(500).json({ message: "Serverfehler beim Laden des Themas" });
  }
});


// Beiträge zum Thema abrufen
router.get("/posts/:id", async (req, res) => {
  const topicId = req.params.id;

  try {
    const result = await db.query(`
      SELECT p.id, p.inhalt, p.datum, u.name, u.avatar
      FROM forum_posts p
      LEFT JOIN users u ON p.userid = u.id
      WHERE p.topicid = $1
      ORDER BY p.datum ASC
    `, [topicId]);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Fehler beim Laden der Beiträge:", err);
    res.status(500).json({ message: "Serverfehler beim Laden der Beiträge" });
  }
});


// Neues Thema erstellen

router.post("/topic", authenticateToken, async (req, res) => {
  const { titel, inhalt, kategorie } = req.body;
  const userId = req.user?.id;
  console.log("was fehlT?", titel, inhalt, kategorie);
  if (!titel || !inhalt || !kategorie) {
    return res.status(400).json({ message: "Fehlende Felder" });
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    // 1. Thema speichern
    const result = await db.query(
      `INSERT INTO forum_topics (titel, inhalt, kategorie, datum, userid)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [titel, inhalt, kategorie, timestamp, userId]
    );

    const topicId = result.rows[0].id;

//     // 2. GPT-Antwort über deine Proxy-API holen
//     const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: "gpt-4", // oder "gpt-4"
//         messages: [
//           { role: "system", content: "Du bist ein hilfreicher, freundlicher Foren-User. Bitte antworte auf folgendes Thema:" },
//           { role: "user", content: `${titel}\n\n${inhalt}` }
//         ]
//       })
//     });


//     const gptData = await gptRes.json();
//     const antwort = gptData.choices?.[0]?.message?.content || "Automatische Antwort konnte nicht geladen werden.";

//     // 3. Zufälligen Bot aus useres wählen
//     const bots = await db.query("SELECT id FROM users WHERE bot = true");
//     const botId = bots.rows[Math.floor(Math.random() * bots.rows.length)].id;

//     // 4. Antwort speichern
//     await db.query(
//       `INSERT INTO forum_posts (topicid, userid, inhalt, datum)
//        VALUES ($1, $2, $3, $4)`,
//       [topicId, botId, antwort, Math.floor(Date.now() / 1000)]
//     );

    res.status(201).json({ message: "Thema und Bot-Antwort erstellt", topicId });
  } catch (err) {
    console.error("❌ Fehler beim Erstellen des Themas oder Bot-Antwort:", err);
    res.status(500).json({ message: "Serverfehler beim Erstellen" });
  }
});

// Neue Antwort posten
router.post("/posts/:topicId", authenticateToken, async (req, res) => {
  const topicId = req.params.topicId;
  const { inhalt } = req.body;
  const userId = req.user?.id;

  if (!inhalt) {
    return res.status(400).json({ message: "Inhalt fehlt" });
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);

    await db.query(
      `INSERT INTO forum_posts (topicid, userid, inhalt, datum)
       VALUES ($1, $2, $3, $4)`,
      [topicId, userId, inhalt, timestamp]
    );

     res.status(201).json({ message: "Antwort gespeichert" });
  } catch (err) {
    console.error("❌ Fehler beim Speichern der Antwort:", err);
    res.status(500).json({ message: "Serverfehler beim Antworten" });
  }
});



// Profil Seite
// Profilinfos abrufen
router.get("/profil", authenticateToken, async (req, res) => {
  const userId = req.user?.id;
  console.log("👤 Angefragter User:", req.user); 
  try {
    const userRes = await db.query(`
      SELECT id, name, create_date, avatar 
      FROM users 
      WHERE id = $1
    `, [userId]);

    if (!userId) {
      return res.status(404).json({ message: "User nicht gefunden" });
    }

    const ThemenRes = await db.query(`
      SELECT COUNT(*) AS themen 
      FROM forum_topics 
      WHERE userid = $1
    `, [userId]);

    const BeiRes = await db.query(`
      SELECT COUNT(*) AS beitraege 
      FROM forum_posts 
      WHERE userid = $1
    `, [userId]);
    console.log(userRes.rows);
    const user = userRes.rows[0];
    const themen = ThemenRes.rows[0].themen;
    const beitraege = BeiRes.rows[0].beitraege;

    res.json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      beitritt: user.create_date,
      themen,
      beitraege
    });
  } catch (err) {
    console.error("❌ Fehler beim Laden des Profils:", err);
    res.status(500).json({ message: "Serverfehler beim Laden des Profils" });
  }
});

router.put("/avatar", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { avatar } = req.body;
  try {
    await db.query(`UPDATE users SET avatar = $1 WHERE id = $2`, [avatar, userId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Avatar konnte nicht gespeichert werden" });
  }
});






export default router;
