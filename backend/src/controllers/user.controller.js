import { getUsersService } from "../services/user.service.js"

export const getUsers = async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id

        await getUsersService(loggedInUserId, res)
    } catch (error) {
        next(error)
    }
}