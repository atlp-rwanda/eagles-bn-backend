import fs from "fs";
import cloudinary from "../config/cloudinary";

// eslint-disable-next-line import/prefer-default-export
export const cloudinaryUpload = async (path) => {
  const { url } = await cloudinary.upload(path);
  fs.unlinkSync(path);
  return url;
};
