import like from "../models/like.js";
import comment from "../models/comment.js";
import Client from "../models/Client.js";

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public

// ---------------------- get client function ----------------------
export const getClients = async (req, res) => {
  try {
    // Fetch all clients, newest first
    const clients = await Client.find().sort({ createdAt: -1 }); 
    
    res.status(200).json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ success: false, error: 'Server Error while fetching clients' });
  }
};

// export const Likesfunction = async(req, res) => {
//     const { like, client_id, blog_id } = req.body;
//     if(!like) {
//         res.status(400).json({"message":"no data provided"})
//     }
//     const likes = await like.findOn
// };