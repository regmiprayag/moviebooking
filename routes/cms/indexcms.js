import express from "express"
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js"
import moviesRoutes from "./movieRoutes.js"
import showtimeRoutes from "./showtimeRoutes.js"
import seatRoutes from "./seatRoutes.js"

const router = express.Router()

router.use("/admins",adminRoutes)
router.use("/users",userRoutes)
router.use("/movies",moviesRoutes)
router.use("/showtimes",showtimeRoutes)
router.use("/seats",seatRoutes)

export default router