import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"
import { InvalidCredentialsError, UserAlreadyExistsError, ValidationError } from "../errors/errors.js"

export const signupService = async (fullName, userName, password, confirmPassword, gender, res) => {
    if(password !== confirmPassword) throw new ValidationError("Password don't match")
    
    const user = await User.findOne({userName})
    if(user) throw new UserAlreadyExistsError()

    // Hash password here
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    // Valid if the fields are correct
    let newUser = new User()
    try {
        newUser = new User({
            fullName: fullName,
            userName: userName,
            password: hashedPassword,
            gender: gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
    } catch (error) {
        throw new ValidationError("Invalid user data")
    }

    // Genrate JWT token here
    generateTokenAndSetCookie(newUser._id, res)

    await newUser.save()

    res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic
    })
}

export const loginService = async(userName, password, res) => {    
    const user = await User.findOne({userName})
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect) throw new InvalidCredentialsError()

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic
    })
}

export const logoutService = async (res) => {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message:"Logged out seccesfully"})
}