import express from "express";
export const appointmentRouter = express.Router();

import {
    renderScheduleForm,
    submitAppointment,
    displayAppointments,
    displayAppointmentById,
    renderEditForm,
    editAppointment,
    deleteAppointment,
} from "../controllers/appointmentController.js";

appointmentRouter.get("/schedule_appointment", renderScheduleForm);

appointmentRouter.post("/", submitAppointment);

appointmentRouter.get("/view", displayAppointments);

appointmentRouter.get("/view/:id", displayAppointmentById);

appointmentRouter.get("/edit/:id", renderEditForm);

appointmentRouter.put("/edit/:id", editAppointment);

appointmentRouter.delete("/delete/:id", deleteAppointment);