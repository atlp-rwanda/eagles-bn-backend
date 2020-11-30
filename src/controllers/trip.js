/* eslint-disable linebreak-style */
/* eslint-disable import/no-cycle */
import { Op } from 'sequelize';
import {
  Trips, User, Location, Comment
} from "../database/models";
import Notifications from './notification';

const toInclude = {
  model: User,
  attributes: ['first_name', 'last_name', 'email'],
};

export default class Trip {
  static async getOne(req, res) {
    const trip = await Trips.findByPk(req.params.tripId, {
      include: [
        { ...toInclude, as: 'requester' },
        { ...toInclude, as: 'managers' },
        { model: Location, as: 'departure' },
        { model: Comment, as: 'Comments' },
      ],
    });
    if (!trip) {
      return res.status(404).json({ status: 404, message: 'Trip not found' });
    }
    if (
      trip.requester_id !== req.user.id
    ) {
      return res.status(403).json({ status: 403, message: 'Trip not yours!' });
    }
    return res.status(200).json({ status: 200, data: trip });
  }

  static async getAll(req, res) {
    const trips = await Trips.findAll({
      where: { manager_id: req.user.id },
    });
    return res.status(200).json({ status: 200, data: trips });
  }

  static async LatestRemember(req, res) {
    const { dataValues: user } = await User.findByPk(req.user.id);
    if (!user.remember_travel) return res.status(400).json({ status: 400, message: "Remember travel is OFF" });
    const latestTripValues = await Trips.findOne({
      where: { requester_id: user.id },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    if (!latestTripValues) return res.status(404).json({ status: 404, message: "No last trip available" });
    const { dataValues: latestTrip } = latestTripValues;
    const body = {
      name: latestTrip.name,
      email: latestTrip.email,
      passport: latestTrip.passport,
      id_number: latestTrip.id_number,
      gender: latestTrip.gender,
      phone: latestTrip.phone,
      marital_status: latestTrip.marital_status,
    };
    return res.status(200).json({ status: 200, data: body });
  }

  static async update(req, res) {
    const { status } = req.body;
    const { tripId } = req.params;
    if (!status) {
      const trip = await Trips.findOne({
        where: { id: tripId, requester_id: req.user.id },
      });
    }
    const trip = await Trips.findOne({
      where: { id: req.params.tripId },
    });
    if (!trip) {
      return res.status(404).json({ status: 404, error: "Trip not found!" });
    }
    await Notifications.sendNotification(trip.id, `Edited`, res);
    await trip.update(req.body);
    return res.status(200).json({ status: 200, data: trip });
  }

  static async create(req, res) {
    console.log('requester id: ', req.user);
    const trip = await Trips.create({
      ...req.body,
      manager_id: 3,
      requester_id: req.user.id,
    });
    const saveTrip = await trip.save();
    console.log('saved trip: ', saveTrip);
    await Notifications.sendNotification(saveTrip.id, 'Pending', res);
    return res.status(201).json({ status: 201, data: trip });
  }

  static async search(req, res) {
    const queries = [];
    const { id } = req.user;
    for (const by in req.query) {
      let query = req.query[by];
      if (by === 'from' || by === 'to' || by === 'requester_id') {
        query = parseInt(query, 10);
        queries.push({
          [by]: query
        });
      } else {
        queries.push({
          [by]: {
            [Op.like]: `%${query}%`
          }
        });
      }
    }
    const trips = await Trips.findAll({
      where: { [Op.and]: queries, [Op.or]: [{ requester_id: id }, { manager_id: id }], },
      include: [{ ...toInclude, as: 'managers' }, { ...toInclude, as: 'requester' }, { model: Location, as: 'departure', attributes: ['name'] }],
    });
    return res.status(200).json({ status: 200, found: trips.length, results: trips });
  }
}
