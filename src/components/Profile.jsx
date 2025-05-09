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
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>created at: {user.createdAt}</p>
    </div>
  );
}

export default Profile;
