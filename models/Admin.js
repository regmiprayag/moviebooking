import mongoose from "mongoose"

const Admin = new mongoose.Schema({
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
    phone:{
        type: String,
        required:true,
        minLength:10
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default mongoose.model("Admin", Admin);