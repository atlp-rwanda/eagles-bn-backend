import multer from "multer";
import Joi from 'joi'
import { cloudinaryUpload } from './cloudinary-upload';

export const imagesUpload = async (req) => {
  const images = [];
  if (req.files && req.files.length > 0 && req.files.length <= 3) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.files.length; i++) {
      const { path } = req.files[i];
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
