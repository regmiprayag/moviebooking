import express from "express"
import cmsRoutes from "./cms/indexcms.js"
import { LoginCtrl } from "../controller/index.js"
import { isAdminLoggedIn } from "../lib/index.js"

const router = express.Router()

router.use("/cms",isAdminLoggedIn,cmsRoutes)
router.post("/login",LoginCtrl.check)

export default router