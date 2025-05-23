import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function NeuesThema() {
  const { id } = useParams(); // Kategorie-ID aus URL (als string)
  const kategorieId = parseInt(id); // 🔧 als Zahl speichern
  const navigate = useNavigate();
  const [form, setForm] = useState({ titel: "", inhalt: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.titel.trim() || !form.inhalt.trim()) {
      setError("Titel und Inhalt dürfen nicht leer sein.");
      return;
    }

    try {
      const payload = {
        titel: form.titel.trim(),
        inhalt: form.inhalt.trim(),
        kategorie: kategorieId
      };

      await axios.post("http://localhost:3001/api/forum/topic", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log("✅ Navigiere zurück zur Kategorie...", kategorieId);
      navigate(`/kategorie/${kategorieId}`); // ✅ funktioniert jetzt
    } catch (err) {
      console.error("❌ Fehler beim Erstellen des Themas:", err);
      setError("Fehler beim Erstellen des Themas. Bitte versuche es erneut.");
    }
    
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow mt-10 min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">📝 Neues Thema erstellen</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titel"
          className="w-full p-3 rounded bg-gray-700 text-white"
          value={form.titel}
          onChange={(e) => setForm({ ...form, titel: e.target.value })}
        />

        <textarea
          placeholder="Inhalt"
          rows="6"
          className="w-full p-3 rounded bg-gray-700 text-white"
          value={form.inhalt}
          onChange={(e) => setForm({ ...form, inhalt: e.target.value })}
        />

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded shadow"
        >
          Thema erstellen
        </button>

        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </div>
    </div>
  );
}
