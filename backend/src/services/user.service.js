import User from "../models/user.model.js"

export const getUsersService = async (userId) => {
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password") // filteredUsers contendrá todos los usuarios excepto el usuario que ha iniciado sesión.

        return filteredUsers
}

export const getUserByIdService = async (userId) => {
        const user = await User.findById(userId).select("-password")

        return user
}