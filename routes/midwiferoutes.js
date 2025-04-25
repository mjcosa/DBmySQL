import express from "express";
export const midwifeRouter = express.Router();
import {
    getMidWife,
    addMidwifePage,
    addMidwife,
    getMidwifeDetails,
    deleteMidwife,
    redirectEditMidwifePage,
    updateMidwife,
} from "./routes.js";

midwifeRouter.get('/', getMidWife);

midwifeRouter.get('/add', addMidwifePage);

midwifeRouter.post('/add', addMidwife);

midwifeRouter.get('/:id', getMidwifeDetails);

midwifeRouter.delete('/delete/:id', deleteMidwife);

midwifeRouter.get('/edit/:id', redirectEditMidwifePage);

midwifeRouter.post('/edit/:id', updateMidwife);
