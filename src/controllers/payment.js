
import { onError, onSuccess } from '../utils/response';
import {flutterPayment} from '../helpers/payment'
import models from '../database/models';
export default class RoombookingPayment {
  

    static async makePayment(req,res) {
        const  book_id  = req.params.id;
        const {email} = req.user;
        const {phone_number,name}=req.body
        const booking = await models.Booking.findOne({
            where: { id: book_id,}
        })
        if(!booking) return onError(res, 400,`Booking doesn't exist!` );
        const room = await models.Room.findOne({
            where: {
              id: booking.room_id,
            },})
            if(!room) return onError(res, 400,`No price of unexisting room!` )
            const amount=room.price
            const payment= await models.Payment.findOne({where: {book_id},})
            if(payment && booking.paid=='true' )return onError(res, 208,`You already paid!` );
             
            const result=flutterPayment(phone_number,name,email,amount)
            result.then(data=>{
                models.Payment.create({
                    book_id,
                    tx_ref:data.Transaction
                  });
                res.status(200);
                res.json({payment_link:data})
                return data
            })
            .catch(err=>{
                console.log('')
                res.status(500).send(err);
                return err;
            })        
    }

    
    static async verifyPayment(req,res){
        try{
        const urlParams = req.query
        const status = urlParams.status
        const transaction_num = urlParams.tx_ref
        const transaction_id=urlParams.transaction_id
        const payment= await models.Payment.findOne({where:{tx_ref:transaction_num},})
        if(!payment){
            return onError(res, 400,`payment doesn't exist!`)
        } 
        if(status!='successful') {
            return onError(res, 400,`Payment failed!`)
        }
        const booking = await models.Booking.findOne({where: {id:payment.book_id,}})
        booking.update({paid:'true'});
        res.status(200).json({message:'The booking is successfully paid'})
    }
        catch(error){
            res.status(500).json({err:error})
        }  

    }
        
}