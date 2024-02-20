import mongoose, { Schema } from "mongoose";

const Showtime = new mongoose.Schema({
    showDate : {
        type: String,
        required: true,
    },
    showTime : {
        type: String,
        required: true,
    },
    movieId:{
        type: mongoose.Types.ObjectId,
        ref:'Movie',
        required:true
    }
})

export default new mongoose.model("Showtime",Showtime)