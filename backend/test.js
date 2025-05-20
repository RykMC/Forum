import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => {
    console.log("✅ Verbindung zur Datenbank erfolgreich!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Verbindung fehlgeschlagen:", err);
    process.exit(1);
  });
