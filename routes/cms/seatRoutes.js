import express from "express"
import { SeatCtrl } from "../../controller/index.js"

const router = express.Router()

router.route("/")
    .get(SeatCtrl.getAllSeats)

export default router