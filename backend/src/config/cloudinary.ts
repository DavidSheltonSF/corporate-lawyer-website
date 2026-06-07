import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from 'dotenv';
configDotenv();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (!cloud_name) {
  throw Error('Missing cloud name');
}

if (!api_key) {
  throw Error('Missing api key');
}

if (!api_secret) {
  throw Error('Missing api secret');
}

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export default cloudinary;
