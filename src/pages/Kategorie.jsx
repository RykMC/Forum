import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const KATEGORIEN = {
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

const KATEGORIE_ZU_GRUPPE = {
  1: "Grundlagen & Einstieg",
  2: "Grundlagen & Einstieg",
  3: "Grundlagen & Einstieg",
  4: "Grundlagen & Einstieg",
  5: "Hooks & State-Management",
  6: "Hooks & State-Management",
  7: "Hooks & State-Management",
  8: "Hooks & State-Management",
  9: "Komponenten & Struktur",
  10: "Komponenten & Struktur",
  11: "Komponenten & Struktur",
  12: "API & Datenhandling",
  13: "API & Datenhandling",
  14: "API & Datenhandling",
  15: "API & Datenhandling",
  16: "Styling & UI",
  17: "Styling & UI",
  18: "Styling & UI",
  19: "Routing & Navigation",
  20: "Routing & Navigation",
  21: "Routing & Navigation",
  22: "Testing & Debugging",
  23: "Testing & Debugging",
  24: "Testing & Debugging",
  25: "Build & Deployment",
  26: "Build & Deployment",
  27: "Build & Deployment",
  28: "Fortgeschrittenes & Patterns",
  29: "Fortgeschrittenes & Patterns",
  30: "Fortgeschrittenes & Patterns"
};


 function getGruppeByKategorieId(id) {
  return KATEGORIE_ZU_GRUPPE[parseInt(id)] || null;
}


export default function Kategorie() {
  const { id } = useParams();
  const kategorieId = parseInt(id);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();    
  const gruppe = getGruppeByKategorieId(kategorieId);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3001/api/forum/topics?kategorie=${id}`);
        setTopics(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setError("Fehler beim Laden der Themen");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [id]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-300 border-b border-yellow-500 pb-2">
          {KATEGORIEN[id] || "🗂️ Unbekannte Kategorie"}
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p className="text-gray-400">Lade Themen...</p>
        ) : topics.length === 0 ? (
          <p className="text-gray-500 italic">Noch keine Themen in dieser Kategorie.</p>
        ) : (
          <>
          <ul className="space-y-4">
            {topics.map((topic) => (
              <li key={topic.id} className="bg-gray-800 rounded p-4 hover:bg-gray-700 transition">
                <Link
                  to={`/topics/${topic.id}`}
                  className="text-yellow-300 text-lg font-semibold hover:underline"
                >
                  {topic.titel}
                </Link>
                <div className="text-sm text-gray-400">
                  von <span className="text-white">{topic.name}</span> am{" "}
                  {new Date(topic.datum * 1000).toLocaleDateString("de-DE")}
                </div>
              </li>
            ))}
          </ul>
        {gruppe && (
          <Link
              to={`/gruppe/${gruppe}`}
              className="block bg-red-800 hover:bg-gray-700 text-white text-center rounded px-4 py-2 transition m-6 w-30"
            >
              Zurück
            </Link>
         
        )}

           
        
          </>
        )}
        {isAuthenticated && (
        <div className="text-right mb-4">
          <Link
            to={`/neues-thema/${id}`}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-lg shadow"
          >
            ➕ Neues Thema erstellen
          </Link>
        </div>
      )}
      </div>
      
    </div>
  );
}
