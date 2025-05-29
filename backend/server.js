import express from "express";
import morgan from "morgan";
import cors from "cors";
import {router} from "./routes/patientroutes.js";
import { appointmentRouter } from "./routes/appointmentroutes.js";
import { midwifeRouter } from "./routes/midwiferoutes.js";
import methodOverride from "method-override";
import { authRouter } from "./routes/authroutes.js";


const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

app.use(cors({ origin: 'http://localhost:5173' })); // or whatever your React port is
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
// app.set("views", "./views")

app.use('/patient', router);

app.use("/schedule", appointmentRouter);

app.use("/midwife", midwifeRouter);

app.use("/login", authRouter);