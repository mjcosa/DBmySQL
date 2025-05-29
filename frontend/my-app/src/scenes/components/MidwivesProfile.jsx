import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/PatientProfile.module.css";
import NavBar from "./Navigation";

const MidwivesProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [midwife, setMidwife] = useState(null);

  useEffect(() => {
    const fetchMidwife = async () => {
      try {
        const response = await fetch(`http://localhost:3000/midwife/${id}`);
        const data = await response.json();
        setMidwife(data);
      } catch (error) {
        console.error("Failed to fetch midwife", error);
      }
    };

    fetchMidwife();
  }, [id]);

  const handleEdit = () => {
    navigate(`/midwives/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this midwife?")) {
      try {
        await fetch(`/midwife/delete/${id}`, { method: "DELETE" });
        navigate("/admin/midwives");
      } catch (error) {
        console.error("Failed to delete midwife", error);
      }
    }
  };

  if (!midwife) return <p>Loading midwife data...</p>;

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.pageContainer}>
        <div className={styles.wrapper}>
          <NavBar />
          <div className={styles.profileCard}>
            <h2>
              {midwife.first_name} {midwife.middle_name} {midwife.last_name}
            </h2>
            <p><strong>Midwife ID: </strong>{midwife.id}</p>
            <p><strong>Contact No:</strong> {midwife.contact_no}</p>
          </div>

          <div className={styles.history}>
            <h3>Assigned Patients</h3>
            {midwife.assigned_patients && midwife.assigned_patients.length > 0 ? (
              <ul>
                {midwife.assigned_patients.map((patient, index) => (
                  <li key={index}>
                    <strong>{patient.first_name} {patient.middle_name} {patient.last_name}</strong> – {patient.concern} on {new Date(patient.appointment_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No assigned patients.</p>
            )}
          </div>
          
            <div className={styles.actions}>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete} className={styles.delete}>Delete</button>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default MidwivesProfile;
