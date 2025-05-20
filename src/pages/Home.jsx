// Home.jsx
import { Link } from "react-router-dom";

const KATEGORIEN = {
  "Grundlagen & Einstieg": {},
  "Hooks & State-Management": {},
  "Komponenten & Struktur": {},
  "API & Datenhandling": {},
  "Styling & UI": {},
  "Routing & Navigation": {},
  "Testing & Debugging": {},
  "Build & Deployment": {},
  "Fortgeschrittenes & Patterns": {}
};

export default function Home() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-yellow-300 border-b border-yellow-500 pb-2">
          🗂️ Forum – Kategorien
        </h1>

        <ul className="gap-4">
          {Object.keys(KATEGORIEN).map((gruppe) => (
            <li key={gruppe}>
              <Link
                to={`/gruppe/${gruppe}`}
                className="block bg-gray-800 hover:bg-gray-700 text-white rounded px-6 py-4 m-6 text-lg font-semibold transition"
              >
                {gruppe}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
