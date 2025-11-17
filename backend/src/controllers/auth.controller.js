import { signupService, loginService, logoutService } from "../services/auth.service.js"

export const signup = async (req, res, next) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body
        
        await signupService(fullName, userName, password, confirmPassword, gender, res)
    } catch (error) {
        next(error)
    }
}
export const login = async(req, res, next) => {
    try {
        const { userName, password } = req.body

        await loginService(userName, password, res)
    } catch (error) {
        next(error)
    }
}
export const logout = async (_req, res, next) => {
    try {
        await logoutService(res)
    } catch (error) {
        next(error)
    }
}

