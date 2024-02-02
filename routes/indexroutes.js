import express from "express"
import cmsRoutes from "./cms/indexcms.js"
import { LoginCtrl } from "../controller/index.js"
import { isAdminLoggedIn, isUserLoggedIn } from "../lib/index.js"
import commonRoutes from "./common/index.js"

const router = express.Router()

//all routing is here for the admin
router.use("/cms",isAdminLoggedIn,cmsRoutes)
router.post("/login",LoginCtrl.checkAdmin)
// router.use("/cms",isUserLoggedIn,cmRoutes)

//all routing is here for the users
router.use("/common",isUserLoggedIn,commonRoutes)
router.post("/user/login",LoginCtrl.checkUser)

export default router