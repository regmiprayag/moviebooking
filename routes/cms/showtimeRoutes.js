import express from "express"
import { ShowtimeCtrl } from "../../controller/index.js"
const router = express.Router()

router.route("/")
    .get(ShowtimeCtrl.getShows)

router.route("/:id")
    .delete(ShowtimeCtrl.deleteShow)

export default router