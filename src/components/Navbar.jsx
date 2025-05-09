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
<nav className="bg-gray-900 text-white p-4 shadow-lg flex justify-between items-center">
  <div className="text-2xl font-bold tracking-wide hover:text-indigo-400 transition duration-300">
    <NavLink to="/">Event Scheduler</NavLink>
  </div>

  <div className="flex space-x-4 items-center">
    {isAuthenticated ? (
      <div className="flex space-x-4 items-center">
        <NavLink
          to="/profile"
          className="relative px-4 py-2 rounded hover:text-indigo-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-400 hover:before:w-full before:transition-all before:duration-300"
        >
          Profile
        </NavLink>
        <NavLink
          to="/createEvent"
          className="relative px-4 py-2 rounded hover:text-green-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-green-400 hover:before:w-full before:transition-all before:duration-300"
        >
          Create Event
        </NavLink>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl shadow hover:scale-105 transition-all duration-300"
        >
          LOGOUT
        </button>
      </div>
    ) : (
      <div className="flex space-x-4 items-center">
        <NavLink
          to="/login"
          className="relative px-4 py-2 rounded hover:text-indigo-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-400 hover:before:w-full before:transition-all before:duration-300"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="relative px-4 py-2 rounded hover:text-indigo-400 transition duration-300 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-indigo-400 hover:before:w-full before:transition-all before:duration-300"
        >
          Register
        </NavLink>
      </div>
    )}
  </div>
</nav>
  );
}

export default Navbar;
