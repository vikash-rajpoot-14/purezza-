import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
    },
    userId:{
      type: String,
      required: true,
    },
    imageUrl: {
      type: Object,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', ImageSchema);

export default Image;
