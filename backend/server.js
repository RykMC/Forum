import dotenv from "dotenv";
dotenv.config();
console.log("💡 DATABASE_URL:", process.env.DATABASE_URL);
import express from "express";
import cors from "cors";
import forumController from "./forumController.js"; // default export = kompletter Router
import { startBotTicker } from "./botTicker.js";

const app = express();
app.use(cors());
app.use(express.json());

// Ganzen Controller mounten
app.use("/api/forum", forumController);

app.listen(3001, () => {
  console.log("Server läuft auf Port 3001");
});
 //startBotTicker()