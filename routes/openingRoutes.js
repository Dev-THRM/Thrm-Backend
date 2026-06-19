import express from 'express';
import {getOpenings, getOpeningById, createOpening, editOpening, deleteOpening} from '../controllers/openingController.js';
import { verifytoken } from "../config/utils.js";

export const openingRouter = new express.Router();
openingRouter.get('/', getOpenings);
openingRouter.get('/:id', getOpeningById);
openingRouter.post('/', verifytoken, createOpening);
openingRouter.put('/:id', verifytoken, editOpening);
openingRouter.delete('/:id', verifytoken, deleteOpening);

