import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/PatientProfile.module.css";
import NavBar from "./Navigation";

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
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

  const handleEdit = () => navigate(`/admin/edit/patient/${id}`);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await fetch(`http://localhost:3000/patient/delete/${id}`, { method: "DELETE" });
        navigate("/admin/patients");
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
            <p><strong>Patient ID:</strong> {patient.id}</p>
            <p><strong>Contact No:</strong> {patient.contact_no}</p>
          </div>

          <div className={styles.accordion}>
            <details>
              <summary>Medical History</summary>
              {patient.medical_history?.length > 0 ? (
                <ul>{patient.medical_history.map((item, i) => <li key={i}>{item}</li>)}</ul>
              ) : <p>N/A</p>}
            </details>

            <details>
              <summary>Appointments</summary>
              {patient.appointments?.length > 0 ? (
                <ul>
                  {patient.appointments.map((appt) => (
                    <li key={appt.appointment_no}>
                      <strong>Concern:</strong> {appt.concern}<br />
                      <strong>Date:</strong> {new Date(appt.appointment_date).toLocaleDateString()}<br />
                      <strong>Amount Due:</strong> ₱{appt.amount_due}
                    </li>
                  ))}
                </ul>
              ) : <p>No appointments</p>}
            </details>

            <details>
              <summary>Admission Records</summary>
              {patient.admission_records?.length > 0 ? (
                <ul>
                  {patient.admission_records.map((record) => (
                    <li key={record.id}>
                      <strong>Prepartum Summary:</strong> {record.prepartum_summary}
                    </li>
                  ))}
                </ul>
              ) : <p>None</p>}
            </details>

            <details>
              <summary>Prenatal Records</summary>
              {patient.prenatal_records?.length > 0 ? (
                <ul>
                  {patient.prenatal_records.map((record) => (
                    <li key={record.id}>
                      <strong>BP:</strong> {record.blood_pressure}, 
                      <strong> HR:</strong> {record.heart_rate}, 
                      <strong> Temp:</strong> {record.temperature}<br />
                      <strong>Symptoms:</strong> {record.symptoms}<br />
                      <strong>Return Date:</strong> {new Date(record.return_date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : <p>None</p>}
            </details>

            <details>
              <summary>Ultrasound Records</summary>
              {patient.ultrasound_records?.length > 0 ? (
                <ul>
                  {patient.ultrasound_records.map((us) => (
                    <li key={us.id}>
                      <strong>GA:</strong> {us.gestational_age}, 
                      <strong> Weight:</strong> {us.fetal_weight}g<br />
                      <strong>Heartbeat:</strong> {us.cardiac_activity_bpm} bpm<br />
                      <strong>Gender:</strong> {us.Gender}
                    </li>
                  ))}
                </ul>
              ) : <p>None</p>}
            </details>

            <details>
              <summary>Lab Results</summary>
              {patient.lab_results?.length > 0 ? (
                <ul>
                  {patient.lab_results.map((lab) => (
                    <li key={lab.id}>
                      <strong>Blood Type:</strong> {lab.BloodType}<br />
                      <strong>CBC:</strong> {lab.CBC}<br />
                      <strong>Urinalysis:</strong> {lab.Urinalysis}<br />
                      <strong>Hepa B:</strong> {lab.Hepa_B_test}
                    </li>
                  ))}
                </ul>
              ) : <p>None</p>}
            </details>
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

export default PatientProfile;
