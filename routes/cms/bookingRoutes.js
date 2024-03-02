import express from "express"
import { BookingCtrl } from "../../controller/index.js"

const router = express.Router()

router.route("/")
    .get(BookingCtrl.getAllBookings);

export default router