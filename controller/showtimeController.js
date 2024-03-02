// import { showtime } from "../../cms/src/pages/home/index.js";
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
    getAllShows=async(req,res,next)=>{
        let showtime;
        try{
            showtime = await Showtime.find();
        }catch(err){
            console.log(err)
        }
        if(!showtime){
            return res.json({message: "Not found anything"})
        }
        return res.json({showtime});
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

    getShowtimeToday = async (req, res, next) => {
        let showtime;
        try {
            // console.log("Hyaa samma aairako xa kii nai");
            // return;
            const today = new Date();
            const year = today.getFullYear(); // Get the year
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (adding 1 because January is 0)
            const day = String(today.getDate()).padStart(2, '0'); // Get the day
            const formattedDate = `${year}-${month}-${day}`;
            // console.log("this is error",formattedDate);

            showtime = await Showtime.find({
                showDate: formattedDate
            });
        }
        catch (err) {
            return res.status(400).json({ message: err })
        }
        if (!showtime) {
            return res.status(200).send({ message: "No any Showtime Today" })
        }
        return res.status(200).json({ showtime })
    }

    getShowtimeTommorrow = async (req, res, next) => {
        let showtime;
        try {
            const today = new Date();

            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            // Format the date as "YYYY-MM-DD"
            const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
            console.log("ZTommorow daps",tomorrowFormatted);
            // return;
            // return res.json({tomorrowFo;fomatted});

            showtime = await Showtime.find({
                showDate: tomorrowFormatted
            });
        }
        catch (err) {
            return res.status(400).json({ message: err })
        }
        if (!showtime) {
            return res.status(200).send({ message: "No any Showtime Tomorrow" })
        }
        // console.log("In backend: ",showtime);
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