import express from "express";
export const router = express.Router();
import {
    getPatient,
    addPatientPage,
    addPatient,
    getPatientDetails,
    deletePatientDetails,
    redirectEditPage,
    updatePatientDetails
} from "./routes.js";

router.get('/', getPatient);

router.get('/add', addPatientPage);

router.post('/', addPatient);

router.get('/:id', getPatientDetails);

router.delete('/delete/:id', deletePatientDetails);

router.get('/edit/:id', redirectEditPage);

router.post('/edit/:id', updatePatientDetails);
