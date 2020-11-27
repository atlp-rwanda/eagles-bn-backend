import { onError } from "../utils/response";
import { Booking as roomBooking } from '../database/models/index';
import models from '../database/models';
// import { onError, onSuccess } from '../utils/response';

export default class bookibg {
    static async isAccommodationOwner(req, res, next) {
      try{
        const  {book_id}  = req.params;
        const  userId  = req.user.id;
        const booking = await models.Booking.findOne({
          where: { id: book_id,}
      })
      if (!booking)return onError(res, 404, 'Booking not found');
      
      const room= await models.Room.findOne({ where: {id: booking.room_id }});
      if (!room) return onError(res, 404, 'Room not found');
      const accommodationId=room.accommodation_id
      const accommodation= await models.Accommodation.findOne({
        where:{id:accommodationId}
      })
      
      if (!accommodation) return onError(res, 404, `Accommodation not found`);
      if(userId != accommodation.host_id)return onError(res, 400, 'Access denied,you are not the owner of the Accommodation');
      next();
    }
    catch (error) {

      console.log('+++++++++++++++++++++ ',error)
      return onError(res, 500, 'internal server error');
    }
  }
        
   
}