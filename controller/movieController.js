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

    updateMovieById = async(req,res,next)=>{
        let movies;
        try{
            const {title,releaseDate,actors,description,director} = req.body
            const movieId = req.params.id;
            // console.log("The details are: ",movieId,title,releaseDate,actors,description,director);
            movies = await Movies.findByIdAndUpdate(movieId,{
                title:title,
                actors:actors,
                releaseDate:releaseDate,
                // posterUrl: image,
                director:director,
                description:description
            });
        }catch(err){
            return res.json({message: err.message})
        }
        if(!movies){
            return res.json({message: err.message})
        }
        return res.json({message: "Updated Successfully",movies})
    }

    getMovieById = async (req, res, next) => {
        let movies;
        try {
            const movieId = req.params.id;
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
        // return res.json({message:"hello prayag"})
        try{

            // return console.log("Inside req.body fields are: ",req.body);
            const { title,actors,featured,price,description,director,releaseDate} = req.body
            const image = req.file ? req.file.filename : "thait yarr"
            // return res.json({image: image})
            
            await Movies.create({
                title, actors, posterUrl:image, description, director, releaseDate, featured, price, adminId: req.admin._id
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
            // await Showtime.deleteMany({
            //     movieId:id
            // })
            movie = await Movies.findByIdAndDelete(id)        
        }catch(err){
            return res.status(400).json({error:"Error occured by this id"})
        }
        if(!movie){
            return res.status(404).json({message:"No movie found"})
        }
        return res.status(200).json({message:"Deleted Successfully"})
    }

    addShows=async(req,res,next)=>{
        let showtime;
        try{
            const movieId = req.params.id
            // return res.json({movieId})
            const {showDate,showTime} = req.body
            // return res.json({showDate,showTime})
            showtime = await Showtime.create({
                showDate,showTime,movieId
            })

            // console.log(showtime);
            // return res.json({message:"shows has been created sucesfuly"})
            if (!showtime) {
                throw Error('Error while creating showtime!');
            }

            let seats;
            seats = await Seat.create({
                showtimeId: showtime._id,
                seatNumber: Array(10).fill().map((element, index) => index + 1)
            });

            if (!seats) {
                throw Error('Seat creation error!');
            }

            return res.status(200).json({
                message: 'Showtimes and seats created successfully',
                seats,
                showtime
            })
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }
}
export default new MoviesCtrl