import mongoose, { Schema } from "mongoose";

const Showtime = new mongoose.Schema({
    startTime : {
        type: Date,
        required: true,
    },
    endTime : {
        type: Date,
        required: true,
    },
    movieId:{
        type: Schema.Types.ObjectId,
        ref:'Movie',
        required:true
    }
})

export default new mongoose.model("Showtime",Showtime)