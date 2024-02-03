import express from "express";
import { MoviesCtrl } from "../../controller/index.js";
const router = express.Router()

//user can select movies
router.route("/")
    .get(MoviesCtrl.getAllMovies)
    
router.route("/:id")
    .get(MoviesCtrl.getMovieById)

export default router