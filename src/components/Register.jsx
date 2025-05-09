import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  //   console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users", formData);
      alert("sucessfully registered, you will redirected to login");
      navigate("/login");
    } catch (error) {
      console.log(error);
      //   alert(error.response.data.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>SignUp</h2>
      <p>Email:</p>
      <input
        className="bg-gray-400"
        type="text"
        placeholder="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <p>Passwort:</p>
      <input
        className="bg-gray-400"
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <p>
        <button type="submit">REGISTER</button>
      </p>
    </form>
  );
}

export default Register;
