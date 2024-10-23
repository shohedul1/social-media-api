import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();



cloudinary.config({
    cloud_name: process.env.CLOUDINART_NAME,
    api_key: process.env.CLOUDINART_API_KEY,
    api_secret: process.env.CLOUDINART_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: 'your-folder-name', // Optional: specify a folder name in Cloudinary
            resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
        };
    },
});

// Initialize multer with the Cloudinary storage
const upload = multer({ storage: storage });

export default upload;
