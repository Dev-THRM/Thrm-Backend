import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
    {
        name : {type:String, required:true},
        password : {type:String, required:true}
    },
    {
        timestamps:true
    }
);
export default mongoose.model("admin", adminSchema);