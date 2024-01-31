import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"

const showError = (err, next) => {
    console.error(err)
    next({
        message: 'Problem while processing request.',
        status: 400
    })
}

const isAdminLoggedIn = async (req, res, next) => {
    if('authorization' in req.headers) {
        const token = req.headers.authorization.split(" ").pop()
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            // return res.json({payload})
            const admin = await Admin.findById(payload.id)
            // return res.json({admin})
            if(admin) {
                // return res.json({admin})
                if(admin.status) {
                    // req.admin = admin
                    // next()
                    return res.json({message: admin})
                } else {
                    next({
                        message: 'Inactive admin.',
                        status: 403
                    })
                }
            } else {
                next({
                    message: 'Invalid token.',
                    status: 401
                })
            }
        } catch(err) {
            return res.status(401).json({
                message: "Not authorized!"
            })
        }
    } else {
        next({
            message: 'Token missing.',
            status: 401
        })
    }
}

export { showError,isAdminLoggedIn }