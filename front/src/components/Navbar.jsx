import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import styles from "../styles/Navbar.module.css";

function Navbar({
  search,
  setSearch,
  priceFilter,
  setPriceFilter,
  ratingFilter,
  setRatingFilter,
}) {
  // Įrašome userRole prie išsitraukiamų kintamųjų
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      {/* 1. Pavadinimas / Logo */}
      <div className={styles.logo} onClick={() => navigate("/")}>
        LietuvosGidas
      </div>

      {/* 2. Filtravimo zona */}
      <div className={styles.filterContainer}>
        {/* Paieškos laukas */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Paieška..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Kainos filtras */}
        <select
          className={styles.filterSelect}
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">Visos paslaugos</option>
          <option value="free">Nemokama</option>
          <option value="paid">Mokama</option>
        </select>

        {/* Reitingo filtras */}
        <select
          className={styles.filterSelect}
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="none">Rūšiuoti pagal reitingą</option>
          <option value="high-to-low">Aukščiausias viršuje</option>
          <option value="low-to-high">Žemiausias viršuje</option>
        </select>

        {/* DINAMINIS MYGTUKAS ADMINUI: Atsiranda tik prisijungusiam administratoriui */}
        {isAuthenticated && userRole === "admin" && (
          <button
            className={styles.addPlaceBtn}
            onClick={() => navigate("/places/new")}
          >
            + Pridėti vietą
          </button>
        )}
      </div>

      {/* 3. Vartotojo zona (Dinaminiai mygtukai) */}
      <div className={styles.authZone}>
        {isAuthenticated ? (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Atsijungti
          </button>
        ) : (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Prisijungti
            </button>
            <button
              className={styles.signupBtn}
              onClick={() => navigate("/signup")}
            >
              Registracija
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
