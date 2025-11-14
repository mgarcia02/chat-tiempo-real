import { signupService, loginService, logoutService } from "../services/auth.service.js"

export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body
        
        await signupService(fullName, userName, password, confirmPassword, gender, res)
    } catch (error) {
        console.log("ERROR (Error in signup controller):", error.message)
        return res.status(500).json({error:"Internal Server Error"})
    }
}
export const login = async(req, res) => {
    try {
        const { userName, password } = req.body

        loginService(userName, password, res)
    } catch (error) {
        console.log("ERROR (Error in login controller):", error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}
export const logout = async (req, res) => {
    try {
        logoutService(res)
    } catch (error) {
        console.log("ERROR (Error in logout controller):", error)
        return res.status(500).json({error:"Internal Server Error"})
    }
}

