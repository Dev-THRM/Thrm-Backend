import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  status: {
    type: Boolean,
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

export default mongoose.model('Like', likeSchema);