import express from "express"
const router = express.Router()

router.route("/")
    .get(TicketCtrl.getAllTickets);

export default router