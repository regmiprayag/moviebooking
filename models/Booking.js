import mongoose from "mongoose";

const Booking = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String,
    },
    movieId:{
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    moviename:{
        type:String,
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
    uuid:{
        type:String,
        required:true,
    },
    status:{
        type: String,
        enum: ['Confirm', 'Pending', 'Cancelled'],
        default: 'Confirm',
    }
})

export default mongoose.model("Booking",Booking)