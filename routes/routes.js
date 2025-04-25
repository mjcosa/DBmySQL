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

export async function getPatient(req, res){
    try {
        const patient = await getPatients();

        return res.render('../views/index', {title: 'All Patients', patient})

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function addPatientPage(req, res){
    try {
        return res.render('../views/add', {title: 'Add a Patient'});
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function addPatient(req, res){
    try {
        await postPatient(
            req.body.firstName,
            req.body.middleName,
            req.body.lastName,
            req.body.contact
        );
        
        return res.status(200).redirect(`/`);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function getPatientDetails(req, res){
    try {
        const patient = await getPatientbyID(req.params.id);
        if (patient) {
            return res.render(`../views/details`, {title: "Patient Info", patient});
        }
    } catch (err) {
        console.error(err);
        return res.status(500);
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

export async function redirectEditPage(req, res){
    try {
        const patient = await getPatientbyID(req.params.id)
        console.log(patient);
        return res.render(`../views/edit`, {title: "Patient Info", patient});
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
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            contact_no: req.body.contact_no,
        }
        const updatedPatient = await updatePatient(patient);
        console.log(updatedPatient);
        return res.redirect(`/patient/${req.params.id}`);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function getMidWife(req, res){
    try {
        const patient = await getMidwives();
        return res.render('../views/index', {title: 'All Midwives', patient})

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function addMidwifePage(req, res){
    try {
        return res.render('../views/add', {title: 'Add Midwife'});
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
        
        return res.status(200).redirect(`/`);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function getMidwifeDetails(req, res){
    try {
        const midwife = await getMidwifeById(req.params.id);
        if (midwife) {
            return res.render(`../views/details`, {title: "Midwife Info", midwife});
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

export async function redirectEditMidwifePage(req, res){
    try {
        const patient = await getMidwifeById(req.params.id)
        console.log(patient);
        return res.render(`../views/edit`, {title: "Midwife Info", patient});
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}

export async function updateMidwife(req, res){
    try {
        let patient = await getMidwifeById(req.params.id);
        patient = {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            contact_no: req.body.contact_no,
            availability: req.body.availability,
        }
        const updatedPatient = await updateMidwifedetails(patient);
        console.log(updatedPatient);
        return res.redirect(`/midwife/${req.params.id}`);
    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}