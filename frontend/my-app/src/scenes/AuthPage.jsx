import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../states/auth";
import styles from "./modules/AuthPage.module.css"

import EyeIcon from "./components/icons/EyeIcon";
import EyeOffIcon from "./components/icons/EyeOffIcon";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password); // <-- await the login function

    if (result.success) {
      navigate(result.role === "admin" ? "/admin" : "/user");
    } else {
      setError("Invalid credentials");
    }
  };


  return (

    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.card}>
      <div className={styles.welcome}>Welcome</div>
        <p className={styles.subtitle}>Sign in to your account</p>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />

          <label className={styles.label}>Password</label>

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              style={{ paddingRight: "3rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "100%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#007bff",
                padding: 0,
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <button type="submit" className={styles.button}>
            Login
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
