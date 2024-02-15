import express from 'express'
import movieRoutes from "./movieRoutes.js"
import userRoutes from "./userRoutes.js"
import { UserCtrl } from '../../controller/index.js';

const router = express.Router()

router.use("/users",userRoutes)
router.use("/movies",movieRoutes)
router.get('/user/details', async (req, res, next) => {
    res.json(req.user);
})


export default router