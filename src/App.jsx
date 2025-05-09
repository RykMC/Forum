import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import NoAccess from "./pages/NoAccess";
import NotFound from "./pages/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./components/createEvent";
import EventDetails from "./components/EventDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="event/:id" element={<EventDetails />} />

          <Route
            path="createEvent"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="401" element={<NoAccess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* <h2 className="text-3xl font-bold red">Ich bin hier die App.jsx</h2> */}
      {/* <p className="red">Hallo TailwindTest</p> */}
    </>
  );
};

export default App;
