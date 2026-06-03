import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    required: true
  },
  blog_id: {
    type: String,
    required:true
  }
}, { 
  timestamps: true 
});

export default mongoose.model('comment', commentSchema);