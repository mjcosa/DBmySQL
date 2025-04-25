import { db } from "../models/database.js";

export const toNull = (val) => (val === '' || val === undefined ? null : val);

export const renderScheduleForm = (req, res) => {
    res.render("../views/schedule", { title: "Schedule Appointment" });
};

export const submitAppointment = async (req, res) => {
    const { concern, appointment_date, contact_no, patient_id, labresults_id, midwife_id } = req.body;

    const safePatient_id = toNull(patient_id);
    const safelab_id = toNull(labresults_id);
    const safeMidwife_id = toNull(midwife_id);
    try {
        const [result] = await db.execute(
            `INSERT INTO appointment (concern, appointment_date, contact_no, patient_id, labresults_id, midwife_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [concern, appointment_date, contact_no, safePatient_id, safelab_id, safeMidwife_id || null]
        );

        return res.redirect("/schedule/view"); // or redirect to a confirmation page
    } catch (error) {
        console.error("Error inserting appointment:", error);
        res.status(500).send("Error scheduling appointment.");
    }
};

export const displayAppointments = async (req, res) => {
    try {
        const [rows] = await db.execute(`SELECT * FROM appointment`);
        console.log(rows);
        return res.render("../views/appointments", { title: "Appointments", appointment: rows }); // or redirect to a confirmation page
    } catch (error) {
        console.error("Error inserting appointment:", error);
        res.status(500).send("Error scheduling appointment.");
    }
}

export const displayAppointmentById = async (req, res) => {
    try {
        const [result] = await db.execute(
            `SELECT * FROM appointment WHERE appointment_no = ?`,
            [req.params.id]
        );
        const appointment = result[0];
        return res.render("../views/appointmentDetails", { title: "Appointment Details", appointment }); // or redirect to a confirmation page
    } catch (error) {
        console.error("Error inserting appointment:", error);
        res.status(500).send("Error scheduling appointment.");
    }
}

export const renderEditForm = async (req, res) => {
    try {
        const [result] = await db.execute(
            `SELECT * FROM appointment WHERE appointment_no = ?`,
            [req.params.id]
        );
        const appointment = result[0];
        return res.render("../views/appointmentEdit", { title: "Appointment Details", appointment }); // or redirect to a confirmation page
    } catch (error) {
    }
};

export const editAppointment = async (req, res) => {
    const {appointment_no, concern, appointment_date, amount_due, contact_no, patient_id, labresults_id, midwife_id } = req.body;
    const safeAmount_due = toNull(amount_due);
    const safePatient_id = toNull(patient_id);
    const safelab_id = toNull(labresults_id);
    const safeMidwife_id = toNull(midwife_id);

    try {
        console.log(req.body);
        const [rows] = await db.execute(`update appointment set concern = ?, appointment_date = ?, amount_due = ?, contact_no = ?, patient_id = ?, labresults_id = ?, midwife_id = ? where appointment_no = ?`, 
            [concern, appointment_date, safeAmount_due, contact_no, safePatient_id, safelab_id, safeMidwife_id, appointment_no || null]
        );
        const data = rows[0];
        return res.redirect(`/schedule/view/${data.appointment_no}`); // or redirect to a confirmation page
    }
    catch(error) {
        console.error("Error updating appointment:", error);
        res.status(500).send("Error scheduling appointment.");
    }
}

export async function deleteAppointment(req, res){
    try {
        const result = await db.execute(`delete from appointment where appointment_no = ?`, [req.params.id])
        .then((result) => {
            res.json({ redirect: '/schedule/view' });
          })
          .catch((err) => {
            console.log(err);
          })

    } catch (err) {
        console.error(err);
        return res.status(500);
    }
}