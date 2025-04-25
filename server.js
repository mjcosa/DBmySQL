import express from "express";
import morgan from "morgan";
import mysql from "mysql2/promise";
import {router} from "./routes/patientroutes.js";

const PORT = process.env.PORT || 3000;

export const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "clinic_db",
});

const app = express();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
// app.set("views", "./views")

//Index
app.get('/', (req, res) => {
    res.redirect('/patient');
});
  
  //About page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
});
  
  //Blog Routes
app.use('/patient', router);
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
});