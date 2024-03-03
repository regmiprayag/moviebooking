import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import User from "../models/User.js"
import multer from "multer"
import path from "path";
import crypto from "crypto";

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
    if('authorization' in req.headers) {
        const token = req.headers.authorization.split(" ").pop()
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(payload.id)
            if(user) {
                // console.log("It's me users hai guys",user)
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
    }
    else{
        return res.json({message:"Failed in authorization"})
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
          cb(null, 'images/');
    },
    filename: function (req, file, cb) {
          cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const createSignature = (message) => {
    const secret = "8gBm/:&EnhH.1/q"; //different in production
    // Create an HMAC-SHA256 hash
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(message);

    // Get the digest in base64 format
    const hashInBase64 = hmac.digest("base64");
    return hashInBase64;
};

export { showError,isAdminLoggedIn,isUserLoggedIn, storage, createSignature }