import mongoose from "mongoose";

const Ticket = new mongoose.Schema({
    bookingId:{
        type:mongoose.Types.ObjectId,
        default:true
    },
    expireTime:{
        type:Date,
        default:Date() + (1000*60*60*24)
    }
})