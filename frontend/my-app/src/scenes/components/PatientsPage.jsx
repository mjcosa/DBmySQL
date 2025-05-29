import React, { useState, useEffect } from 'react';
import styles from './modules/PatientsPage.module.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navigation';

const PatientsPage = () => {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch Appointment", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const filteredPatients = patients.filter((p) =>
    [p.first_name, p.middle_name, p.last_name, p.contact_no]
      .join(' ')
      .toLowerCase()
      .includes(query)
  );

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.pageContainer}>
        <NavBar />
        <div className={styles.content}>
          <h1>Patients</h1>

          <form className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for patients..."
              className={styles.searchInput}
              value={query}
              onChange={handleSearch}
            />
          </form>

          <div className={styles.summary}>
            <h3>Total Patients: {filteredPatients.length}</h3>
          </div>

          {filteredPatients.length === 0 ? (
            <p className={styles.noResults}>No patients found.</p>
          ) : (
            <table className={styles.patientsTable}>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Last Name</th>
                  <th>First & Middle Name</th>
                  <th>Contact No</th>
                  <th>Next Appointment</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className={styles.clickableRow}
                    onClick={() => navigate(`/admin/patient/${patient.id}`)}
                  >
                    <td>{highlight(patient.id, query)}</td>
                    <td>{highlight(patient.last_name, query)}</td>
                    <td>{highlight(`${patient.first_name} ${patient.middle_name}`, query)}</td>
                    <td>{highlight(patient.contact_no, query)}</td>
                    <td>{patient.next_appointment || 'None'}</td>
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

export default PatientsPage;
