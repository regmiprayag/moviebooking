import { showError } from "../lib/index.js";
import Booking from "../models/Booking.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";
// import User from "../models/User.js";
import mongoose from "mongoose"

class BookingCtrl{
    createBooking = async(req,res,next)=>{
        if(req.user == undefined){
            return res.status(401).json({
                message:"Please login to continue"
            })
        }
        const user = req.user
        const {seatNumber, showtimeId} = req.body
        const movieId = req.params.id;
        //starting a session and starting a transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            if (!seatNumber || seatNumber.length === 0) {
                return res.status(400).json({
                    message: "No seats provided for booking"
                });
            }
            const show = await Showtime.find({movieId})
            const isSeats = await Seat.findOne({showtimeId})
            for (let j = 0; j < seatNumber.length; j++) {
                const seatExists = isSeats.seatNumber.includes(seatNumber[j]);
                if (!seatExists) {
                    return res.status(400).json({
                        message: `Seat ${seatNumber[j]} is not available`
                    });
                }
                else{
                    const index = isSeats.seatNumber.indexOf(seatNumber[j]);
                    const dele = isSeats.seatNumber.splice(index, 1);
                }
            }
            await isSeats.save();
            //creating a booking 
            const createBooking = await Booking.create({
                userId: user,
                movieId,
                showtimeId,
                bookedSeat: seatNumber
            });
            // when booking is created successfully then making updates
            if (createBooking) {
                await Seat.updateMany(
                    { showtimeId, seatNumber: { $in: seatNumber } },
                    { $set: { status: "Booked" } }
                );
                await session.commitTransaction();
                return res.status(201).json({
                    message: "Booking created successfully"
                });
            }
        }catch(err){
            await session.abortTransaction();
            return res.status(400).json({
                message: err.message
            });
        }
        finally{
            session.endSession()
        }
    }

    showBookings=async(req,res,next)=>{
        try{
            const bookings = await Booking.aggregate([
                {$lookup: {from:'users', localField:"userId", foreignField:"_id", as:"user"}},
                {$lookup: {from:'movies', localField:"movieId", foreignField:"_id", as:"movie"}},
                {$lookup: {from:'showtimes', localField:"showtimeId", foreignField:"_id", as:"showtime"}},
            ]).exec()
            return res.json({message:"Bookings are:",bookings})
            res.send(bookings)
        }catch(err){
            showError(err,next)
        }
    }

    showBookingsById=async(req,res,next)=>{
        try{
            const bookings = await Booking.find({userId: req.params.id})
            return res.json({message:"Bookings are:",bookings})
        }catch(err){
            showError(err,next)
        }
    }

    deleteBooking = async(req,res,next)=>{
        const id = req.params.id;
        let booking
        try{
            booking = await Booking.findByIdAndDelete(id)
        }catch(err){
            return next(new Error('Problem while deleting'))
        }
        if(!booking){
            return res.status(404).json({message:"No booking found"})
        }
        return res.status(500).json({message:"Deleted Successfully"})
    }
}
export default new BookingCtrl