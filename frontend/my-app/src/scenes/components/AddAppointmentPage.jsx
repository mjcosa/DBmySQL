import React, { useState } from "react";
import styles from "./modules/AddPatientForm.module.css";
import NavBar from "./Navigation";
import UserNavBar from "./UserNavigation";

const AddAppointmentForm = () => {
  const [formData, setFormData] = useState({
    contactNo: "",
    concern: "",
    appointmentDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add appointment");
      }

      const savedAppointment = await response.json();
      console.log("Appointment Submitted:", savedAppointment);
      alert("Appointment scheduled successfully!");

      setFormData({
        contactNo: "",
        concern: "",
        appointmentDate: "",
      });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Failed to add appointment. Please try again.");
    }
  };

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.pageContainer}>
        <UserNavBar />
        <div className={styles.container}>
          <h2>Schedule an Appointment</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
            />

            <label>Concern</label>
            <input
              type="text"
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              required
            />

            <label>Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentForm;
