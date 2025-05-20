import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const KATEGORIEN = {
  1: "📢 Ankündigungen",
  2: "❓ Hilfe",
  3: "🐞 Bugs, Feedback & Kritik",
  4: "💡 Ideen & Anregungen"
};

export default function TopicDetails() {
  const { id } = useParams(); // = topicId
  const [topic, setTopic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const [antwort, setAntwort] = useState("");
  const [antwortError, setAntwortError] = useState("");


  
  const handleAntwortAbsenden = async () => {
    setAntwortError("");
    if (!antwort.trim()) {
      setAntwortError("Antwort darf nicht leer sein.");
      return;
    }

    try {
      await axios.post(`http://localhost:3001/api/forum/posts/${id}`, { inhalt: antwort }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setAntwort(""); // Textfeld leeren
      // Neu laden:
      const postsRes = await axios.get(`http://localhost:3001/api/forum/posts/${id}`);
      setPosts(postsRes.data);
    } catch (err) {
      console.error("❌ Antwort fehlgeschlagen:", err);
      setAntwortError("Fehler beim Absenden.");
    }
  };

  useEffect(() => {
    const loadTopicData = async () => {
      try {
        const [topicRes, postsRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/forum/topic/${id}`),
          axios.get(`http://localhost:3001/api/forum/posts/${id}`)
        ]);
        console.log(topicRes.data);
        setTopic(topicRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error(err);
        setError("Fehler beim Laden des Themas");
      } finally {
        setLoading(false);
      }
    };

    loadTopicData();
  }, [id]);

  const formatDate = (unix) =>
    new Date(unix * 1000).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white max-w-4xl mx-auto space-y-6 ">
      {error && <p className="text-red-500">{error}</p>}

      
      {loading || !topic ? (
        
        <p className="text-gray-400">Lade Thema...</p>
      ) : (
        <>
       <div className="space-y-6">
          {/* Hauptbeitrag */}
          <div className="bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-sm text-yellow-300 font-semibold mb-2">
              {topic.name || "Unbekannt"} schrieb am {formatDate(topic.datum)} Uhr
            </div>
            <div className="text-gray-200 whitespace-pre-line">{topic.inhalt}</div>
          </div>

          {/* Antworten */}
          {posts.length === 0 ? (
            <p className="text-gray-400 italic">Noch keine Antworten.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="bg-gray-800 rounded-lg p-4 shadow">
                  <div className="text-sm text-yellow-300 font-semibold mb-2">
                    {post.name || "Unbekannt"} schrieb am {formatDate(post.datum)} Uhr
                  </div>
                  <div className="text-gray-200 whitespace-pre-line">{post.inhalt}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        </>
      )}
      {isAuthenticated && (
        <div className="bg-gray-800 rounded p-4 shadow mt-10 space-y-2">
          <h3 className="text-yellow-300 font-bold text-lg">Antwort schreiben</h3>
          <textarea
            rows="4"
            className="w-full p-3 rounded bg-gray-700 text-white"
            placeholder="Deine Antwort..."
            value={antwort}
            onChange={(e) => setAntwort(e.target.value)}
          />
          <button
            onClick={handleAntwortAbsenden}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded shadow"
          >
            Absenden
          </button>
          {antwortError && <p className="text-red-400 text-sm mt-1">{antwortError}</p>}
        </div>
      )}

    </div>
  );
}
