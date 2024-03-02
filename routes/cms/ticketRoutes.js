import express from "express"
import { TicketCtrl } from "../../controller/index.js"

const router = express.Router()
router.route("/")
    .get(TicketCtrl.getAllTickets);

export default router