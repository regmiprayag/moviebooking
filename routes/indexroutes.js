import express from "express"
import cmsRoutes from "./cms/indexcms.js"
import { BookingCtrl, LoginCtrl } from "../controller/index.js"
import { isAdminLoggedIn, isUserLoggedIn } from "../lib/index.js"
import commonRoutes from "./common/index.js"
import bookingRoutes from "./booking/index.js"

const router = express.Router()

//all routing is here for the admin
router.use("/cms",isAdminLoggedIn,cmsRoutes)
router.post("/login",LoginCtrl.checkAdmin)
// router.use("/cms",isUserLoggedIn,cmRoutes)

//all routing is here for the users
router.use("/common",isUserLoggedIn,commonRoutes)
router.post("/user/login",LoginCtrl.checkUser)

//when the user wants to book a movie
router.use("/bookings",bookingRoutes)

export default router