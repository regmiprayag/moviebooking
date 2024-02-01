import { showError } from "../lib/index.js";
import Seat from "../models/Seat.js";
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

    
    deleteShow=async(req,res,next)=>{
        try{
            const showtimeId = req.params.id
            await Seat.deleteMany({
                showtimeId: showtimeId
            })
            await Showtime.findByIdAndDelete(showtimeId)
            res.send({message:"Showtime deleted successfully"})
        }catch(err){
            showError(err,next)
        }
    }
}

export default new ShowtimeCtrl