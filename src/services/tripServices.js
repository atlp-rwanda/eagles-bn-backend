import { Trips } from '../database/models';

class TripServices {
  static async getTrips(where) {
    const trips = await Trips.findAll({ where });
    return trips;
  }
}

export default TripServices;
