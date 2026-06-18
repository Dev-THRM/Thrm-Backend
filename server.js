import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // <-- IMPORT THIS
import { connectDB } from './config/db.js';
import { blogrouter } from "./routes/blogRoutes.js";
import { clientrouter } from "./routes/clientRoutes.js";
import { adminrouter } from "./routes/adminRoutes.js";
import { socialRouter } from "./routes/socialRoutes.js";

dotenv.config();
connectDB();

const app = express();

// --- CRITICAL FIX 1: CORS must explicitly allow your frontend URL and credentials ---
const allowedOrigins = [
    "https://thrmdigitalmarketing.in",
    "https://www.thrmdigitalmarketing.in"
];

// Only allow localhost/127.0.0.1 on port 5173 in development mode
if (process.env.NODE_ENV !== "production") {
    allowedOrigins.push("http://localhost:5173");
    allowedOrigins.push("http://127.0.0.1:5173");
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    },
    credentials: true // Allows cookies to be sent back and forth
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CRITICAL FIX 2: Initialize Cookie Parser ---
app.use(cookieParser());

// Mount Routes
app.use('/api/clients', clientrouter);
app.use('/api/blogs', blogrouter);
app.use('/api/admin', adminrouter); // --- CRITICAL FIX 3: Added the missing '/'

app.use('/api/socal', socialRouter);

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'API Endpoint Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});