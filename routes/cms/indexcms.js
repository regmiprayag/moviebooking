import express from "express"
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js"
import moviesRoutes from "./movieRoutes.js"
import showtimeRoutes from "./showtimeRoutes.js"
import seatRoutes from "./seatRoutes.js"
import ticketRoutes from "./ticketRoutes.js"
import bookingsRoutes from "./bookingRoutes.js"

const router = express.Router()

router.use("/admins",adminRoutes)
router.use("/users",userRoutes)
router.use("/movies",moviesRoutes)
router.use("/showtimes",showtimeRoutes)
router.use("/seats",seatRoutes)
router.use("/tickets",ticketRoutes);
router.use("/bookings",bookingsRoutes)

export default router