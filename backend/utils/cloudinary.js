import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
// import exp from "constants";
dotenv.config();
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_KEY_SECRET,
});
// console.log(process.env.CLOUD_API_KEY);
// console.log(cloud_name);
export default cloudinary;

