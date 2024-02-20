import express from "express";
import { MoviesCtrl } from "../../controller/index.js";
import { storage } from "../../lib/index.js";
import multer from "multer";
const router = express.Router()

const upload = multer({storage});

router.route("/")
    .get(MoviesCtrl.getAllMovies)
    .post(upload.single('posterUrl'),MoviesCtrl.createMovie)

router.route("/addshows/:id")
    .post(MoviesCtrl.addShows)

router.route("/:id")
    .delete(MoviesCtrl.deleteMovie)
    .put(MoviesCtrl.updateMovieById)

router.route("/:id")
    .get(MoviesCtrl.getMovieById)

export default router