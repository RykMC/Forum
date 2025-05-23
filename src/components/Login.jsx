import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/forum/login",
        formData
      );
      login(response.data.token); // Token speichern
       
      navigate("/");
    } catch (error) {
      console.error("❌ Login-Fehler:", error.response?.data?.message || error.message);
      setErrorMsg(error.response?.data?.message || "Login fehlgeschlagen");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-white">🔐 Forum Login</h2>

      <div>
        <label className="text-gray-300 block mb-1">Benutzername:</label>
        <input
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>

      <div>
        <label className="text-gray-300 block mb-1">Passwort:</label>
        <input
          className="w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-all duration-300"
      >
        LOGIN
      </button>

      {errorMsg && (
        <p className="text-center text-red-400 text-sm mt-2">{errorMsg}</p>
      )}
    </form>
    </div>
  );
}

export default Login;
