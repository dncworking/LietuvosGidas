import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices.js";
import styles from "../styles/Forms.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { loginStateUpdate } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setServerError("");
    try {
      const data = await login(formData);
      console.log("Login atsakymas:", data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        const role =
          data.data?.user?.role || data.user?.role || data.role || "user";

        loginStateUpdate(role);
        navigate("/");
      }
    } catch (error) {
      setServerError(
        error.message || "Login failed. Please check your details.",
      );
    }
  };

  return (
    <>
      <main className={styles.pageWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={styles.header}>Sign In</h2>
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
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
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
            Sign In
          </button>
          <button
            type="button"
            className={styles.loginLink}
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign Up
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;
