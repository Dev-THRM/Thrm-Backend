import express from 'express';
export const socialRouter = express.Router();

socialRouter.get('/instagram', async (req, res) => {
  try {
    // Hide the token in your backend .env file!
    const token = process.env.INSTAGRAM_ACCESS_TOKEN; 
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${token}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Instagram feed" });
  }
});