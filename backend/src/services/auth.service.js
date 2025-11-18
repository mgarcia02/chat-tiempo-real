import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { InvalidCredentialsError, UserAlreadyExistsError, ValidationError } from "../errors/errors.js"
import mapDBErrors from "../errors/mapDBErrors.js"

export const signUpService = async (fullName, userName, password, confirmPassword, gender) => {
    if(password !== confirmPassword) throw new ValidationError("Password don't match")
    
    const user = await User.findOne({userName})
    if(user) throw new UserAlreadyExistsError()

    // Hash password here
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    const newUser = new User({
        fullName: fullName,
        userName: userName,
        password: hashedPassword,
        gender: gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })

    try {
        await newUser.save();
    } catch (error) {
        throw mapDBErrors(error);
    }

    return {
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic
    }
}

export const signInService = async(userName, password) => {    
    const user = await User.findOne({userName})
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

    if(!user || !isPasswordCorrect) throw new InvalidCredentialsError()

    return {
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic
    }
}