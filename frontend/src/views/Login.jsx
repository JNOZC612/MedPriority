import React, { useState } from "react";
import Toolbar from "../components/Toolbar";
import styles from "../styles/form.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ ...args }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleClick() {
    console.log("CLICK");
    try {
      const response = await axios.post(
        "http://localhost:3200/api/sesion/login",
        {
          email,
          password,
        }
      );
      console.log(`STATUS: ${response.status}`);
      if (response.status === 200) navigate("/admin/dashboard");
      else alert("Credendiales incorrectas");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message || "Error desconocido"); // Maneja errores
      } else {
        alert("Error desconocido");
      }
    }
  }
  return (
    <div>
      <Toolbar />
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h2>Iniciar Sesion</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.btnLogin} onClick={handleClick}>
            Iniciar Sesion
          </button>
        </div>
      </div>
    </div>
  );
}
