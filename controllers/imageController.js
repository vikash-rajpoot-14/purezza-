// import cloudinary from '../cloudinary.js';
import Image from '../models/Image.js';
import { errorHandler } from '../utils/error.js';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config({path:"./config.env"});

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,  
});

export const uploadImage = async (req, res, next) => {
  try {
    const { image, password, detail } = req.body;
    console.log()
    if(!password || !detail) return next(errorHandler(400 , "please fill all required fields"))
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }
    const imageUrl = await cloudinary.uploader.upload(image, {
      upload_preset: 'purezza',
    });

    if (!imageUrl) {
      return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }

    const newImage = new Image({
      imageUrl: imageUrl.secure_url,
      password,
      details: detail,
      userId: req.user.id,
    });

    await newImage.save();
    return res.status(201).json({ message: 'Image uploaded successfully', imageUrl: imageUrl.secure_url });
  } catch (error) {
    console.error('Error in uploadImage:', error);
    next(error);
  }
};




export const getAllImage = async (req, res, next) => {
  try {
    const image = await Image.find();
    return res.status(200).json({status:"success",image});
  } catch (error) {
    next(error);
  }
};
