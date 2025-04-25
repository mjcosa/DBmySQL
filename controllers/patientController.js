import { db } from "../server.js";

export const getPatients = async () => {

    const [rows] = await db.execute("select * from patient ");
    return rows;
};

export const postPatient = async (id, firstName, middleName, lastName, contact) => {
    const [result] = await db.execute("insert into patient(id, first_name, middle_name, last_name, contact_no) values(?,?,?,?,?)", 
        [id, firstName, middleName, lastName, contact]
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
}