import { useEffect, useState, useContext } from "react"; // Sutvarkytas importas vienoje eilutėje
import { getPlaces, deletePlace } from "../services/placeServices.js";
import { toast } from "react-toastify";
import styles from "../styles/Home.module.css";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Home({ search, priceFilter, ratingFilter }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userRole } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlaces();
        console.log("Duomenys iš backend:", data);
        // Saugiai paimame masyvą iš data.data objekto
        setPlaces(data.data || data || []);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Ar tikrai norite ištrinti šią vietą?")) {
      try {
        await deletePlace(id);
        toast.success("Vietovė sėkmingai ištrinta!");
        setPlaces((prevPlaces) =>
          prevPlaces.filter((place) => place.id !== id),
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // --- FILTRAVIMO IR RŪŠIAVIMO LOGIKA FRONTE ---
  const filteredAndSortedPlaces = (Array.isArray(places) ? places : [])
    .filter((place) => place.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((place) => {
      if (priceFilter === "free") return place.is_free === true;
      if (priceFilter === "paid") return place.is_free === false;
      return true;
    })
    .sort((a, b) => {
      if (ratingFilter === "high-to-low")
        return (b.rating || 0) - (a.rating || 0);
      if (ratingFilter === "low-to-high")
        return (a.rating || 0) - (b.rating || 0);
      return 0;
    });

  if (loading) {
    return <div className={styles.center}>Užkraunama...</div>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Lankytinos Vietos Lietuvoje</h1>

      {filteredAndSortedPlaces.length === 0 ? (
        <p className={styles.noResults}>
          Nerasta vietų pagal pasirinktus filtrus.
        </p>
      ) : (
        <div className={styles.grid}>
          {filteredAndSortedPlaces.map((place) => (
            <div key={place.id} className={styles.card}>
              <img
                src={
                  place.image_url ||
                  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500"
                }
                alt={place.name}
                className={styles.cardImage}
              />
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{place.name}</h3>
                  <span className={styles.rating}>⭐ {place.rating || 0}</span>
                </div>
                <p className={styles.type}>{place.type}</p>
                <p className={styles.address}>
                  📍 {place.address || "Adresas nenurodytas"}
                </p>
                <p className={styles.description}>{place.description}</p>

                <div className={styles.cardFooter}>
                  {/* Ženkliukas dabar yra atskiras ir švarus */}
                  <span
                    className={`${styles.badge} ${place.is_free ? styles.free : styles.paid}`}
                  >
                    {place.is_free ? "Nemokama" : "Mokama"}
                  </span>

                  {/* Saugiklis: Mygtukai atvaizduojami TIK prisijungusiam ADMINUI */}
                  {isAuthenticated && userRole === "admin" && (
                    <div className={styles.adminActions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => navigate(`/places/edit/${place.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(place.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
