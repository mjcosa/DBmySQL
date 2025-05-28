import express from "express";
export const appointmentRouter = express.Router();

import {
    submitAppointment,
    displayAppointments,
    displayAppointmentById,
    editAppointment,
    deleteAppointment,
} from "../controllers/appointmentController.js";

appointmentRouter.post("/", submitAppointment);

appointmentRouter.get("/view", displayAppointments);

appointmentRouter.get("/view/:id", displayAppointmentById);

appointmentRouter.put("/edit/:id", editAppointment);

appointmentRouter.delete("/delete/:id", deleteAppointment);