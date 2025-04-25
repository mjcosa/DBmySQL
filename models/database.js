import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
    host: "clinicdb-mjcosa.l.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_LDlE5ppHYnZwaJ7Y9jW",
    database: "clinic_db",
    port: 25855
});