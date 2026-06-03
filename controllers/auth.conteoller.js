// ------------------------------------ imports ------------------------------------
import admin from "../models/admin.js";
import appuser from "../models/appuser.js";
import {signtoken} from "../config/utils.js";
import { maxHeaderSize } from "http";

//  ------------------------------------ sing up function ------------------------------------
export const signup = async (req, res) => {
    try {
    const {name, email, number, password} = req.body;
    if(!name || !email || !number || !password) {
        res.status(400).json("some or all fields aren't provided");
        return;
    }
    const User = new appuser({name, number, email, password}); // Note the 'new' keyword
    await User.save(); // Await the save process
    res.status(200).json("redirection/login");
    return;
    } catch (e) {
        res.status(400).json(e);
        return;
    }
};

//  ------------------------------------ login function ------------------------------------
export const login = async(req, res) => {
    const { name, password } = req.body;

    if(!name || !password) {
        return res.status(400).json("either name or password is not correct");
    }
    
    let user = await admin.findOne({name, password});
    if(user) {
        // === FIX: ADDED AWAIT HERE ===
        const token = await signtoken(user._id, user.name); 
        
        return res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "Lax",
            maxAge: 7*24*60*60*1000
        }).json({ name: user.name, role: "admin" }); // Return object for React Context
    }
    
    user = await appuser.findOne({name, password});
    if(user) {
        // === FIX: ADDED AWAIT HERE ===
        const token = await signtoken(user._id, user.name); 
        
        return res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 7*24*60*60*1000
        }).json({ name: user.name, role: "nuser" }); // Return object for React Context
    }
    
    return res.status(401).json("Invalid credentials");
};



//  ------------------------------------ session data function ------------------------------------
export const SessionData = async (req, res) => {
    const user = req.user; // Appended by verifytoken middleware
    if (!user) {
        return res.status(401).json("no valid session found");
    }
    // Return the user object so the frontend context can hydrate
    return res.status(200).json(user); 
}

//  ------------------------------------ login function ------------------------------------
export const logout = async(req, res) => {
    try {
        return res.clearCookie(
        "AccessToken",
        {
            httpOnly: true,
            secure: false,
            samesite: "Lax"
        }
    ).json("logout successful");
    } catch (e) {
        res.json("error occored on server side");
    };
};