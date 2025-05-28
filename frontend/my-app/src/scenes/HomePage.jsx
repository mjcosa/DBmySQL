import React from 'react';
import { Link } from 'react-router-dom';
import styles from './modules/HomePage.module.css';

export default function HomePage() {
  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
        <div className={styles.page}>
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to Serenity Birthing Clinic</h1>
            <p className={styles.subtitle}>Choose a section to get started:</p>

            <div className={styles.cardGrid}>
            <Link to="/admin/patients" className={styles.card}>
                <h2>👩‍🍼 Patients</h2>
                <p>View and manage patient records</p>
            </Link>

            <Link to="/admin/midwives" className={styles.card}>
                <h2>🧑‍⚕️ Midwives</h2>
                <p>View and manage midwife staff</p>
            </Link>

            <Link to="/admin/appointments" className={styles.card}>
                <h2>📅 Appointments</h2>
                <p>Schedule and review appointments</p>
            </Link>
            </div>
        </div>
        </div>
    </div>
  );
}
