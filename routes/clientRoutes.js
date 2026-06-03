import express from 'express';
import { getClients } from '../controllers/clientController.js';

export const clientrouter = express.Router();
// Route mapping
clientrouter.get("/", getClients)