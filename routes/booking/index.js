import express from "express"
import {BookingCtrl, SeatCtrl, ShowtimeCtrl} from "../../controller/index.js"

const router = express.Router()

router.post("/:id/create",BookingCtrl.createBooking)
router.get("/",BookingCtrl.showBookings)
router.get("/showtimes/:id",ShowtimeCtrl.getShows)
router.get("/seats/:id",SeatCtrl.getSeats)


export default router