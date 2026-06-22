import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import AddPlace from "./pages/AddPlace.jsx";
import EditPlace from "./pages/EditPlace.jsx";

function AppContent() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("none");
  // Sąrašas puslapių, kuriuose Navbaro RODYTI NEGALIMA
  const hideNavbarRoutes = ["/login", "/signup"];

  // Tikriname, ar dabartinis kelias (path) yra šiame sąraše
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Paduodame filtrus ir jų keitimo funkcijas į Navbarą per props */}
      {!shouldHideNavbar && (
        <Navbar
          search={search}
          setSearch={setSearch}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />
      )}

      <Routes>
        {/* Į pagrindinį puslapį paduodame filtrų reikšmes, kad jis žinotų, kaip filtruoti */}
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceFilter={priceFilter}
              ratingFilter={ratingFilter}
            />
          }
        />
        <Route path="/places/new" element={<AddPlace />} />
        <Route path="/places/edit/:id" element={<EditPlace />} />
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
