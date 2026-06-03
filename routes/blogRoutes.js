import express from 'express';
import { getBlogs, getBlogById } from '../controllers/blogController.js';

export const blogrouter = express.Router();
blogrouter.get("/",getBlogs)
blogrouter.get("/:id",getBlogById);