import express from "express"
import { UserCtrl } from "../../controller/index.js"
const router = express.Router()

router.route("/")
    .get(UserCtrl.getAllUsers)
    .post(UserCtrl.signup)

router.route("/:id")
    .get(UserCtrl.show)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser)
    .post(UserCtrl.loginUser)

export default router