import express from "express"
import { AdminCtrl } from "../../controller/index.js"
const router = express.Router()

router.route("/")
    .get(AdminCtrl.getAllAdmins)

router.route("/:id")
    .get(AdminCtrl.show)
    .put(AdminCtrl.updateAdmin)
    .delete(AdminCtrl.deleteAdmin)

export default router