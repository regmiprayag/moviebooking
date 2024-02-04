import express from "express"
import { UserCtrl } from "../../controller/index.js"
const router = express.Router()

router.route("/")
    .get(UserCtrl.getAllUsers)

router.route("/:id")
    .get(UserCtrl.getUserById)

export default router