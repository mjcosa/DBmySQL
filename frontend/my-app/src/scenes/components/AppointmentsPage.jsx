import React, { useState, useEffect } from 'react';
import styles from './modules/PatientsPage.module.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navigation';

const mockAppointments = [
  {
    id: 1,
    first_name: 'Maria',
    middle_name: 'Elena',
    last_name: 'Cruz',
    contact_no: '09123456789',
    next_appointment: '2024-06-10'
  },
  {
    id: 2,
    first_name: 'Anna',
    middle_name: 'Louise',
    last_name: 'Santos',
    contact_no: '09987654321',
    next_appointment: null
  }
];

const AppointmentsPage = () => {
  const [query, setQuery] = useState('');
  const [appointments, setappointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setappointments(mockAppointments); // Replace with real API fetch
  }, []);

  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const filteredappointments = appointments.filter((p) =>
    [p.first_name, p.middle_name, p.last_name, p.contact_no]
      .join(' ')
      .toLowerCase()
      .includes(query)
  );

  return (
    <div className={styles.pageWrapper}>
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

          <table className={styles.patientsTable}>
            <thead>
              <tr>
                <th>Appointment No.</th>
                <th>appointment Name</th>
                <th>Concern</th>
                <th>Appointment Type</th>
                <th>Appointment Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredappointments.map((appointment) => (
                <tr
                  key={appointment.no}
                  className={styles.clickableRow}
                  onClick={() => navigate(`/admin/appointment/${appointment.id}`)}
                >
                  <td>{highlight(appointment.id, query)}</td>
                  <td>{highlight(appointment.last_name, query)}</td>
                  <td>{highlight(`${appointment.first_name} ${appointment.middle_name}`, query)}</td>
                  <td>{highlight(appointment.contact_no, query)}</td>
                  <td>{appointment.next_appointment || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Highlight matching query
const highlight = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query ? <span key={i} className={styles.highlight}>{part}</span> : part
  );
};

export default AppointmentsPage;
