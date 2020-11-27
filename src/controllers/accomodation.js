import models from '../database/models';
import { NewError } from '../helpers/errors';
import { imagesUpload } from '../helpers/file-uploader';

class Accommodation {
  static async index(req, res) {
    const accommodations = await models.Accommodation.findAll({
      include: models.Location,
    });
    res.status(200).send({ data: accommodations });
  }

  static async create(req, res) {
    const host_id = req.user.id;
    if (!req.files || req.files.length <= 0 || req.files.length > 3) return NewError(res, 400, 'Invalid images');
    const images = await imagesUpload(req);
    const accommodation = await models.Accommodation.create({
      ...req.body,
      host_id,
      images,
    });
    res.status(201).send({
      message: 'Accommodation Created successfully!',
      data: accommodation,
    });
  }

  static async show(req, res) {
    // eslint-disable-next-line max-len
    const accommodation = await models.Accommodation.findOne({
      where: { id: req.params.id },
      include: [
        { model: models.Location },
        { model: models.Room, as: 'rooms' },
      ],
    });

    if (!accommodation) return NewError(res, 404, 'Accommodation not found');
    res.send({
      message: 'Accommodation Found!',
      data: accommodation,
    });
  }

  static async update(req, res) {
    const accommodation = await models.Accommodation.findOne({
      where: { id: req.params.id },
    });

    if (!accommodation) return NewError(res, 404, 'Accommodation not found');
    const images = await imagesUpload(req);
    await models.Accommodation.update(
      {
        ...req.body,
        images: images.length > 0 ? images : accommodation.images,
      },
      { where: { id: req.params.id } }
    );
    // eslint-disable-next-line max-len
    const updatedAccommodation = await models.Accommodation.findOne({
      where: { id: req.params.id },
    });
    res.send({
      message: 'Accommodation Updated successfully!',
      data: updatedAccommodation,
    });
  }

  static async destroy(req, res) {
    const accommodation = await models.Accommodation.destroy({
      where: { id: req.params.id },
    });
    if (!accommodation) return NewError(res, 404, 'Accommodation not found');
    res.send({
      message: 'Accommodation deleted successfully!',
      data: null,
    });
  }

  static async like(req, res) {
    try {
      const accommodationId = req.params.id;
      const { id } = req.user;
      const accommodation = await models.Accommodation.findOne({ where: { id: accommodationId } });
      if (!accommodation) {
        return res
          .status(404)
          .send({ message: ` Accommodation of ID "${accommodationId}" does not Exist !` });
      }
      const likeExist = await models.Like.findOne({ where: { userId: id, accommodationId } });
      if (likeExist) {
        await likeExist.destroy();
        return res.status(201).send({
          message: `You unliked an accommodation of ID  ${accommodationId}`,
        });
      }
      const savelike = await models.Like.create({
        userId: id,
        accommodationId,
      });
      return res.status(201).send({
        message: `You liked an accommodation of ID  ${accommodationId}`,
        data: savelike,
      });
    } catch (err) {
      return NewError(res, 500, 'Server error');
    }
  }

  static async feedback(req, res) {
    try {
      const accommodationId = req.params.id;
      const { feedback } = req.body;
      const { id } = req.user;
      const accommodation = await models.Accommodation.findOne({ where: { id: accommodationId } });
      if (!accommodation) {
        return res
          .status(404)
          .send({ message: ` Accommodation of ID "${accommodationId}" does not Exist !` });
      }
      const relatedRooms = await models.Room.findAll({
        where: { accommodation_id: accommodationId }
      });
      if (!relatedRooms) {
        return res
          .status(404)
          .send({ message: ` The Entered Accommodation doesn't have rooms!` });
      }

      const relatedTrips = await models.Trips.findAll({
        where: { requester_id: id }
      });
      if (relatedTrips) {
        for (let i = 0; i < relatedTrips.length; i++) {
          if (relatedTrips[i].status != "Approved") {
            return res
              .status(404)
              .send({ message: `Your trip has to be approved first` });
          }
          if (relatedTrips[i].accommodation_id == accommodationId) {
            const savefeedback = await models.Feedback.create({
              userId: id,
              accommodationId,
              feedback
            });
            return res.status(201).send({
              message: `You commented on accommodation of ID  ${accommodationId}`,
              data: savefeedback,
            });
          }
          return res
            .status(404)
            .send({ message: `Accommodation entered is different from the one on your trip` });
        }
      }
      return res.status(403).send({
        message: `To Comment On an Accommodation, you have to trip with us first`,
      });
    } catch (err) {
      return NewError(res, 500, 'Server error');
    }
  }
}
export default Accommodation;
