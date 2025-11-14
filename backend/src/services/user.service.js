import User from "../models/user.model.js"

export const getUsersService = async (loggedInUserId, res) => {
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") // filteredUsers contendrá todos los usuarios excepto el usuario que ha iniciado sesión.

        res.status(200).json(filteredUsers)
}