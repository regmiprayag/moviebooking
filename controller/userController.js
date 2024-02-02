import User from "../models/User.js";
import bcrypt from "bcryptjs"

class UserCtrl {
    getAllUsers = async(req,res,next)=>{
        let users;
        try{
            users = await User.find()
        }
        catch(err){
            return next(err)
        }
        if(!users){
            return res.status(500).send({message: "No any Users found"})
        }
        return res.status(200).json({users})
    }

    getUserById = async(req,res,next)=>{
        let users;
        try{
            users = await User.findById(req.params.id)
        }
        catch(err){
            return next(err)
        }
        if(!users){
            return res.status(500).send({message: "No any Users found"})
        }
        return res.status(200).json({users})
    }

    show = async (req, res, next) => {
        let user
        try {
            user = await User.findById(req.params.id)
        } catch(err) {
            showError(err)
        }
        if(!user){
            return res.status(400).json({message:"User with this id not found"})
        }
        return res.status(200).json({message: user})
    }
    
    signup = async(req,res)=>{
        // return res.send({message:"hello im inside signup"})
        let { name,email,password }=req.body
        if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()){
            return res.status(422).json({error: 'Name and Email are required'});
        }
        let hashedPassword = bcrypt.hashSync(password)
        let users;
        try{
            users = new User({name,email,password:hashedPassword})
            users = await users.save()
        }
        catch(err){
            return console.log(err)
        }
        if(!users){
            return res.status(500).json({message:'Server error while saving the user to database'})
        }
        return res.status(201).json({message:"SignUp Done Successfully",id: users._id});
    }
    
    updateUser = async(req,res,next)=>{
        const id=req.params.id;
        const {name,email,password} = req.body;
        if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()){
            return res.status(422).json({error: 'Name and Email are required'});
        }
        let hashedPassword = bcrypt.hashSync(password)
        let user;
        try{
            user = await User.findByIdAndUpdate(id,{
                name,
                email,
                password:hashedPassword
            })
        }catch(err){
            return console.log(err)
        }
        console.log("It's working upto here")
        if(!user){
            return res.status(500).json({message:'Error occurred while updating'})
        }
        return res.status(201).json("Updated Successfully");
    }
    
    deleteUser = async(req,res,next)=>{
        const id = req.params.id;
        let user
        try{
            user = await User.findByIdAndDelete(id)
        }catch(err){
            return next(new Error('Problem while deleting'))
        }
        if(!user){
            return res.status(404).json({message:"No user found"})
        }
        return res.status(500).json({message:"Deleted Successfully"})
    }
    
    loginUser = async(req,res,next)=>{
        const {email,password} = req.body;
        if(!email && email.trim()==="" && !password && password.trim()){
            return res.status(422).json({error: 'Input fields are empty'});
        }
        let existingUser
        try{
            existingUser = await User.findOne({email})
        }catch(err){
            return console.log(err)
        }
        if(!existingUser){
            return res.status(400).json({message:"Unable to find the user with the email"})
        }
    
        console.log("It's working upto here")
        const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect Password"})
        }
        return res.status(200).json({message: "Login Successfully",id:existingUser._id})
    }
}

export default new UserCtrl