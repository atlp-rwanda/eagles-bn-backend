import models from '../database/models';
import { NewError } from '../helpers/errors';
import { imagesUpload } from '../helpers/file-uploader';

class RoomController {
  static async index(req, res) {
    const { accommodation } = req.params;
    // eslint-disable-next-line max-len
    const rooms = await models.Room.findAll({
      where: { accommodation_id: accommodation },
    });
    res.status(200).send({ data: rooms });
  }

  static async create(req, res) {
    const { accommodation } = req.params;
    const images = await imagesUpload(req);
    const room = await models.Room.create({
      ...req.body,
      accommodation_id: accommodation,
      images,
    });
    res.status(201).send({
      message: 'Room Created successfully!',
      data: room,
    });
  }

  static async show(req, res) {
    // eslint-disable-next-line max-len
    const { accommodation } = req.params;
    // eslint-disable-next-line max-len
    const room = await models.Room.findOne({
      where: {
        id: req.params.id,
        accommodation_id: accommodation,
      },
      include: models.Accommodation,
    });

    if (!room) return NewError(res, 404, 'Room not found');
    res.send({
      message: 'Room Found!',
      data: room,
    });
  }

  static async update(req, res) {
    const { accommodation } = req.params;
    const room = await models.Room.findOne({
      where: {
        id: req.params.id,
        accommodation_id: accommodation,
      },
    });

    if (!room) return NewError(res, 404, 'Room not found');
    const images = await imagesUpload(req);
    await models.Room.update(
      {
        ...req.body,
        images: images.length > 0 ? images : room.images,
      },
      { where: { id: req.params.id } }
    );
    // eslint-disable-next-line max-len
    const updatedRoom = await models.Room.findOne({
      where: { id: req.params.id },
    });
    res.send({
      message: 'Room Updated successfully!',
      data: updatedRoom,
    });
  }

  static async destroy(req, res) {
    const { accommodation } = req.params;
    const room = await models.Room.destroy({
      where: {
        id: req.params.id,
        accommodation_id: accommodation,
      },
    });
    if (!room) return NewError(res, 404, 'Room not found');
    res.send({
      message: 'Room deleted successfully!',
      data: null,
    });
  }
}

export default RoomController;
