import fs from "fs";
import cloudinary from "../config/cloudinary";

// eslint-disable-next-line import/prefer-default-export
export const cloudinaryUpload = async (path) => {
  const uniqueFilename = new Date().toISOString();
  const { url } = await cloudinary.upload(path, {
    public_id: `nomad/${uniqueFilename}`,
    tags: "nomad"
  });
  fs.unlinkSync(path);
  return url;
};
