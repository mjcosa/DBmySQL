import React, { useState, useEffect } from 'react';
import styles from './modules/PatientsPage.module.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navigation';

const AppointmentsPage = () => {
  const [query, setQuery] = useState('');
  const [appointments, setappointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/schedule/view`);
        const data = await response.json();
        setappointments(data);
      } catch (error) {
        console.error("Failed to fetch Appointment", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const filteredappointments = appointments.filter((p) =>
    [p.appointment_no, p.concern, p.appointment_date, p.patient_id]
      .join(' ')
      .toLowerCase()
      .includes(query)
  );

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.pageContainer}>
        <NavBar />
        <div className={styles.content}>
          <h1>Appointments</h1>

          <form className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for appointments..."
              className={styles.searchInput}
              value={query}
              onChange={handleSearch}
            />
          </form>

          <div className={styles.summary}>
            <h3>Total Appointments: {filteredappointments.length}</h3>
          </div>

          {filteredappointments.length === 0 ? (
            <p className={styles.noResults}>No appointments found.</p>
          ) : (
            <table className={styles.patientsTable}>
              <thead>
                <tr>
                  <th>Appointment No.</th>
                  <th>Concern</th>
                  <th>Appointment Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredappointments.map((appointment) => (
                  <tr
                    key={appointment.no}
                    className={styles.clickableRow}
                    onClick={() => navigate(`/admin/appointment/${appointment.appointment_no}`)}
                  >
                    <td>{highlight(appointment.appointment_no, query)}</td>
                    <td>{highlight(appointment.concern, query)}</td>
                    <td>{highlight(appointment.appointment_date, query)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// Highlight matching query
const highlight = (text, query) => {
  if (!query) return text;
  const parts = String(text).split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query ? <span key={i} className={styles.highlight}>{part}</span> : part
  );
};

export default AppointmentsPage;
