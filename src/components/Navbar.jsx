import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div>
        <NavLink to="/">Event Scheduler</NavLink>
      </div>

      <div>
        {isAuthenticated ? (
          <div>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/createEvent">Create Event</NavLink>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>
        ) : (
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
