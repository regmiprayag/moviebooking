import express from "express";
import { MoviesCtrl } from "../../controller/index.js";
const router = express.Router()

router.route("/")
    .get(MoviesCtrl.getAllMovies)
    .post(MoviesCtrl.createMovie)
    
router.route("/:id")
    .delete(MoviesCtrl.deleteMovie)

export default router