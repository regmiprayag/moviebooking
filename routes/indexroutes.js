import express from "express"
import cmsRoutes from "./cms/indexcms.js"
import { LoginCtrl } from "../controller/index.js"
import { isAdminLoggedIn, isUserLoggedIn } from "../lib/index.js"

const router = express.Router()

router.use("/cms",isAdminLoggedIn,cmsRoutes)
router.post("/login",LoginCtrl.checkAdmin)
// router.use("/cms",isUserLoggedIn,cmRoutes)

export default router