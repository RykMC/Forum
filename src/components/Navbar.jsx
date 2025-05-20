import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaUserCircle, FaPlus, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaComments, FaHome, FaTags, FaStar } from "react-icons/fa";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 shadow-md border-b-2 border-yellow-400">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Name */}
        <div className="flex items-center gap-3 text-yellow-300 font-bold text-xl tracking-wide">
          <FaComments className="text-yellow-400" />
          <NavLink to="/">Das (nicht mehr so) superschlaue React-Forum</NavLink>
        </div>

        {/* Navlinks */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <NavLink to="/" className="hover:text-yellow-400 flex items-center gap-2">
            <FaHome /> Startseite
          </NavLink>
          <NavLink to="/kategorien" className="hover:text-yellow-400 flex items-center gap-2">
            <FaTags /> Kategorien
          </NavLink>
          <NavLink to="/top" className="hover:text-yellow-400 flex items-center gap-2">
            <FaStar /> Top Beiträge
          </NavLink>
        </div>

        {/* Auth-Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="flex items-center gap-1 hover:text-yellow-300">
                <FaUserCircle /> Profil
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-400 hover:text-red-600 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="flex items-center gap-1 hover:text-yellow-300">
                <FaSignInAlt /> Login
              </NavLink>
              <NavLink to="/register" className="flex items-center gap-1 hover:text-yellow-300">
                <FaUserPlus /> Registrieren
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
