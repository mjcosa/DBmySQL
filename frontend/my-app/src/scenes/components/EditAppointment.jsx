import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./modules/AddPatientForm.module.css";
import NavBar from "./Navigation";

const EditAppointmentForm = () => {
  const { id } = useParams(); // Appointment ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    concern: "",
    appointmentDate: "",
    amountDue: "",
    contactNo: "",
    patientID: "",
    midwifeID: "",
    labresultsID: "",
    procedureID: "",
  });

  const [midwives, setMidwives] = useState([]);

  // Fetch existing appointment and midwives
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:3000/schedule/view/${id}`);
        const data = await response.json();
        setFormData({
          concern: data.concern || "",
          appointmentDate: data.appointment_date?.split("T")[0] || "",
          amountDue: data.amount_due || "",
          contactNo: data.contact_no || "",
          patientID: data.patient_id || "",
          midwifeID: data.midwife_id || "",
          labresultsID: data.labresults_id || "",
          procedureID: data.procedure_id || "",
        });
      } catch (error) {
        console.error("Failed to load appointment:", error);
        alert("Failed to fetch appointment data.");
      }
    };

    const fetchMidwives = async () => {
      try {
        const response = await fetch(`http://localhost:3000/midwife`);
        const data = await response.json();
        setMidwives(data);
      } catch (error) {
        console.error("Failed to fetch Appointment", error);
      }
    };

    fetchAppointment();
    fetchMidwives();
  }, []);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: name === "midwifeID" ? parseInt(value, 10) : value,
    }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/schedule/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update appointment");

      alert("Appointment updated successfully!");
      navigate("/admin/appointments");
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Error updating appointment. Please try again.");
    }
  };

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.pageContainer}>
        <NavBar />
        <div className={styles.container}>
          <h2>Edit Appointment</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Concern</label>
            <input type="text" name="concern" value={formData.concern} onChange={handleChange} required />

            <label>Appointment Date</label>
            <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />

            <label>Amount Due</label>
            <input type="text" name="amountDue" value={formData.amountDue} onChange={handleChange} required />

            <label>Contact Number</label>
            <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} required />

            <label>Patient ID</label>
            <input type="text" name="patientID" value={formData.patientID} onChange={handleChange} required />

            <label>Midwife</label>
            <select
            name="midwifeID"
            value={formData.midwifeID}
            onChange={handleChange}
            required
            className={styles.select}
            >
            <option value="">-- Select Midwife --</option>
            {midwives.map((midwife) => (
                <option key={midwife.id} value={midwife.id}>
                {midwife.first_name} {midwife.last_name}
                </option>
            ))}
            </select>
            <label>Lab Results ID</label>
            <input type="text" name="labresultsID" value={formData.labresultsID} onChange={handleChange} />

            <label>Procedure ID</label>
            <input type="text" name="procedureID" value={formData.procedureID} onChange={handleChange} />

            <button type="submit">Apply Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentForm;
