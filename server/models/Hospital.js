import mongoose from 'mongoose';

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/400x200?text=Hospital+Image'
  },
  specialities: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  details: {
    description: {
      type: String,
      default: ''
    },
    images: {
      type: [String],
      default: []
    },
    numberOfDoctors: {
      type: Number,
      default: 0
    },
    numberOfDepartments: {
      type: Number,
      default: 0
    }
  }
}, { timestamps: true });

const Hospital = mongoose.model('Hospital', hospitalSchema);

export default Hospital;
