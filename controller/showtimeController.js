import { showError } from "../lib/index.js";
import Showtime from "../models/Showtime.js";


class ShowtimeCtrl{
    getAllShows=async(req,res,next)=>{
        try{
            const showtime = await Showtime.find()
            res.send(showtime)
        }catch(err){
            showError(err,next)
        }
    }
    addShows=async(req,res,next)=>{
        try{
            const movieId = req.params.id
            const {startTime,endTime} = req.body
            await Showtime.create({
                startTime,endTime,movieId
            })
            res.status(201).json({message: "Showtime has been added"})
        }catch(err){
            showError(err,next)
        }
    }
}

export default new ShowtimeCtrl