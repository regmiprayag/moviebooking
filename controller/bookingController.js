import { showError } from "../lib/index.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

class BookingCtrl{
    createBooking=async(req,res,next)=>{
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
        // let date = Math.floor((Date.now())/1000)
        // return res.send("hello")
        try{
            const bookings = await Booking.find()
            return res.json({bookings})
            res.send(bookings)
        }catch(err){
            showError(err,next)
        }
    }
}
export default new BookingCtrl