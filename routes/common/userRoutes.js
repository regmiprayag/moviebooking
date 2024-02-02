import express from "express"
import { UserCtrl } from "../../controller/index.js"
const router = express.Router()

router.route("/:id")
    .get(UserCtrl.getUserById)
    // .post(UserCtrl.signup)

// router.route("/:id")
//     .get(UserCtrl.show)
//     .put(UserCtrl.updateUser)
//     .delete(UserCtrl.deleteUser)

export default router