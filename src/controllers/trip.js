import { Trip as _trip, User } from "../database/models";

const toInclude = {
  model: User,
  attributes: ["first_name", "last_name", "email"],
};

export default class Trip {
  static async getOne(req, res) {
    const trip = await _trip.findByPk(req.params.tripId, {
      include: [
        { ...toInclude, as: "requester" },
        { ...toInclude, as: "manager" },
      ],
    });
    if (!trip) {
      return res.status(404).json({ status: 404, message: "Trip not found" });
    }
    if (
      trip.requester_id !== req.user.id
      // || trip.manager_id !== req.user.manager_id
    ) {
      return res.status(403).json({ status: 403, message: "Trip not yours!" });
    }
    return res.status(200).json({ status: 200, data: trip });
  }

  static async getAll(req, res) {
    // if (req.user.role !== "manager") {
    //   return res
    //     .status(403)
    //     .json({ status: 403, error: "unauthorized to check all trips" });
    // }

    const trips = await _trip.findAll({
      where: { manager_id: req.user.id },
    });

    return res.status(200).json({ status: 200, data: trips });
  }

  static async update(req, res) {
    const trip = await _trip.findOne({
      where: { id: req.params.tripId, requester_id: req.user.id },
    });
    if (!trip) {
      return res.status(404).json({ status: 404, error: "Trip not found!" });
    }

    await trip.update(req.body);

    return res.status(200).json({ status: 200, data: trip });
  }

  static async create(req, res) {
    // console.log(req.user, "####");÷
    const trip = await _trip.create({
      ...req.body,
      manager_id: 1,
      requester_id: req.user.id,
    });
    return res.status(201).json({ status: 201, data: trip });
  }
}
