import express from "express";
export const router = express.Router();
import {
    getPatient,
    addPatient,
    getPatientDetails,
    deletePatientDetails,
    updatePatientDetails
} from "./routes.js";

router.get('/', getPatient);

router.post('/add', addPatient);

router.get('/:id', getPatientDetails);

router.delete('/delete/:id', deletePatientDetails);

router.post('/edit/:id', updatePatientDetails);
