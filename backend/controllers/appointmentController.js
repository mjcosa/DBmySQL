import { db } from "../models/database.js";

export const toNull = (val) => (val === '' || val === undefined ? null : val);

export const submitAppointment = async (req, res) => {
  const {
    concern,
    appointmentDate,
    contactNo,
    patient_id = null,
    midwife_id = null,
    procedure_id = null,
    labresults_id = null,
  } = req.body;

  const safePatient_id = toNull(patient_id);
  const safelab_id = toNull(labresults_id);
  const safeMidwife_id = toNull(midwife_id);
  const safeProcedure_id = toNull(procedure_id);

  try {
    const [result] = await db.execute(
      `INSERT INTO appointment (
         concern, appointment_date, contact_no, patient_id, midwife_id, procedure_id, labresults_id
       ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        concern,
        appointmentDate,
        contactNo,
        safePatient_id,
        safeMidwife_id,
        safeProcedure_id,
        safelab_id,
      ]
    );

    res.status(200).json({ redirect: "http://localhost:5173/admin/appointments" });
  } catch (error) {
    console.error("Error inserting appointment:", error);
    res.status(500).json("Error scheduling appointment.");
  }
};


export const displayAppointments = async (req, res) => {
  const { start_date, end_date, concern } = req.query;

  try {
    let query = `SELECT * FROM appointment WHERE 1=1`;
    const params = [];

    if (start_date) {
      query += ` AND appointment_date >= ?`;
      params.push(start_date);
    }

    if (end_date) {
      query += ` AND appointment_date <= ?`;
      params.push(end_date);
    }

    const [rows] = await db.execute(query, params);

    res.status(200).json(rows);

  } catch (error) {
    console.error("Error retrieving appointments:", error);
    res.status(500).send("Error retrieving appointments.");
  }
};

export const displayAppointmentById = async (req, res) => {
  try {
    const [result] = await db.execute(
      `SELECT 
         a.*,
         -- Patient Info
         p.first_name AS patient_first_name,
         p.middle_name AS patient_middle_name,
         p.last_name AS patient_last_name,
         p.contact_no AS patient_contact_no,

         -- Procedure Info
         pr.procedure_type AS procedure_type,
         pr.procedure_date AS procedure_date,

         -- Midwife Info
         m.first_name AS midwife_first_name,
         m.middle_name AS midwife_middle_name,
         m.last_name AS midwife_last_name,
         m.contact_no AS midwife_contact_no,
         m.availability AS midwife_availability

       FROM appointment a
       LEFT JOIN patient p ON a.patient_id = p.id
       LEFT JOIN procedures pr ON a.procedure_id = pr.id
       LEFT JOIN midwife m ON a.midwife_id = m.id
       WHERE a.appointment_no = ?`,
      [req.params.id]
    );

    const appointment = result[0];

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error retrieving appointment:", error);
    res.status(500).send("Error retrieving appointment.");
  }
};

export const editAppointment = async (req, res) => {
  const appointment_no = req.params.id; // Get appointment ID from URL params
  const {
    concern,
    appointmentDate,
    amountDue,
    contactNo,
    patientID,
    midwifeID,
    labresultsID,
    procedureID,
  } = req.body;

  const safeAmount_due = toNull(amountDue);
  const safePatient_id = toNull(patientID);
  const safelab_id = toNull(labresultsID);
  const safeMidwife_id = toNull(midwifeID);
  const safeProcedure_id = toNull(procedureID);

  try {
    console.log("Updating appointment with data:", req.body);

    await db.execute(
      `UPDATE appointment 
       SET concern = ?, appointment_date = ?, amount_due = ?, contact_no = ?, 
           patient_id = ?, midwife_id = ?, labresults_id = ?, procedure_id = ? 
       WHERE appointment_no = ?`,
      [
        concern,
        appointmentDate,
        safeAmount_due,
        contactNo,
        safePatient_id,
        safeMidwife_id,
        safelab_id,
        safeProcedure_id,
        appointment_no || null,
      ]
    );

    res.status(200).json({ redirect: `http://localhost:5173/admin/appointment/${appointment_no}` });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).send("Error updating appointment.");
  }
};


export async function deleteAppointment(req, res){
    try {
        const result = await db.execute(`delete from appointment where appointment_no = ?`, [req.params.id])
        .then((result) => {
            res.json({ redirect: 'http://localhost:5173/admin/appointment' });
          })
          .catch((err) => {
            console.log(err);
          })

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

