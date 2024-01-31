import express from "express"
import adminRoutes from "./adminRoutes.js";
import userRoutes from "./userRoutes.js"
import moviesRoutes from "./movieRoutes.js"

const router = express.Router()

router.use("/admins",adminRoutes)
router.use("/users",userRoutes)
router.use("/movies",moviesRoutes)


export default router