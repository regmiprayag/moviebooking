import express from "express"
import { BookingCtrl } from "../../controller/index.js"

const router = express.Router()

router.route("/")
    .get(BookingCtrl.showBookings)

export default router