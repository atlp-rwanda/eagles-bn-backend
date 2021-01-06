import multer from "multer";
import Joi from 'joi';
import { cloudinaryUpload } from './cloudinary-upload';

export const imagesUpload = async (req) => {
  const images = [];
  if (!Array.isArray(req.files.images)) {
    console.log("Not array")
    req.files.images = [req.files.images];

  }
  if (req.files && req.files.images && req.files.images.length > 0 && req.files.images.length <= 3) {
    console.log("Images: ", req.files.images);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.files.images.length; i++) {
      const { path } = req.files.images[i];
      // eslint-disable-next-line no-await-in-loop
      images.push(await cloudinaryUpload(path));
    }
  }
  return images;
};
// eslint-disable-next-line import/prefer-default-export

export const roleEntryValidation = Joi.object({
  role: Joi.string().valid('requester', 'manager', 'admin').required(),
})
