import { db } from "../models/database.js";

export const getPatients = async () => {
    const [rows] = await db.execute(`
        SELECT 
            p.*, 
            MIN(a.appointment_date) AS next_appointment
        FROM 
            patient p
        LEFT JOIN 
            appointment a ON p.id = a.patient_id 
            AND a.appointment_date >= CURDATE()
        GROUP BY 
            p.id
        ORDER BY 
            p.last_name
    `);

    return rows;
};


export const postPatient = async (firstName, middleName, lastName, contactNo) => {
    const [result] = await db.execute("insert into patient(first_name, middle_name, last_name, contact_no) values(?,?,?,?)", 
        [firstName, middleName, lastName, contactNo]
    );
    return result;
}

export const getPatientbyID = async (id) => {
  const [rows] = await db.execute(
    `SELECT 
       p.id AS patient_id,
       p.first_name,
       p.middle_name,
       p.last_name,
       p.contact_no,

       mh.id AS mh_id,
       mh.medical_history,

       a.appointment_no,
       a.concern,
       a.appointment_date,
       a.amount_due,
       a.contact_no AS appointment_contact,

       ar.id AS admission_id,
       ar.prepartum_summary,

       prn.id AS prenatal_id,
       prn.blood_pressure,
       prn.heart_rate,
       prn.respiratory_rate,
       prn.temperature,
       prn.weight,
       prn.symptoms,
       prn.return_date,
       prn.first_menstruation_age,
       prn.menstruation_description,
       prn.menstruation_duration,

       us.id AS ultrasound_id,
       us.gestational_age,
       us.fetal_weight,
       us.cardiac_activity_bpm,
       us.Presentation,
       us.Placenta_Position,
       us.Placenta_Grade,
       us.Gender,

       lr.id AS labresult_id,
       lr.BloodType,
       lr.CBC,
       lr.Urinalysis,
       lr.Hepa_B_test

     FROM patient p
     LEFT JOIN medicalHistory mh ON p.id = mh.patient_id
     LEFT JOIN appointment a ON p.id = a.patient_id
     LEFT JOIN procedures pr ON a.procedure_id = pr.id
     LEFT JOIN admissionRecord ar ON pr.id = ar.procedure_id
     LEFT JOIN prenatalRecord prn ON pr.id = prn.procedure_id
     LEFT JOIN ultrasoundRecord us ON pr.id = us.procedure_id
     LEFT JOIN labresults lr ON a.labResults_id = lr.id
     WHERE p.id = ?`,
    [id]
  );

  if (rows.length === 0) {
    return null;
  }

  const patient = {
    id: rows[0].patient_id,
    first_name: rows[0].first_name,
    middle_name: rows[0].middle_name,
    last_name: rows[0].last_name,
    contact_no: rows[0].contact_no,
    medical_history: [],
    appointments: [],
    admission_records: [],
    prenatal_records: [],
    ultrasound_records: [],
    lab_results: []
  };

  const seenMH = new Set();
  const seenAppointments = new Set();
  const seenAdmissions = new Set();
  const seenPrenatal = new Set();
  const seenUltrasound = new Set();
  const seenLabResults = new Set();

  for (const row of rows) {
    if (row.medical_history && !seenMH.has(row.mh_id)) {
      patient.medical_history.push(row.medical_history);
      seenMH.add(row.mh_id);
    }

    if (row.appointment_no && !seenAppointments.has(row.appointment_no)) {
      patient.appointments.push({
        appointment_no: row.appointment_no,
        concern: row.concern,
        appointment_date: row.appointment_date,
        amount_due: row.amount_due,
        contact_no: row.appointment_contact
      });
      seenAppointments.add(row.appointment_no);
    }

    if (row.admission_id && !seenAdmissions.has(row.admission_id)) {
      patient.admission_records.push({
        id: row.admission_id,
        prepartum_summary: row.prepartum_summary
      });
      seenAdmissions.add(row.admission_id);
    }

    if (row.prenatal_id && !seenPrenatal.has(row.prenatal_id)) {
      patient.prenatal_records.push({
        id: row.prenatal_id,
        blood_pressure: row.blood_pressure,
        heart_rate: row.heart_rate,
        respiratory_rate: row.respiratory_rate,
        temperature: row.temperature,
        weight: row.weight,
        symptoms: row.symptoms,
        return_date: row.return_date,
        first_menstruation_age: row.first_menstruation_age,
        menstruation_description: row.menstruation_description,
        menstruation_duration: row.menstruation_duration
      });
      seenPrenatal.add(row.prenatal_id);
    }

    if (row.ultrasound_id && !seenUltrasound.has(row.ultrasound_id)) {
      patient.ultrasound_records.push({
        id: row.ultrasound_id,
        gestational_age: row.gestational_age,
        fetal_weight: row.fetal_weight,
        cardiac_activity_bpm: row.cardiac_activity_bpm,
        Presentation: row.Presentation,
        Placenta_Position: row.Placenta_Position,
        Placenta_Grade: row.Placenta_Grade,
        Gender: row.Gender
      });
      seenUltrasound.add(row.ultrasound_id);
    }

    if (row.labresult_id && !seenLabResults.has(row.labresult_id)) {
      patient.lab_results.push({
        id: row.labresult_id,
        BloodType: row.BloodType,
        CBC: row.CBC,
        Urinalysis: row.Urinalysis,
        Hepa_B_test: row.Hepa_B_test
      });
      seenLabResults.add(row.labresult_id);
    }
  }

  return patient;
};

export const deletePatient = async (id) => {
    const result = await db.execute(`delete from patient where id = ?`, [id]);
    return result;
}

export const updatePatient = async (res) => {
    const [rows] = await db.execute(`update patient set first_Name = ?, middle_Name = ?, last_Name = ?, contact_no = ? where id = ?`, 
        [res.first_name, res.middle_name, res.last_name, res.contact_no, res.id]
    );

    return rows[0];
}

export async function searchPatientsByName(query) {
  const sql = `
    SELECT 
      p.*, 
      MIN(a.appointment_date) AS next_appointment
    FROM 
      patient p
    LEFT JOIN 
      appointment a ON p.id = a.patient_id 
      AND a.appointment_date >= CURDATE()
    WHERE 
      CONCAT(p.first_name, ' ', p.middle_name, ' ', p.last_name) LIKE ?
    GROUP BY
      p.id
    ORDER BY
      p.last_name
  `;

  const [rows] = await db.execute(sql, [`%${query}%`]);
  return rows;
}
