import Opening from "../models/Opening.js";

export const getOpenings = async(req, res)=>{
    try{
        const openings = await Opening.find();
        res.status(200).json({success: true, data: openings});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
}

export const createOpening = async(req, res) =>{
    try{
        const {title, location, type, experience} = req.body;
        if(!title || !type || !experience){
            return res.status(400).json({success: false, error: 'Please provide all required fields'});
        }
        const opening = await Opening.create(req.body);
        res.status(201).json({success: true, data: opening});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
}

export const editOpening = async(req, res) =>{
    try{
        const opening = await Opening.findById(req.params.id);
        if(!opening){
            return res.status(404).json({success: false, error: 'Opening not found'});
        }
        const {title, location, type, experience} = req.body;
        if(title) opening.title = title;
        if(location) opening.location = location;
        if(type) opening.type = type;
        if(experience) opening.experience = experience;
        await opening.save();
        res.status(200).json({success: true, data: opening});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
}

export const getOpeningById = async (req, res) => {
    try{
        const opening = await Opening.findById(req.params.id);

        if(!opening){
            return res.status(400).json({success: false, error: 'Opening Not Found!'});
        }
        return res.status(200).json({success: true, data: opening});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
}

export const deleteOpening = async(req, res) => {
    try{
        const opening = await Opening.findByIdAndDelete(req.params.id);

        if(!opening) {
            return res.status(404).json({success: false, error: 'Opening not found'});
        }
        res.status(200).json({success: true, data: {}});
    }catch(error){
        res.status(500).json({success: false, error: 'Server Error'});
    }
}