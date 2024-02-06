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
                    { $set: { isBooked: "Booked" } }
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


    createBooking1=async(req,res,next)=>{
        // return res.status(404).json({mess:"hello"})
        if(req.user == undefined){
            return res.status(401).json({
                message:"Please login to continue"
            })
        }
        const user = req.user
        const {seatNumber, showtimeId} = req.body
        // return res.json({seatNumber,showtimeId,user})
        const movieId = req.params.id;
        // return res.json({seats: seatNumber, showtimeId: showtimeId})
        // Create transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        try{

            const show = await Showtime.find({movieId:movieId})
            //    return res.json({mesage:"Upto here is working", show})
            const isSeats = await Seat.findOne({showtimeId})
            // const nseats = await Seat.findOne({showtimeId});
            // return res.json({"seats": isSeats.seatNumber})

            // return res.json({"seatsvalue": isSeats.seatNumber})
            // return res.json({"userchoosenseats": seatNumber,availableSeats: isSeats.seatNumber})
            // return res.json({"Available Seats":isSeats.seatNumber})
            let seatNumberExists;
            for(let j = 0 ; j < seatNumber.length; j++){
                seatNumberExists = isSeats.seatNumber.some(seat => seat.seatNumber == seatNumber[j]);
                if (seatNumberExists) {
                  console.log(`${seatNumber[j]} exists.`);
                  return res.json({"seats": isSeats.seatNumber})
                } else {
                  console.log(`${seatNumber[j]} does not exist.`);
                  console.log("Your chosen seats are not available");
                //   break;
                  return res.json({"message":"Seats not found"})
                }
            }
            if(seatNumberExists){
            /*
             * if not (seatNumber in isSeat.seatNumber)
             *  retrun res.status(400).json({"message": "Seats booked!"});
             */
            return res.json({seatNumberExists})
            const isAvailableSeat = await Seat.find({isBooked:"Available"})
            // return res.json({show, isSeats})
            const createBooking = await Booking.create({
                userId:user,
                movieId,
                showtimeId,
                bookedSeat: seatNumber
            })
            if(createBooking){
                const newSeats = await Seat.findOne({showtimeId});
                for (let i = 0; i < newSeats.seatNumber.length; i++){
                   if(seatNumber[i] in newSeats.seatNumber) {
                    const index = newSeats.seatNumber.indexOf(seatNumber[i]);
                    const dele = newSeats.seatNumber.splice(index, 1);
                   }
                   else{
                    return res.json({message:"The sit is not available"})
                   }
                }
                // console.log(newSeats.seatNumber);
                // return res.json({seats: newSeats.seatNumber})

                await newSeats.save();
                await session.commitTransaction()
                return res.status(201).json({
                    newSeats
                })
            }
            }
            else{
                return res.json({message:"Seats are not available"})
            }
            // return res.json({message: "Booking created sucessfully", createBooking})
        }catch(err){
            return res.status(400).json({
                message: err.message
            })
            throw err
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