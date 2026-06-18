import mongoose from "mongoose";

const founderSchema = new mongoose.Schema({
    slug: {
        type: String,
        required:   true,
        trim: true
    },
    name: {
        type: String,
        required: [true, "Please enter a name"],
        trim: true
    },
    title: {
        type: String,
        required: [true, "Please enter a title"],
        trim: true
    },
    company: {
        type: String,
        required: [true, "Please enter a company"],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, "Please enter an image url"]
    },
    episode: {
        type: Number,
        required: [true, "Please enter an episode number"],
        trim: true
    },
    bio: {
        type: String,
        required: [true, "Please enter a bio"],
        trim: true
    },
    instaUrl: {
        type: String,
        required: [true, "Please enter an insta URL"],
        trim: true
    },
    quote: {
        type: String,
        required: [true, "Please enter a quote"],
        trim: true
    },
    tagline: {
        type: String,
        required: [true, "Please enter a tagline"],
        trim: true
    },
    topics: {
        type: [String],
        default: []
    },
    social: {
      instagram: String,
      linkedin: String,
      twitter: String,
    },
}, {
    timestamps: true
});
    
export default mongoose.model('Founder', founderSchema);