import { showError } from "../lib/index.js";
import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";
import User from "../models/User.js";

class BookingCtrl{
    createBooking=async(req,res,next)=>{
        // return res.status(404).json({mess:"hello"})
        if(req.user == undefined){
            return res.status(401).json({
                message:"Please login to continue"
            })
        }
        const {seatNumber, showtime} = req.body
        const movieId = req.params.id;
        // return res.json({seats,showtime,movieId})
        try{
           const show =await Showtime.findOne({showtimeId:showtime})
        //    return res.json({mesage:"Upto here is working", show})
            const isSeats = await Seat.find({seatNumber: seatNumber})
            return res.json({show, isSeats})
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
            return res.json({message:"Bookings are:",bookings})
            res.send(bookings)
        }catch(err){
            showError(err,next)
        }
    }
}
export default new BookingCtrl