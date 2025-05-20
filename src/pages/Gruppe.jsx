// Gruppe.jsx
import { useParams, Link } from "react-router-dom";

const KATEGORIEN = {
  "Grundlagen & Einstieg": {
    1: "🚀 Erste Schritte mit React",
    2: "📦 Komponenten & Props",
    3: "🔁 State & Events",
    4: "🔗 JSX & Grundlagen"
  },
  "Hooks & State-Management": {
    5: "🧠 useState & useEffect",
    6: "🔄 useReducer & Context API",
    7: "🛠️ Custom Hooks teilen",
    8: "📊 Zustand global verwalten"
  },
  "Komponenten & Struktur": {
    9: "🧱 Aufbau & Wiederverwendbarkeit",
    10: "🎨 Styled Components & CSS",
    11: "📁 Projektstruktur & Patterns"
  },
  "API & Datenhandling": {
    12: "🌐 API-Aufrufe mit Axios / Fetch",
    13: "⚡ React Query & SWR",
    14: "🔌 REST vs GraphQL",
    15: "❌ Fehlerbehandlung & Loading States"
  },
  "Styling & UI": {
    16: "🎨 Tailwind, Material UI & Co",
    17: "🌓 Theme-Switching & Darkmode",
    18: "💥 Framer Motion & Animation"
  },
  "Routing & Navigation": {
    19: "🧭 React Router v6",
    20: "📍 Nested Routing & Layouts",
    21: "🔁 Redirects & Dynamic Routes"
  },
  "Testing & Debugging": {
    22: "🧪 Unit Tests mit Jest",
    23: "🧹 React Testing Library",
    24: "🐞 Debugging Tipps"
  },
  "Build & Deployment": {
    25: "🚀 Vite vs CRA vs Next.js",
    26: "☁️ Deployment (Netlify, Vercel etc)",
    27: "📦 Code Splitting & Performance"
  },
  "Fortgeschrittenes & Patterns": {
    28: "🧬 Render Props & HOCs",
    29: "🎯 Controlled vs. Uncontrolled",
    30: "🌀 Zustand in URL syncen"
  }
};

export default function Gruppe() {
  const { name } = useParams();
  const unterkats = KATEGORIEN[name];

  if (!unterkats) {
    return <div className="p-6 text-red-500">Unbekannte Kategoriegruppe</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-300 border-b border-yellow-500 pb-2">
          {name}
        </h1>
        <ul className="gap-2">
          {Object.entries(unterkats).map(([id, name]) => (
            <li key={id}>
              <Link
                to={`/kategorie/${id}`}
                className="block bg-gray-800 hover:bg-gray-700 text-white rounded px-4 py-2 transition m-6"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
            <Link
                to={`/`}
                className="block bg-red-800 hover:bg-gray-700 text-white text-center rounded px-4 py-2 transition m-6 w-30"
              >
                Zurück
              </Link>
        </div>
      </div>
    </div>
  );
}
