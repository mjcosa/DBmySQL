import mysql from "mysql2/promise";
import fs from "fs";

export const db = await mysql.createConnection({
    host: 'host', // use full host from Aiven
    port: 25855,                          // use correct port
    user: 'avnadmin',
    password: 'pass',
    database: 'clinic_db',               // or your DB name
    ssl: {
        ca: fs.readFileSync("./certs/ca.pem")
    }
    
});