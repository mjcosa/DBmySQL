import { 
    getMidwives,
    postMidwife,
    getMidwifeById,
    deleteMidwifeId,
    updateMidwifedetails,
} from "../controllers/midwifeController.js";

import {
    getPatients,
    postPatient,
    getPatientbyID,
    deletePatient,
    updatePatient,
} from "../controllers/patientController.js";


export async function getPatient(req, res) {
  try {
    const patients = await getPatients();

    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get patient" });
  } 
}

export async function addPatient(req, res) {
  try {
    const { firstName, middleName, lastName, contactNo } = req.body;
    const safeFirstName = firstName ?? null;
    const safeMiddleName = middleName ?? null;
    const safeLastName = lastName ?? null;
    const safeContactNo = contactNo ?? null;

    await postPatient(safeFirstName, safeMiddleName, safeLastName, safeContactNo);

    res.status(200).json({ message: "Patient added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add patient" });
  }
}


export async function getPatientDetails(req, res){
    try {
        const patient = await getPatientbyID(req.params.id);
        if (patient) {
            res.status(200).json(patient);
        }
    } catch (err) {
        console.error(err);
        res.status(500);
    }
}

export async function deletePatientDetails(req, res){
    try {
        let result = await deletePatient(req.params.id)
        .then((result) => {
            res.json({ redirect: '/' });
          })
          .catch((err) => {
            console.log(err);
          })

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function updatePatientDetails(req, res){
    try {
        let patient = await getPatientbyID(req.params.id);
        patient = {
            id: req.params.id,
            first_name: req.body.firstName,
            middle_name: req.body.middleName,
            last_name: req.body.lastName,
            contact_no: req.body.contactNo,
        }
        const updatedPatient = await updatePatient(patient);
        console.log(updatedPatient);
        res.json({redirect: `http://localhost:5173/patient/${req.params.id}`});
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function getMidWife(req, res){
    try {
        const midwife = await getMidwives();

        res.status(200).json(midwife);

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function addMidwife(req, res){
    try {
        await postMidwife(
            req.body.firstName,
            req.body.middleName,
            req.body.lastName,
            req.body.contact
        );
        
        res.status(200).redirect(`/`);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function getMidwifeDetails(req, res){
    try {
        const midwife = await getMidwifeById(req.params.id);
        if (midwife) {
            res.status(200).json(midwife);
        }
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function deleteMidwife(req, res){
    try {
        let result = await deleteMidwifeId(req.params.id)
        .then((result) => {
            res.json({ redirect: '/' });
          })
          .catch((err) => {
            console.log(err);
          })

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function updateMidwife(req, res){
    try {
        let midwife = await getMidwifeById(req.params.id);
        midwife = {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            contact_no: req.body.contact_no,
            availability: req.body.availability,
        }
        const updatedMidwife = await updateMidwifedetails(midwife);
        console.log(updatedMidwife);
        return res.redirect(`/midwife/${req.params.id}`);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}