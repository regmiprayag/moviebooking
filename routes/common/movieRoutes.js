import express from "express";
import { MoviesCtrl } from "../../controller/index.js";
const router = express.Router()

//user can select movies
router.route("/")
    .get(MoviesCtrl.getAllMovies)

// router.route("/addshows/:id")
//     .post(MoviesCtrl.addShows)


router.route("/:id")
    .delete(MoviesCtrl.deleteMovie)

export default router