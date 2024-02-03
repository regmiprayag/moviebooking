import express from "express"
import {BookingCtrl, ShowtimeCtrl} from "../../controller/index.js"

const router = express.Router()

router.post("/:id/create",BookingCtrl.createBooking)
router.get("/",BookingCtrl.showBookings)
router.get("/showtimes/:id",ShowtimeCtrl.getShows)


export default router