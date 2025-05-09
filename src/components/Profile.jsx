import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  // const { logout } = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/auth/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);
  if (!user) return <p>He bist du hier richtig?</p>;
  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Welcome, {user.email}</h2>
      <p className="text-gray-400">
        Bitte poste ein Ereignis. Mehr kannst du hier nicht tun.
      </p>
    </div>
  );
}

export default Profile;
