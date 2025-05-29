import styles from './modules/NavBar.module.css';
import { NavLink } from "react-router-dom";

export default function UserNavBar() {
  return (
        <nav className={styles.nav}>
          <div className={styles.siteTitle}>
              <h2>
                Patient Record System for Sabio - Reantazo <br />
                Birthing Home & Family Planning Clinic
              </h2>
          </div>
          <ul>
            <li>
              <NavLink to="/user/appointments" className={({ isActive }) => isActive ? styles.active : undefined}>
                Schedule Appointment
              </NavLink>
            </li>
          </ul>
        </nav>
  )
};