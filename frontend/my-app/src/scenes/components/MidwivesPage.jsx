import React, { useState, useEffect } from 'react';
import styles from './modules/PatientsPage.module.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navigation';

const MidwivesPage = () => {
  const [query, setQuery] = useState('');
  const [midwives, setMidwives] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMidwives = async () => {
      try {
        const response = await fetch(`http://localhost:3000/midwife`);
        const data = await response.json();
        setMidwives(data);
      } catch (error) {
        console.error("Failed to fetch Appointment", error);
      }
    };

    fetchMidwives();
  }, []);

  const handleSearch = (e) => setQuery(e.target.value.toLowerCase());

  const filteredMidwives = midwives.filter((p) =>
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
          <h1>Midwives</h1>

          <form className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for midwife..."
              className={styles.searchInput}
              value={query}
              onChange={handleSearch}
            />
          </form>

          <div className={styles.summary}>
            <h3>Total Midwives: {filteredMidwives.length}</h3>
          </div>

          {filteredMidwives.length === 0 ? (
            <p className={styles.noResults}>No midwives found.</p>
          ) : (
            <table className={styles.patientsTable}>
              <thead>
                <tr>
                  <th>Midwife ID</th>                
                  <th>Last Name</th>
                  <th>First & Middle Name</th>
                  <th>Contact No</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredMidwives.map((midwives) => (
                  <tr
                    key={midwives.id}
                    className={styles.clickableRow}
                    onClick={() => navigate(`/admin/midwives/${midwives.id}`)}
                  >
                    <td>{highlight(midwives.id, query)}</td>
                    <td>{highlight(midwives.last_name, query)}</td>
                    <td>{highlight(`${midwives.first_name} ${midwives.middle_name}`, query)}</td>
                    <td>{highlight(midwives.contact_no, query)}</td>
                    <td>{midwives.next_appointment || 'None'}</td>
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

export default MidwivesPage;
