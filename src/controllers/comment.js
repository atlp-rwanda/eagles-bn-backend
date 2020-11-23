/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import models from '../database/models';
import Notifications from './notification';

export default class Comment {
  static async getAllComments(req, res) {
    const { id } = req.params;
    const { tripId } = req.params;
    const trip = await models.Trips.findOne({ where: { id } });
    const comment = await models.Comment.findOne({ where: { tripId } });
    if (!trip || !comment || id !== tripId) {
      return res.status(404).send({
        status: 404,
        error: `One of id from Trips : "${id}" or tripId from comments "${tripId}" does not exist ! OR The Trip Identification(from Trips): ${id} does not match to the specified trip Id from Comments: ${tripId}!`,
      });
    }
    return models.Comment.findAll({ where: { tripId } }).then((models) =>
      res.status(200).send(models)
    );
  }

  static async createComment(req, res) {
    const { comment } = req.body;
    const tripId = req.params.id;
    const { id } = req.user;
    const trip = await models.Trips.findOne({ where: { id: tripId } });
    if (!trip) {
      return res
        .status(404)
        .send({ message: ` Trip ID: "${tripId}" does not Exist !` });
    }
    if (trip.requester_id === id || trip.manager_id === id) {
      const saveComment = await models.Comment.create({
        userId: id,
        tripId,
        comment,
      });
      await Notifications.sendNotification(`${saveComment.tripId}`, `Commented by ${req.user.role}`, res);
      return res.status(201).send({
        saveComment,
        message: `You Successfully commented on ${tripId}`,
      });
    }
    return res.status(400).send({
      message: ` Please check well, the Trip Id : " ${tripId} "does not belong to you!!!`,
    });
  }

  static async deleteComment(req, res) {
    const { tripId, id } = req.params;

    const { id: userId } = req.user;
    return models.Comment.destroy({ where: { tripId, id, userId } }).then(
      (num) => {
        if (num === 1) {
          res.status(200).send({
            message: `You Successfully Deleted comment with id=${id}`,
          });
        } else {
          res.status(404).send({
            Error: `You can't delete this comment. Maybe Not Found in Database`,
          });
        }
      }
    );
  }
}
