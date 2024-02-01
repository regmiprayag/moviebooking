import { showError } from "../lib/index.js"
import Seat from "../models/Seat.js"


class SeatCtrl {
    getAllSeats = async(req,res,next)=>{
        try{
            const seat = await Seat.find()
            res.json(seat)
        }catch(err){
            showError(err,next)
        }
    }
}
export default new SeatCtrl