import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const dbURI = process.env.DB_URI;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(dbURI)
        console.log('INFO: Connected to MongoDB')
    } catch (error) {
        console.log('ERROR (Error connecting to MongoDB): ', error.message)
    }
}

export default connectToMongoDB