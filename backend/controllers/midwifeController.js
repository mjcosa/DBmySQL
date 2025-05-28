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
    const [rows] = await db.execute(`select * from midwife where id = ?`, [id]);

    if (rows.length > 0){
        return rows[0];
    }
    else {
        return null;
    }
}

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
