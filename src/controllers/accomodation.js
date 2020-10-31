import models from '../database/models';
import { NewError } from '../helpers/errors';
import { cloudinaryUpload } from '../helpers/cloudinary-upload';
import { imagesUpload } from '../helpers/file-uploader';

class Accommodation {
  static async index(req, res) {
    try {
      const accommodations = await models.Accommodation.findAll({ include: models.Location });
      res.status(200)
        .send({ data: accommodations });
    } catch (e) {
      return NewError(res, 500, 'Server error');
    }
  }

  static async create(req, res) {
    try {
      const host_id = req.user.id;
      if (!req.files || req.files.length <= 0 || req.files.length > 3) return NewError(res, 400, 'Invalid images');
      const images = await imagesUpload(req);
      const accommodation = await models.Accommodation.create({
        ...req.body,
        host_id,
        images
      });
      res.status(201)
        .send({
          message: 'Accommodation Created successfully!',
          data: accommodation
        });
    } catch (e) {
      return NewError(res, 500, 'Server error');
    }
  }

  static async show(req, res) {
    try {
      // eslint-disable-next-line max-len
      const accommodation = await models.Accommodation.findOne({
        where: { id: req.params.id },
        include: [{ model: models.Location }, { model: models.Room, as: "rooms" }]
      });

      if (!accommodation) return NewError(res, 404, 'Accommodation not found');
      res.send({
        message: 'Accommodation Found!',
        data: accommodation
      });
    } catch (e) {
      return NewError(res, 500, 'Server error');
    }
  }

  static async update(req, res) {
    try {
      const accommodation = await models.Accommodation.findOne({ where: { id: req.params.id } });

      if (!accommodation) return NewError(res, 404, 'Accommodation not found');
      const images = await imagesUpload(req);
      await models.Accommodation.update({
        ...req.body,
        images: images.length > 0 ? images : accommodation.images
      }, { where: { id: req.params.id } });
      // eslint-disable-next-line max-len
      const updatedAccommodation = await models.Accommodation.findOne({ where: { id: req.params.id } });
      res.send({
        message: 'Accommodation Updated successfully!',
        data: updatedAccommodation
      });
    } catch (e) {
      return NewError(res, 500, 'Server error');
    }
  }

  static async destroy(req, res) {
    try {
      const accommodation = await models.Accommodation.destroy({ where: { id: req.params.id } });
      if (!accommodation) return NewError(res, 404, 'Accommodation not found');
      res.send({
        message: 'Accommodation deleted successfully!',
        data: null
      });
    } catch (e) {
      return NewError(res, 500, 'Server error');
    }
  }
}

export default Accommodation;
