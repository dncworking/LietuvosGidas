import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/authServices.js";
import styles from "../styles/Forms.module.css";
import { useState } from "react";

function Signup() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      const data = await signup(formData);
      if (data.status === "success" || data) {
        navigate("/login");
      }
    } catch (error) {
      setServerError(error.message || "Registration failed");
    }
  };

  return (
    <>
      <main className={styles.pageWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.header}>Sign Up</h2>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="First Name"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
            {errors.first_name && (
              <p className={styles.errorText}>{errors.first_name.message}</p>
            )}
          </div>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <select
              className={styles.select}
              {...register("role", { required: true })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
                },
              })}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className={styles.errorText} style={{ textAlign: "center" }}>
              {serverError}
            </p>
          )}

          <button className={styles.submitBtn} type="submit">
            Sign Up
          </button>
          <button
            type="button"
            className={styles.loginLink}
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </button>
        </form>
      </main>
    </>
  );
}

export default Signup;
