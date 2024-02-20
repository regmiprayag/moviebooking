import mongoose from "mongoose";
const Seat = new mongoose.Schema({
    row : {
        type: Number
    },
    seatNumber : {
        type: Array,
        required: true
        // unique:true,
    },
    showtimeId:{
        type: mongoose.Types.ObjectId,
        ref:'Showtime',
        required:true
    },
    status: {
        type: String,
        enum: ['Booked', 'Available', 'Reserved'],
        default: 'Available',
    }
})

export default new mongoose.model("Seat",Seat)