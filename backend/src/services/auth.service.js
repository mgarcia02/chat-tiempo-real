import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signupService = async (fullName, userName, password, confirmPassword, gender, res) => {
    if(password !== confirmPassword) {
        return res.status(400).json({error:"Password don't match"})
    }
    
    const user = await User.findOne({userName})
    
    if(user) {
        return res.status(400).json({error:"Username alredy exists"})
    }

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
        return res.status(400).json({error: "Invalid user data"})
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

    if(!user || !isPasswordCorrect) {
        return res.status(400).json({error:"Invalid username or password"})
    }

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