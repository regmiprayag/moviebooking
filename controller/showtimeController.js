import { showError } from "../lib/index.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";


class ShowtimeCtrl{
    getShows=async(req,res,next)=>{
        try{
            const movieId = req.params.id
            const showtime = await Showtime.find({movieId: movieId})
            // const showtime = await Showtime.findOne()
            return res.json({message: showtime})
            // res.json( showtime )
        }catch(err){
            showError(err,next)
        }
    }

    getShowtimeById = async (req, res, next) => {
        let showtime;
        try {
            const showtimeId  = req.params.id
            showtime = await Showtime.findById(showtimeId);
        }
        catch (err) {
            return res.status(400).json({ message: err })
        }
        if (!showtime) {
            return res.status(500).send({ message: "No any Showtime found" })
        }
        return res.status(200).json({ showtime })
    }

    updateShows = async(req,res,next)=>{
        let showtime
        try{
            const {startTime,endTime} = req.body
            // return res.json({startTime,endTime})
            const showtimeId = req.params.id
            // return res.json({showtimeId})
            showtime = await Showtime.findByIdAndUpdate(showtimeId,{
                startTime,
                endTime
            })
        }catch(err){
            showError(err,next)
        }
        if(!showtime){
            return res.json({message:"Has not been updated"})
        }
        return res.json({message:"showtime has been updated"})
    }

    deleteShow=async(req,res,next)=>{
        try{
            const showtimeId = req.params.id
            await Seat.deleteMany({
                showtimeId: showtimeId
            })
            await Showtime.findByIdAndDelete(showtimeId)
            return res.json({message:"Showtime deleted successfully"})
        }catch(err){
            showError(err,next)
        }
    }
}

export default new ShowtimeCtrl