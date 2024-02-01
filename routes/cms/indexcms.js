import express from "express"
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js"
import moviesRoutes from "./movieRoutes.js"
import showtimeRoutes from "./showtimeRoutes.js"

const router = express.Router()

router.use("/admins",adminRoutes)
router.use("/users",userRoutes)
router.use("/movies",moviesRoutes)
router.use("/showtimes",showtimeRoutes)

export default router