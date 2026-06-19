import req from "express/lib/request.js";
import Founder from "../models/Founder.js";


export const getFounders = async(req, res) => {
    try{
        const founders = await Founder.find();

        res.status(200).json({success: true, count: founders.length, data: founders});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
};

export const getFounderBySlug = async(req, res) =>{
    try{
        const founder = await Founder.findOne({slug: req.params.slug});

        if(!founder){
            return res.status(404).json({success: false, error: 'Founder not found'});
        }

        res.status(200).json({success: true, data: founder});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
};

export const getFounderById = async(req, res) =>{
    try{
        const founder = await Founder.findById(req.params.id);

        if(!founder){
            return res.status(404).json({success: false, error: 'Founder not found'});
        }

        res.status(200).json({success: true, data: founder});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
};

export const createFounder = async(req, res)=>{
    try{
        const { slug, name, title, company, episode, bio, instaUrl, quote, social } = req.body;

        // Check required fields
        if (!slug || !name || !title || !company || !episode || !bio || !instaUrl || !quote) {
            return res.status(400).json({
                success: false,
                error: 'Please provide all required fields: slug, name, title, company, episode, bio, instaUrl, quote.'
            });
        }

        // Check required image file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Please upload an image file for the founder.'
            });
        }

        let socialData = social;
        if (typeof social === 'string') {
            try {
                socialData = JSON.parse(social);
            } catch (e) {
                // Ignore JSON parsing errors
            }
        }

        const founder = await Founder.create({
            slug,
            name,
            title,
            company,
            imageUrl: req.file.path,
            episode: Number(episode),
            bio,
            instaUrl,
            quote,
            social: socialData
        });

        res.status(201).json({success: true, data: founder});
    }catch(error){
        console.error("Create Founder Error:", error);
        res.status(500).json({success: false, error: 'Server Error'});
    }
};

export const editFounder = async(req, res)=>{
    try{
        const founder = await Founder.findById(req.params.id);

        if(!founder){
            return res.status(404).json({success: false, error: 'Founder not found'});
        }

        const { slug, name, title, company, episode, bio, instaUrl, quote, social } = req.body;

        if(slug) founder.slug = slug;
        if(name) founder.name = name;
        if(title) founder.title = title;
        if(company) founder.company = company;
        if(episode) founder.episode = Number(episode);
        if(bio) founder.bio = bio;
        if(instaUrl) founder.instaUrl = instaUrl;
        if(quote) founder.quote = quote;

        if (req.file) {
            founder.imageUrl = req.file.path;
        }

        if (social) {
            let socialData = social;
            if (typeof social === 'string') {
                try {
                    socialData = JSON.parse(social);
                } catch (e) {
                    // Ignore JSON parsing errors
                }
            }
            founder.social = socialData;
        }

        await founder.save();

        res.status(200).json({success: true, data: founder});
    }catch(error){
        console.error("Edit Founder Error:", error);
        res.status(500).json({success: false, error: 'Server Error'});
    }
};
export const deleteFounder = async(req, res)=>{
    try{
        const founder = await Founder.findByIdAndDelete(req.params.id);

        if(!founder){
            return res.status(404).json({success: false, error: 'Founder not found'});
        }

        res.status(200).json({success: true, data: {}});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
};