import React from "react";
import { Link } from 'react-router-dom';
import styles from './modules/HomePage.module.css';

const UserDashboard = () => {
  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
            <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to Serenity Birthing Clinic</h1>
                <p className={styles.subtitle}>Choose a section to get started:</p>
    
                <div className={styles.cardGrid}>
                <Link to="/admin/patients" className={styles.card}>
                    <h2>📅 Schedule Appointment</h2>
                    <p>Schedule an appointment with a midwife</p>
                </Link>
    
                <Link to="/admin/appointments" className={styles.card}>
                    <h2>📅 View Appointments</h2>
                    <p>View and edit scheduled appointments</p>
                </Link>
                </div>
            </div>
            </div>
        </div>
  );
};

export default UserDashboard;
