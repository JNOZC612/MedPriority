import React, { useState } from "react";
import Toolbar from "../components/Toolbar";
import styles from "../styles/admin.dashboard.module.css";

export default function AdminDashBoard({ ...args }) {
  const [activeOption, setActiveOption] = useState("Home");

  // Función para manejar la selección de la opción del menú
  const handleMenuClick = (option) => {
    setActiveOption(option);
  };
  return (
    <div>
      <Toolbar />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <ul>
            <li
              className={activeOption === "Home" ? "active" : ""}
              onClick={() => handleMenuClick("Home")}
            >
              Home
            </li>
            <li
              className={activeOption === "Profile" ? "active" : ""}
              onClick={() => handleMenuClick("Profile")}
            >
              Profile
            </li>
            <li
              className={activeOption === "Settings" ? "active" : ""}
              onClick={() => handleMenuClick("Settings")}
            >
              Settings
            </li>
          </ul>
        </div>

        <div className={styles.mainPanel}>
          {activeOption === "Home" && <div>Welcome to the Home page!</div>}
          {activeOption === "Profile" && <div>Here is your Profile page!</div>}
          {activeOption === "Settings" && <div>Adjust your Settings here!</div>}
        </div>
      </div>
    </div>
  );
}
