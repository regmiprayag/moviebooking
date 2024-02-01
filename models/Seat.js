import mongoose from "mongoose";

const Seat = new mongoose.Schema({
    row : {
        type: Number,
        required: true,
    },
    number : {
        type: Number,
        required: true,
    },
    showtimeId:{
        type: Schema.Types.ObjectId,
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