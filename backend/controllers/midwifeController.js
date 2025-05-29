import { db } from "../models/database.js";

export const getMidwives = async () => {

    const [rows] = await db.execute("select * from midwife ");
    return rows;
};

export const postMidwife = async (firstName, middleName, lastName, contact, availability) => {
    const [result] = await db.execute("insert into midwife(first_name, middle_name, last_name, contact_no, availability) values(?,?,?,?,?)", 
        [firstName, middleName, lastName, contact, availability]
    );
    return result;
}

export const getMidwifeById = async (id) => {
  // Fetch midwife details
  const [midwifeRows] = await db.execute(
    `SELECT * FROM midwife WHERE id = ?`,
    [id]
  );

  if (midwifeRows.length === 0) {
    return null;
  }

  const midwife = midwifeRows[0];

  // Fetch patients assigned to this midwife via appointments
  const [patientRows] = await db.execute(
    `SELECT 
        p.id, 
        p.first_name, 
        p.middle_name, 
        p.last_name, 
        p.contact_no,
        a.appointment_date,
        a.concern
     FROM appointment a
     JOIN patient p ON a.patient_id = p.id
     WHERE a.midwife_id = ?`,
    [id]
  );

  // Return midwife details along with assigned patients
  return {
    ...midwife,
    assigned_patients: patientRows, // this is an array
  };
};


export const deleteMidwifeId = async (id) => {
    const result = await db.execute(`delete from midwife where id = ?`, [id]);
    return result;
}

export const updateMidwifedetails = async (res) => {
    const [rows] = await db.execute(`update midwife set first_Name = ?, middle_Name = ?, last_Name = ?, contact_no = ?, availability = ? where id = ?`, 
        [res.first_name, res.middle_name, res.last_name, res.contact_no, res.availability, res.id]
    );

    return rows[0];
}
