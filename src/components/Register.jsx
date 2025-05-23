import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://localhost:3001/api/forum/register", formData);
      setMessage("✅ Registrierung erfolgreich! Weiterleitung...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("❌ Fehler bei Registrierung:", err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || "Unbekannter Fehler");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-white">📝 Forum Registrierung</h2>

      <div>
        <label className="text-gray-300 block mb-1">Benutzername:</label>
        <input
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </div>

      <div>
        <label className="text-gray-300 block mb-1">E-Mail:</label>
        <input
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="text-gray-300 block mb-1">Passwort:</label>
        <input
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-all duration-300"
      >
        REGISTER
      </button>

      {message && (
        <div className="text-center text-sm mt-2 text-yellow-400">
          {message}
        </div>
      )}
    </form>
    </div>
  );
}

export default Register;
