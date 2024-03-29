import { showError } from "../lib/index.js"
import Seat from "../models/Seat.js"


class SeatCtrl {
    getSeats = async(req,res,next)=>{
        const showtimeId = req.params.id
        // console.log(showtimeId, "HEREEE");
        // return res.json({showtimeId: showtimeId})
        try{
            const seat = await Seat.findOne({showtimeId});
            // console.log(seat);
            return res.json(seat)
        }catch(err){
            showError(err,next)
        }
    }
    updateSeat = async(req,res,next)=>{
        const showtimeId = req.params.id
        // return res.json({showtimeId: showtimeId})
        try{
            const seat = await Seat.findByIdAndUpdate({showtimeId:showtimeId,})

            res.json(seat)
        }catch(err){
            showError(err,next)
        }
    }
}
export default new SeatCtrl