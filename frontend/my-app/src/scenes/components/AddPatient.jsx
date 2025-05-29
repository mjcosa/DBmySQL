import React, { useState } from "react";
import styles from "./modules/AddPatientForm.module.css";
import NavBar from "./Navigation";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/patient/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON payload
        },
        body: JSON.stringify(formData), // Convert object to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      const savedPatient = await response.json();
      console.log("Patient Submitted:", savedPatient);
      alert("Patient added successfully!");

      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        contactNo: "",
      });

    } catch (error) {
      console.error("Error submitting patient:", error);
      alert("Failed to add patient. Please try again.");
    }
  };


  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
        <div className={styles.pageContainer}>
          <NavBar />
            <h2>Add New Patient</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>First Name</label>
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                />

                <label>Middle Name</label>
                <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                required
                />

                <label>Last Name</label>
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                />

                <label>Contact No</label>
                <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                />
                
                <button type="submit">Add Patient</button>
            </form>
        </div>
    </div>
  );
};

export default AddPatientForm;
