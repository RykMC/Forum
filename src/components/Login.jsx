import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );
      console.log(response);
      login(response.data.token);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
<form
  onSubmit={handleSubmit}
  className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto flex flex-col space-y-4 mt-10"
>
  <h2 className="text-2xl font-bold text-center text-white">Login</h2>
  
  <label className="text-gray-300">Email:</label>
  <input
    className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    type="text"
    placeholder="email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  />

  <label className="text-gray-300">Passwort:</label>
  <input
    className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    type="password"
    placeholder="password"
    value={formData.password}
    onChange={(e) =>
      setFormData({ ...formData, password: e.target.value })
    }
  />

  <button
    type="submit"
    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-all duration-300"
  >
    LOGIN
  </button>
</form>

    </>
  );
}

export default Login;
