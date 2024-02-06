import mongoose from "mongoose";

const Booking = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    movieId:{
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    showtimeId:{
        type:mongoose.Types.ObjectId,
        ref:"Showtime",
        required:true
    },
    bookingDate:{
        type:Date,
        // required:true
    },
    amount:{
        type:Number,
        // required:true
    },
    bookedSeat:{
        type:[Number],
        required:true
    },
    
    status:{
        type: String,
        enum: ['Confirm', 'Pending', 'Cancelled'],
        default: 'Confirm',
    }
})

export default mongoose.model("Booking",Booking)