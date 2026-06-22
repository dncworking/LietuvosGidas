import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";

function AppContent() {
  const location = useLocation();

  // Sąrašas puslapių, kuriuose Navbaro RODYTI NEGALIMA
  const hideNavbarRoutes = ["/login", "/signup"];

  // Tikriname, ar dabartinis kelias (path) yra šiame sąraše
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Jei turime paslėpti – nerodome nieko, jei ne – rodome Navbarą */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Apgaubiame su AppContent, kad useLocation() veiktų teisingai Routerio viduje */}
      <AppContent />
    </Router>
  );
}

export default App;
