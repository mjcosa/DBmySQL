import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/PatientProfile.module.css";
import NavBar from "./Navigation";

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Replace with real API call
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/${id}`);
        const data = await response.json();
        setPatient(data);
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchPatient();
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

  if (!patient) return <p>Loading patient data...</p>;

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
        <div className={styles.pageContainer}>
            <div className={styles.wrapper}>
            <NavBar />
            <div className={styles.profileCard}>
                <h2>{patient.first_name} {patient.middle_name} {patient.last_name}</h2>
                <p><strong>Patient ID: </strong>{patient.id}</p>
                <p><strong>Contact No:</strong> {patient.contact_no}</p>
                <p><strong>Occupation:</strong> {patient.occupation ?? "N/A"}</p>

                <div className={styles.actions}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete} className={styles.delete}>Delete</button>
                </div>

                <div className={styles.history}>
                <h3>Medical History</h3>
                {patient.medicalHistory?.length ? (
                    <ul>
                    {patient.medicalHistory.map((entry, index) => (
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

export default PatientProfile;
