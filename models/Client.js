import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a client name'],
    trim: true
  },
  logoUrl: {
    type: String,
    required: [true, 'Please provide a logo URL']
  },
  websiteLink: {
    type: String,
    default: "",
    trim: true
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Client', clientSchema);