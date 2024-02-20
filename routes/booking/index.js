import express from "express"
import {BookingCtrl, SeatCtrl, ShowtimeCtrl} from "../../controller/index.js"
import { isUserLoggedIn } from "../../lib/index.js"


const router = express.Router()


router.post("/createOrder",BookingCtrl.createOrder)
router.post("/:id/create",BookingCtrl.createBooking)
router.get("/",BookingCtrl.showBookings)
router.delete("/:id",BookingCtrl.deleteBooking)
router.get("/:id",BookingCtrl.showBookingsById)
router.get("/showtimes/:id",ShowtimeCtrl.getShows)
router.get("/seats/:id",SeatCtrl.getSeats)

export default router