import mongoose, { Schema } from "mongoose";

const appuserSchema = new Schema(
    {
        name : {type:String, required:true},
        number : {type:Number, required:true, unique:true},
        email : {type:String, required:true, unique:true},
        password : {type:String, required:true}
    },
    {
        timestamps:true
    }
);

export default mongoose.model("appuser", appuserSchema);