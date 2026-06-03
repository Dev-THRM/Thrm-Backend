import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true
  },
  content: {
    type: String, // This will store the HTML from the Rich Text Editor
    required: [true, 'Please add blog content']
  },
  imageUrl: {
    type: String, // From Cloudinary
    required: [true, 'Please provide a featured image']
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Blog', blogSchema);