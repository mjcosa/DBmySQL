import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/PatientProfile.module.css";
import NavBar from "./Navigation";

const MidwivesProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [midwives, setMidwives] = useState(null);

  useEffect(() => {
    // Replace with real API call
    const fetchMidwife = async () => {
      try {
        const response = await fetch(`http://localhost:3000/midwife/${id}`);
        const data = await response.json();
        setMidwives(data);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchMidwife();
  }, [id]);

  const handleEdit = () => {
    navigate(`/patients/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await fetch(`/api/patients/${id}`, { method: "DELETE" });
        navigate("/patients");
      } catch (error) {
        console.error("Failed to delete patient", error);
      }
    }
  };

  if (!midwives) return <p>Loading midwife data...</p>;

  return (
    <div className={styles.pageWrapper}>
        <div className={styles.pageContainer}>
            <div className={styles.wrapper}>
            <NavBar />
            <div className={styles.profileCard}>
                <h2>{midwives.first_name} {midwives.middle_name} {midwives.last_name}</h2>
                <p><strong>Patient ID: </strong>{midwives.id}</p>
                <p><strong>Contact No:</strong> {midwives.contact_no}</p>
                <p><strong>Occupation:</strong> {midwives.occupation ?? "N/A"}</p>

                <div className={styles.actions}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete} className={styles.delete}>Delete</button>
                </div>

                <div className={styles.history}>
                <h3>Medical History</h3>
                {midwives.medicalHistory?.length ? (
                    <ul>
                    {midwives.medicalHistory.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                    </ul>
                ) : (
                    <p>No medical history available.</p>
                )}
                </div>
            </div>    
            </div>
        </div>
    </div>
  );
};

export default MidwivesProfile;
