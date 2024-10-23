import React from "react";
import Toolbar from "../components/Toolbar";
import styles from "../styles/admin.main.module.css";
function AdminMain({ ...args }) {
  const links = [{ ref: "/login", title: "Iniciar Sesión" }];
  return (
    <div>
      <Toolbar refs={links} />
      <div className={styles.panel}>
        <div className={styles.sloganContainer}>
          <h1 className={styles.sloganText}>
            Optimizando tiempos, salvando vidas
          </h1>
        </div>
        <div className={styles.containerMisionVision}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Misión</h2>
            <p className={styles.cardText}>
              Nuestra misión es brindar una solución al sector hospitalario con
              tecnología eficiente que optimice los tiempos de atención al
              paciente, que ayuda a mejorar la calidad de la atención médica y
              la percepción del paciente en casos de emergencia. Nuestro
              objetivo es diseñar soluciones que ofrezcan una atención rápida y
              clasificada según la urgencia y gravedad, maximizando el uso de
              las instalaciones y facilitando al personal médico la toma de
              decisiones.
            </p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Visión</h2>
            <p className={styles.cardText}>
              Ser el principal proveedor de una gestión eficiente en atención
              médica de emergencia en Guatemala, donde cada paciente recibe una
              atención de calidad, rápida y personalizada, utilizando tecnología
              innovadora para optimizar recursos hospitalarios. Aspiramos a
              transformar el cuidado del paciente guatemalteco y expandirnos a
              nivel centro americano y países latinos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminMain;
