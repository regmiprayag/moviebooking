import express from 'express'
import bookingRoutes from "./bookingRoutes.js";
import movieRoutes from "./movieRoutes.js"
import userRoutes from "./userRoutes.js"
import { UserCtrl } from '../../controller/index.js';

const router = express.Router()

router.use("/users",userRoutes)
router.use("/movies",movieRoutes)


export default router