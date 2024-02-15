import { showError } from "../lib/index.js";
import Movies from "../models/Movies.js";
import Seat from "../models/Seat.js";
import Showtime from "../models/Showtime.js";

class MoviesCtrl {
    getAllMovies = async (req, res, next) => {
        let movies;
        try {
            movies = await Movies.aggregate([
                {$lookup: {from: 'admins', localField: 'adminId', foreignField: '_id', as: 'admin'}}
            ]).exec();
        }
        catch (err) {
            return res.status(400).json({ message: err })
        }
        if (!movies) {
            return res.status(500).send({ message: "No any Movies found" })
        }
        return res.status(200).json({ movies })
    }

    getMovieById = async (req, res, next) => {
        let movies;
        try {
            const movieId = req.params.id
            movies = await Movies.findById(movieId)
        }
        catch (err) {
            return res.status(400).json({ message: err })
        }
        if (!movies) {
            return res.status(500).send({ message: "No any Movies found" })
        }
        return res.status(200).json({ movies })
    }

    createMovie = async(req,res,next)=>{
        try{
            const { title,actors,featured,price,description,director,releaseDate} = req.body
            return res.json(actors)
            const posterUrl = req.file ? req.file.filename : ""
            
            await Movies.create({
                title, actors, posterUrl, description, director, releaseDate, featured, price, adminId: req.admin._id
            })

            res.status(201).json({message: "Movie created succesfully"})
        }
        catch(err){
            next({
                message: "Movie not created",
                status:400
            })
        }
    }
    deleteMovie = async(req,res,next)=>{
        const id = req.params.id;
        let movie
        try{
            await Showtime.deleteMany({
                movieId:id
            })
            movie = await Movies.findByIdAndDelete(id)        
        }catch(err){
            return res.status(400).json({error:"Error occured by this id"})
        }
        if(!movie){
            return res.status(404).json({message:"No movie found"})
        }
        return res.status(500).json({message:"Deleted Successfully"})
    }

    addShows=async(req,res,next)=>{
        let showtime;
        try{
            const movieId = req.params.id
            const {startTime,endTime} = req.body
            showtime = await Showtime.create({
                startTime,endTime,movieId
            })
            await Seat.create({
              showtimeId: showtime._id,
              seatNumber: Array(10).fill().map((element, index) => index + 1)
            });

            /**
             * 
             * INSERT INTO seats (showtime_id, seats) VALUE (showtime_id, generate_series(1, 20))
             */
            res.status(201).json({message: "Showtime has been added"})
        }catch(err){
            return res.status(400).json({message:"Cannot create show"})
        }
    }
}
export default new MoviesCtrl