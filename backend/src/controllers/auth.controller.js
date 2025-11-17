import { signUpService, signInService } from "../services/auth.service.js"
import { generateTokenAndSetCookie } from "../utils/generateToken.js"

export const signUp = async (req, res, next) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body
        
        const newUser = await signUpService(fullName, userName, password, confirmPassword, gender)

        generateTokenAndSetCookie(newUser._id, res)

        return res.status(201).json({ data: newUser, message:"Usuario creado y sesión iniciada" })
    } catch (error) {
        next(error)
    }
}

export const signIn = async(req, res, next) => {
    try {
        const { userName, password } = req.body

        const user = await signInService(userName, password)

        generateTokenAndSetCookie(user._id, res)

        return res.status(200).json({ data: user, message:"Sesión iniciada" }) 
    } catch (error) {
        next(error)
    }
}

export const signOut = async (_req, res, next) => {
    try {
        res.cookie("token", "", {maxAge:0})

        return res.status(200).json({ message:"Sesión cerrada" })
    } catch (error) {
        next(error)
    }
}

