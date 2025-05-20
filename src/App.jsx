import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import NoAccess from "./pages/NoAccess";
import NotFound from "./pages/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Kategorie from "./pages/Kategorie";
import TopicDetails from "./pages/TopicDetails";
import NeuesThema from "./pages/NeuesThema";
import Gruppe from "./pages/Gruppe";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />


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
          <Route
            path="/neues-thema/:id"
            element={
              <ProtectedRoute>
                <NeuesThema />
              </ProtectedRoute>
            }
          />
          <Route path="/gruppe/:name" element={<Gruppe />} />
          <Route path="/kategorie/:id" element={<Kategorie />} />
          <Route path="topics/:id" element={<TopicDetails />} />
          <Route path="kategorie/:id" element={<Kategorie />} />
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
