import express from "express";
import morgan from "morgan";
import {router} from "./routes/patientroutes.js";
import { appointmentRouter } from "./routes/appointmentroutes.js";
import { midwifeRouter } from "./routes/midwiferoutes.js";
import methodOverride from "method-override";


const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
// app.set("views", "./views")

//Index / All Patients Page
app.get('/', (req, res) => {
    res.redirect('/patient');
});
  
  //Add patient page
app.get('/add_patient', (req, res) => {
    res.render('add', {title: 'Add Patient'})
});

// Add schedule page
app.get('/schedule', (req, res) => {
  res.render('schedule', {title: 'Schedule Appointment'})
});

  //Blog Routes
app.use('/patient', router);

app.use("/schedule", appointmentRouter);

app.use("/midwife", midwifeRouter);
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
});