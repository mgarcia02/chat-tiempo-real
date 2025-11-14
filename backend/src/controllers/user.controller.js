import { getUsersService } from "../services/user.service.js"

export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id

        await getUsersService(loggedInUserId, res)
    } catch (error) {
        console.log("ERROR (Error in getUsers controller):", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}