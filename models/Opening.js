import mongoose from "mongoose";

const openingSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true,
        default: "Onsite (Kalyan)"
    },
    type: {
        type: String,
        required: true,  
    },
    experience: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Opening', openingSchema);