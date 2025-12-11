import { get } from "mongoose"
import { getUsersService, getUserByIdService } from "../services/user.service.js"

export const getUsers = async (req, res, next) => {
    try {
        const userId = req.user._id

        const users = await getUsersService(userId, res)

        return res.status(201).json({ data: users, message:"Lista de usuarios disponible para hablar" })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const userId = req.user._id

        const user = await getUserByIdService(userId)

        return res.status(200).json({ data: user, message:"Usuario obtenido correctamente" })
    } catch (error) {
        next(error)
    }    
}