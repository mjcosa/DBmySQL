import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/AppointmentProfile.module.css";
import NavBar from "./Navigation";

const AppointmentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/schedule/view/${id}`);
        const data = await response.json();
        setAppointment(data);
      } catch (error) {
        console.error("Failed to fetch Appointment", error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleEdit = () => {
    navigate(`/admin/appointment/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await fetch(`http://localhost:3000/schedule/delete/${id}`, { method: "DELETE" });
        navigate("/admin/appointments");
      } catch (error) {
        console.error("Failed to delete appointment", error);
      }
    }
  };

  if (!appointment) return <p>Loading Appointment data...</p>;

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
        <div className={styles.pageContainer}>
        <NavBar />
            <div className={styles.wrapper}>
            <div className={styles.profileCard}>
                <h2>{appointment.first_name} {appointment.middle_name} {appointment.last_name}</h2>
                <p><strong>Appointment No: </strong>{appointment.appointment_no}</p>
                <p><strong>Concern:</strong> {appointment.concern ?? "N/A"}</p>
                <p><strong>Patient Name:</strong> {appointment.patient_last_name} {appointment.patient_first_name}</p>
                <p><strong>Assigned Midwife Name:</strong> {appointment.midwife_last_name} {appointment.midwife_first_name}</p>
                <p><strong>Procedure Type: </strong> {appointment.procedure_type ?? "N/A"}</p>
                <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
                <p><strong>Amount Due:</strong> {appointment.amount_due ?? "N/A"}</p>

                <div className={styles.actions}>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete} className={styles.delete}>Delete</button>
                </div>
            </div>    
            </div>
        </div>
    </div>
  );
};

export default AppointmentProfile;
