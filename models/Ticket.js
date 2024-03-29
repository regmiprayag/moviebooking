import mongoose from "mongoose";

const Ticket = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        // required:true
    },
    bookingId:{
        type:mongoose.Types.ObjectId,
        ref:'Booking',
        default:true
    },
    expireTime:{
        type:String,
        default:Date() + (1000*60*60*24)
    },
    showDate:{
        type:String,
        // required:true,
    },
    selectedSeats:{
        type:[Number],
        required:true,
    },
    movieId:{
        type: mongoose.Types.ObjectId,
        ref:'Movie',
        required:true
    },
    showtime:{
        type:String,
        required:true,
    },
    showtimeId:{
        type: mongoose.Types.ObjectId,
        ref:'Showtime',
        required:true
    },
    status:{
        type:String,
        enum: ['None', 'Updated'],
        default: 'None',
    },
})

export default mongoose.model("Ticket", Ticket)
// export default mongoose.model("User", User);
