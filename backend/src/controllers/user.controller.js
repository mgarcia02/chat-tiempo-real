import { getUsersService } from "../services/user.service.js"

export const getUsers = async (req, res, next) => {
    try {
        const userId = req.user._id

        const users = await getUsersService(userId, res)

        return res.status(201).json({ data: users, message:"Lista de usuarios disponible para hablar" })
    } catch (error) {
        next(error)
    }
}