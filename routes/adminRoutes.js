import express from "express";
import { createBlog, editBlog, deleteClient, deleteblog, addClient, editClient } from "../controllers/adminController.js";
import { upload } from '../middleware/uploadMiddleware.js';
import { verifytoken } from "../config/utils.js";
import { login, logout, SessionData } from "../controllers/auth.conteoller.js"; // Fix typo in filename if needed

export const adminrouter = express.Router();

adminrouter.post("/b", verifytoken, upload.single('image'), createBlog);
adminrouter.post("/edit/editBlogs/:id", verifytoken, upload.single('image'), editBlog);
adminrouter.post("/deleteBlogs/:id", verifytoken, deleteblog);

adminrouter.post("/c", verifytoken, upload.single('logo'), addClient); // Don't forget to protect client uploads too!
adminrouter.post("/edit/editClients/:id", verifytoken, upload.single('logo'), editClient);
adminrouter.post("/deleteClients/:id", verifytoken, deleteClient);

adminrouter.post("/login", login);
adminrouter.post("/logout", verifytoken, logout);

// --- CRITICAL FIX: The frontend checks this route on every reload ---
adminrouter.get("/Session", verifytoken, SessionData);