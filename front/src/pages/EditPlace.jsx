import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaceById, updatePlace } from "../services/placeServices.js";
import { toast } from "react-toastify";
import styles from "../styles/Forms.module.css";

function EditPlace() {
  const { id } = useParams(); // Pasiimame vietos ID iš naršyklės adreso juostos
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // 1. Užkrauname esamus vietos duomenis iškart atidarius puslapį
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await getPlaceById(id);
        // Atsižvelgiam į tavo backend struktūrą (gali būti response.data arba tiesiog response)
        const place = response.data || response;

        if (place) {
          // Užpildome formos laukus esamomis reikšmėmis
          setValue("name", place.name);
          setValue("type", place.type);
          setValue("address", place.address || "");
          setValue("image_url", place.image_url || "");
          setValue("rating", place.rating || 5);
          setValue("city_id", place.city_id || "");
          setValue("description", place.description || "");
          setValue("is_free", place.is_free ?? true);
        }
      } catch (error) {
        toast.error("Nepavyko užkrauti vietovės duomenų.", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [id, setValue, navigate]);

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      const formattedData = {
        ...formData,
        rating: Number(formData.rating),
        city_id: Number(formData.city_id),
      };

      await updatePlace(id, formattedData);
      toast.success("Vietovė sėkmingai atnaujinta!");
      navigate("/");
    } catch (error) {
      setServerError(error.message || "Nepavyko atnaujinti vietovės.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Kraunami vietovės duomenys...
      </div>
    );
  }

  return (
    <main className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Redaguoti Vietą</h2>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Vietovės pavadinimas"
            {...register("name", { required: "Pavadinimas yra būtinas" })}
          />
          {errors.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Tipas"
            {...register("type", { required: "Tipas yra būtinas" })}
          />
          {errors.type && (
            <p className={styles.errorText}>{errors.type.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Adresas"
            {...register("address")}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nuotraukos URL"
            {...register("image_url")}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            min="1"
            max="5"
            placeholder="Reitingas (1-5)"
            {...register("rating")}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            placeholder="Miesto ID"
            {...register("city_id", { required: "Miesto ID yra būtinas" })}
          />
          {errors.city_id && (
            <p className={styles.errorText}>{errors.city_id.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <textarea
            className={styles.input}
            placeholder="Aprašymas..."
            rows="3"
            style={{ resize: "vertical", padding: "0.75rem" }}
            {...register("description")}
          />
        </div>

        <div
          className={styles.inputGroup}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
            paddingLeft: "0.5rem",
          }}
        >
          <input
            type="checkbox"
            id="is_free"
            {...register("is_free")}
            style={{ width: "auto", cursor: "pointer" }}
          />
          <label
            htmlFor="is_free"
            style={{ color: "#2c3e35", fontWeight: "600", cursor: "pointer" }}
          >
            Ši vieta yra nemokama
          </label>
        </div>

        {serverError && (
          <p className={styles.errorText} style={{ textAlign: "center" }}>
            {serverError}
          </p>
        )}

        <button className={styles.submitBtn} type="submit">
          Išsaugoti pakeitimus
        </button>

        <button
          type="button"
          className={styles.loginLink}
          onClick={() => navigate("/")}
          style={{ marginTop: "0.5rem" }}
        >
          Atšaukti
        </button>
      </form>
    </main>
  );
}

export default EditPlace;
