import User from "../models/user.model.js";
import { verifyToken } from "../utils/generateToken.js";
import { UnauthorizedError } from "../errors/errors.js";

dotenv.config()
const protectRoute = async (req, _res, next) => {
    try {
        const token = req.cookies.token
        if(!token) throw new UnauthorizedError()
        
        const decoded = verifyToken(token)
        if(!decoded) throw new UnauthorizedError()

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) throw new UnauthorizedError()

        req.user = user

        next()
    } catch (error) {
        next(error)
    }
}

export default protectRoute