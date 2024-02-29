import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"


class AdminCtrl {
    getAllAdmins = async(req,res,next)=>{
        let admins;
        try{
            admins = await Admin.find()
        }
        catch(err){
            return next(err)
        }
        if(!admins){
            return res.status(500).send({message: "No any Admins found"})
        }
        return res.status(200).json({admins})
    }

    show = async (req, res, next) => {
        let admins
        try {
            admins = await Admin.findById(req.params.id)
        } catch(err) {
            showError(err)
        }
        if(!admins){
            return res.status(400).json({message:"Admin with this id not found"})
        }
        return res.status(200).json({message: admins})
    }
    
    signup = async(req,res)=>{
        if (req.body && req.body.name && req.body.email && req.body.password && req.body.phone) {
            let { name, email, password,phone } = req.body;
            // Rest of your code
            if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim() && !phone && phone.trim()===""){
                return res.status(422).json({error: 'Name and Email are required'});
            }
            let hashedPassword = bcrypt.hashSync(password)
            let admins;
            try{
                admins = new Admin({name,email,password:hashedPassword,phone})
                admins = await admins.save()
            }
            catch(err){
                return console.log(err)
            }
            if(!admins){
                return res.status(500).json({message:'Server error while saving the user to database'})
            }
            return res.status(201).json({message:"SignUp Done Successfully",id: admins._id});
        } 
        else {
            res.status(400).json({ error: 'Invalid request body' });
        }
    }
    
    updateAdmin = async(req,res,next)=>{
        const id=req.params.id;
        if (req.body && req.body.name && req.body.email && req.body.password && req.body.phone) {
            let { name, email, password,phone } = req.body;
            if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim() && !phone && phone.trim()){
                return res.status(422).json({error: 'Name and Email are required'});
            }
            let hashedPassword = bcrypt.hashSync(password)
            let admins;
            try{
                admins = await Admin.findByIdAndUpdate(id,{
                    name,
                    email,
                    password:hashedPassword,
                    phone
                })
            }catch(err){
                return console.log(err)
            }
            console.log("It's working upto here")
            if(!admins){
                return res.status(500).json({message:'Error occurred while updating'})
            }
            return res.status(201).json("Updated Successfully");
        }
        else{
            res.status(400).json({ error: 'Invalid request body' });
        }
    }
    
    deleteAdmin = async(req,res,next)=>{
        const id = req.params.id;
        let admins
        try{
            admins = await Admin.findByIdAndDelete(id)
        }catch(err){
            return next(new Error('Problem while deleting'))
        }
        if(!admins){
            return res.status(404).json({message:"No admin found"})
        }
        return res.status(500).json({message:"Deleted Successfully"})
    }
    
    loginAdmin = async(req,res,next)=>{
        const {email,password} = req.body;
        if(!email && email.trim()==="" && !password && password.trim()){
            return res.status(422).json({error: 'Input fields are empty'});
        }
        let existingAdmin
        try{
            existingAdmin = await Admin.findOne({email})
        }catch(err){
            return console.log(err)
        }
        if(!existingAdmin){
            return res.status(400).json({message:"Unable to find the user with the email"})
        }
        const isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password)
    
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect Password"})
        }
        return res.status(200).json({message: "Login Successfully",id:existingAdmin._id})
    }
}

export default new AdminCtrl