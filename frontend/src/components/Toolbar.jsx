import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components.module.css";
import logo from "../assets/logo.png";
export default function Toolbar({ refs }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.linkContainer}>
        <Link className={styles.anchorTitle} to="/">
          <div className={styles.circularImage} style={{backgroundImage: `url(${logo})`}}/>
          <h3>MedPriority</h3>
        </Link>
      </div>
      <div className={styles.linkContainer}>
        {!refs ? (
          <div></div>
        ) : (
          refs.map((item, index) => (
            <Link className={styles.anchor} key={index} to={item.ref}>
              {item.title}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
