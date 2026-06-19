import express from 'express';
import {getFounders, getFounderBySlug, getFounderById, createFounder, deleteFounder, editFounder} from '../controllers/founderController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { verifytoken } from "../config/utils.js";

export const founderRouter = new express.Router();
founderRouter.get('/', getFounders)
founderRouter.get('/:slug', getFounderBySlug)
founderRouter.get('/id/:id', getFounderById)
founderRouter.post('/', verifytoken, upload.single('image'), createFounder)
founderRouter.put('/:id', verifytoken, upload.single('image'), editFounder)
founderRouter.delete('/:id', verifytoken, deleteFounder)
