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


export const postPatient = async (firstName, middleName, lastName, contact) => {
    const [result] = await db.execute("insert into patient(first_name, middle_name, last_name, contact_no) values(?,?,?,?)", 
        [firstName, middleName, lastName, contact]
    );
    return result;
}

export const getPatientbyID = async (id) => {
    const [rows] = await db.execute(`select * from patient where id = ?`, [id]);

    if (rows.length > 0){
        return rows[0];
    }
    else {
        return null;
    }
}

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
