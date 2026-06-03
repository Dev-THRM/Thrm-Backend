// -------------------- imports --------------------
import appuser from "../models/appuser.js";
import admin from "../models/admin.js"
import jwt from "jsonwebtoken";
import fs from "fs";

// -------------------- sign token function --------------------
export const signtoken =  async(id, email) =>{
 const pvkey = fs.readFileSync("./private.key", "utf-8");
 const payload = {
    UID : id,
    UE : email
 }
 const algo = {
    algorithm : "RS256",
    expiresIn : "7d"
 }
 const token = jwt.sign(payload,pvkey,algo);
 return token;
}

// -------------------- verify Token function --------------------
export const verifytoken = async(req, res, next) => {
    try {
    // -------------------- variable declerations --------------------
    let user
    const token = req.cookies?.AccessToken;
    const pbkey = fs.readFileSync("./public.key", "utf-8");
    const algo = {
        algorithms : ["RS256"]
    };

    // -------------------- token check --------------------
    if(!token) {
        res.status(400).json("invalid token sign up again")
        return;
    }
    const decoded = jwt.verify(
        token,
        pbkey,
        algo
    );

    // -------------------- data initalization --------------------
    user = await admin.findOne({_id:decoded.UID}); //admin chech
    if(user){
        req.user = {
            UID : user._id,
            role : "admin"
        };
        return next();
    }
    // -------------------------------------------------------------
    user = await appuser.findOne({_id:decoded.UID}); //client check
    if(user){
        req.user = {
            UID : user._id,
            role : "nuser"
        };
        return next();
    }
    res.status(400).json("invalid token");
    return;
} catch (e) {

    if (
        e.name === "JsonWebTokenError" ||
        e.name === "TokenExpiredError"
    ) {

        return res.status(401).json(
            "token is invalid or expired"
        );

    }

    return res.status(500).json(
        "server error"
    );

}
};