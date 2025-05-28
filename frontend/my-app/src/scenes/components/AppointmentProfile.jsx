import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/AppointmentProfile.module.css";
import NavBar from "./Navigation";

const AppointmentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    // Replace with real API call
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
    navigate(`/appointments/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await fetch(`/api/appointments/${id}`, { method: "DELETE" });
        navigate("/appointments");
      } catch (error) {
        console.error("Failed to delete appointment", error);
      }
    }
  };

  if (!appointment) return <p>Loading Appointment data...</p>;

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
        <div className={styles.pageContainer}>
            <div className={styles.wrapper}>
            <NavBar />
            <div className={styles.profileCard}>
                <h2>{appointment.first_name} {appointment.middle_name} {appointment.last_name}</h2>
                <p><strong>Appointment No: </strong>{appointment.appointment_no}</p>
                <p><strong>Patient Name:</strong> {appointment.contact_no}</p>
                <p><strong>Assigned Midwife Name:</strong> {appointment.contact_no}</p>
                <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
                <p><strong>Concern:</strong> {appointment.concern ?? "N/A"}</p>
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
