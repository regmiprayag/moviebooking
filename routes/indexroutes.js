import express from "express"
import cmsRoutes from "./cms/indexcms.js"
import { AdminCtrl, BookingCtrl, LoginCtrl, MoviesCtrl, ShowtimeCtrl, UserCtrl } from "../controller/index.js"
import { isAdminLoggedIn, isUserLoggedIn } from "../lib/index.js"
import commonRoutes from "./common/index.js"
import bookingRoutes from "./booking/index.js"

const router = express.Router()

router.get("/movies",MoviesCtrl.getAllMovies)
router.get("/movies/:id",MoviesCtrl.getMovieById)
router.get("/users/:id",UserCtrl.getUserById)
router.get("/showtimes/:id", ShowtimeCtrl.getShows)
router.get("/showtimesToday", ShowtimeCtrl.getShowtimeToday)
router.get("/showtimesTommorow", ShowtimeCtrl.getShowtimeTommorrow)
router.get("/showtimeById/:id", ShowtimeCtrl.getShowtimeById)
router.put("/showtimes/:id", ShowtimeCtrl.updateShows)

//all routing is here for the admin
router.use("/cms",isAdminLoggedIn,cmsRoutes)
router.post("/login/admin",LoginCtrl.checkAdmin)
router.post("/signup/admin",AdminCtrl.signup)
// router.use("/cms",isUserLoggedIn,cmRoutes)

//all routing is here for the users
router.use("/common",isUserLoggedIn,commonRoutes)
router.post("/login/user",LoginCtrl.checkUser)
router.post("/signup/user",UserCtrl.signup)


router.get('/images/:filename', (req, res, next) => {
    res.sendFile(`images/${req.params.filename}`, { root: './' })
});

//when the user wants to book a movie
router.use("/bookings",isUserLoggedIn,bookingRoutes)

export default router