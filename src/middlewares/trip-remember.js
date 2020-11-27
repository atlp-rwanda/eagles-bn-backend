import { Trips, User } from '../database/models';

const tripRemember = async (req, res, next) => {
  const { dataValues: user } = await User.findByPk(req.user.id);
  if (user.remember_travel) {
    const latestTripValues = await Trips.findOne({
      where: { requester_id: user.id },
      order: [['createdAt', 'DESC']]
    });
    if (latestTripValues) {
      const { dataValues: latestTrip } = latestTripValues;
      req.body = {
        ...req.body,
        name: latestTrip.name,
        email: latestTrip.email,
        passport: latestTrip.passport,
        id_number: latestTrip.id_number,
        gender: latestTrip.gender,
        phone: latestTrip.phone,
        marital_status: latestTrip.marital_status,
      };
    }
  }
  next();
};
export default tripRemember;
