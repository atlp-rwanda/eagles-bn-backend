import multer from "multer";
import { cloudinaryUpload } from './cloudinary-upload';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'storage/');
  },
  filename(req, file, cb) {
    const rand = Math.random().toString(36).substring(7);
    cb(null, rand + file.originalname);
  }
});
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
export const upload = multer({ storage });
