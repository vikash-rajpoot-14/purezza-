import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { getAllImage, uploadImage } from '../controllers/imageController.js';


const router = express.Router();


router.post('/upload',verifyToken, uploadImage);
router.get('/', getAllImage);

export default router;
