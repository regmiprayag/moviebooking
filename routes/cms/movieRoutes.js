import express from "express";
import { MoviesCtrl } from "../../controller/index.js";
const router = express.Router()

router.route("/")
    .get(MoviesCtrl.getAllMovies)
    

export default router