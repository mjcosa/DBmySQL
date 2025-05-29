import React, { useState, useEffect } from "react";
import styles from "./modules/AddPatientForm.module.css";
import NavBar from "./Navigation";
import { useParams, useNavigate } from "react-router-dom"; // import useNavigate

const UpdatePatientForm = () => {
  const { id } = useParams(); // Get patient ID from URL
  const navigate = useNavigate(); // initialize navigate
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNo: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/${id}`);
        const data = await response.json();
        console.log(data);
        setFormData({
          firstName: data.first_name || "",
          middleName: data.middle_name || "",
          lastName: data.last_name || "",
          contactNo: data.contact_no || "",
        });
      } catch (error) {
        console.error("Failed to fetch patient", error);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/patient/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update patient");
      }

      const updatedPatient = await response.json();
      console.log("Patient Updated:", updatedPatient);
      alert("Patient updated successfully!");
      navigate(`/admin/patient/${id}`);

    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient. Please try again.");
    }
  };

  return (
    <div className={`${styles.pageWrapper} ${styles.fadeIn}`}>
      <div className={styles.pageContainer}>
        <NavBar />
        <h2>Update Patient</h2>
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

          <button type="submit">Update Patient</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatientForm;
