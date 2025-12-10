import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const jwtSecret = process.env.JWT_SECRET;

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, jwtSecret, {expiresIn: "8h"})

    res.cookie("token", token, {
        maxAge: 8 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret)
    } catch {
        return null
    }
}