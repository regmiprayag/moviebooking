import { showError } from "../lib/index.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

class BookingCtrl{
    addBookings=async(req,res,next)=>{
        try{
            const user = await User.findById();

            if (!user) {
                throw Error('User not found!');
            }
        }catch(err){
            return res.status(400).json({
                message: err.message
            })
        }
    }
    showBookings=async(req,res,next)=>{
        let date = new Date((Date.now()))
        return res.send({date})
        try{
            const bookings = await Booking.find()
            res.send(bookings)
        }catch(err){
            showError(err,next)
        }
    }
}
export default new BookingCtrl