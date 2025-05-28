import express from "express";
export const midwifeRouter = express.Router();
import {
    getMidWife,
    addMidwife,
    getMidwifeDetails,
    deleteMidwife,
    updateMidwife,
} from "./routes.js";

midwifeRouter.get('/', getMidWife);

midwifeRouter.post('/add', addMidwife);

midwifeRouter.get('/:id', getMidwifeDetails);

midwifeRouter.delete('/delete/:id', deleteMidwife);

midwifeRouter.post('/edit/:id', updateMidwife);
