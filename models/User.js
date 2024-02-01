import mongoose from "mongoose"

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default mongoose.model("User", User);