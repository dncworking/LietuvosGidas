import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createPlace } from "../services/placeServices.js";
import { toast } from "react-toastify";
import styles from "../styles/Forms.module.css";
import { useState } from "react";

function AddPlace() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      is_free: true, // Pagal nutylėjimą vieta pažymėta kaip nemokama
      rating: 5,
    },
  });

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      // Svarbu: kadangi formos inputai visada grąžina tekstą,
      // skaičių laukus privalome paversti į tikrus skaičius prieš siunčiant į SQL DB.
      const formattedData = {
        ...formData,
        rating: Number(formData.rating),
        city_id: Number(formData.city_id),
      };

      await createPlace(formattedData);
      toast.success("Nauja vietovė sėkmingai pridėta!");
      navigate("/"); // Sėkmės atveju grįžtam į pagrindinį puslapį
    } catch (error) {
      setServerError(error.message || "Nepavyko išsaugoti vietovės.");
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.header}>Pridėti Naują Vietą</h2>

        {/* Pavadinimas */}
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

        {/* Tipas */}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Tipas (pvz., Muziejus, Parkas, Apžvalgos aikštelė)"
            {...register("type", { required: "Tipas yra būtinas" })}
          />
          {errors.type && (
            <p className={styles.errorText}>{errors.type.message}</p>
          )}
        </div>

        {/* Adresas */}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Adresas"
            {...register("address")}
          />
        </div>

        {/* Nuotraukos URL */}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nuotraukos URL (image_url)"
            {...register("image_url")}
          />
        </div>

        {/* Reitingas */}
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

        {/* Miesto ID */}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            placeholder="Miesto ID (city_id iš DB lentelės)"
            {...register("city_id", { required: "Miesto ID yra būtinas" })}
          />
          {errors.city_id && (
            <p className={styles.errorText}>{errors.city_id.message}</p>
          )}
        </div>

        {/* Aprašymas */}
        <div className={styles.inputGroup}>
          <textarea
            className={styles.input}
            placeholder="Trumpas vietovės aprašymas..."
            rows="3"
            style={{ resize: "vertical", padding: "0.75rem" }}
            {...register("description")}
          />
        </div>

        {/* Nemokama / Mokama Checkbox */}
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
          Išsaugoti Vietovę
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

export default AddPlace;
