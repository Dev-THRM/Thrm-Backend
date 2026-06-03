import admin from "./models/admin.js";
import { connectDB } from "./config/db.js";

connectDB();
const createadmIn = async(req, res) => {
    const addadmin = admin({name:"THRM", password: "appuser1234"})
    addadmin.save();
    console.log(addadmin);
}
createadmIn();