import React, { useState } from "react";
import styles from "./modules/AddPatientForm.module.css";
import NavBar from "./Navigation";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
    occupation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call or state update
    console.log("Patient Submitted:", formData);
    alert("Patient added successfully!");
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      contactNo: "",
      occupation: "",
    });
  };

  return (
    <div className={styles.pageWrapper}>
        <div className={styles.pageContainer}>
        <NavBar />
        <div className={styles.content}></div>
            <div className={styles.container}>
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

                <label>Occupation</label>
                <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                />
                <button type="submit">Add Patient</button>
            </form>
            </div>
        </div>
    </div>
  );
};

export default AddPatientForm;
