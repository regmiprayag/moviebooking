import express from "express"
import { ShowtimeCtrl } from "../../controller/index.js"
const router = express.Router()

router.route("/")
    .get(ShowtimeCtrl.getAllShows)

router.route("/:id")
    .post(ShowtimeCtrl.addShows)

export default router