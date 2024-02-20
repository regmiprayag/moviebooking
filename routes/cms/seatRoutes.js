import express from "express"
import { SeatCtrl } from "../../controller/index.js"

const router = express.Router()

router.route("/:id")
    .get(SeatCtrl.getSeats)

export default router