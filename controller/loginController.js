import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/User.js";

class LoginCtrl{
    checkAdmin = async(req,res,next)=>{
        try{
            const { email,password }=req.body
            // return res.send({email,password})
            const admin = await Admin.findOne({email})
            // return res.send({admin})
            if(admin){
                // const pass = bcrypt.compareSync(password, admin.password)
                // return res.send({pass})
                if(bcrypt.compareSync(password, admin.password)){
                    const token = jwt.sign({
                        id: admin._id,
                        iat: Math.floor(Date.now()/1000),
                        exp: Math.floor(Date.now()/1000) + (30*24*60*60),
                    }, process.env.JWT_SECRET)
                    return res.json({token: token})
                }else{
                    return res.status(422).json({message: "Invalid Password"})
                }
            }else{
                return res.status(422).json({message: "Invalid Email"})
            }
        }catch(err){
            return res.status(400).json({message: "Error message"})
        }
    }

    checkUser = async(req,res,next)=>{
        try{
            const { email,password }=req.body
            // return res.send({email,password})

            const user = await User.findOne({email})
            // return res.send({user})
            if(user){      
                // return res.send({user})
                // const pass =  bcrypt.compareSync(password, user.password)
                // return res.send({pass})     
                if(bcrypt.compareSync(password, user.password)){
                    const token = jwt.sign({
                        id: user._id,
                        iat: Math.floor(Date.now()/1000),
                        exp: Math.floor(Date.now()/1000) + (60*60),//expires after 60 minute
                    }, process.env.JWT_SECRET)
                    return res.json({token: token})
                }else{
                    return res.status(422).json({message: "Invalid Password"})
                }
            }else{
                return res.status(422).json({message: "Invalid Email"})
            }
        }catch(err){
            return res.status(400).json({message: "Error message"})
        }
    }
}

export default new LoginCtrl