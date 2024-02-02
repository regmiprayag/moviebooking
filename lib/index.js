import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import User from "../models/User.js"

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
            const admin = await Admin.findById(payload.id)
            if(admin) {
                if(admin.status) {
                    req.admin = admin
                    next()
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
       return res.json({message:"Token missing"})
    }
}

const isUserLoggedIn = async (req, res, next) => {
    // return res.send("hello")
    if('authorization' in req.headers) {
        const token = req.headers.authorization.split(" ").pop()
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(payload.id)
            if(user) {
                if(user.status) {
                    req.user = user
                    next()
                } else {
                    next({
                        message: 'Inactive user.',
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
        return res.status(400).json({message:"Token missing"})
    }
}

const uploadImage = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'images/'),
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()

            cb(null, `img${Date.now()}.${ext}`)
        }
    })
})

export { showError,isAdminLoggedIn,isUserLoggedIn, uploadImage }