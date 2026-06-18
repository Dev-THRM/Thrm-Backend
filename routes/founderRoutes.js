import express from 'express';
import {getFounders, getFounderBySlug, createFounder, deleteFounder} from '../controllers/founderController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { verifytoken } from "../config/utils.js";

export const founderRouter = new express.Router();
founderRouter.get('/', getFounders)
founderRouter.get('/:slug', getFounderBySlug)
founderRouter.post('/', verifytoken, upload.single('image'), createFounder)
founderRouter.delete('/:id', verifytoken, deleteFounder)
