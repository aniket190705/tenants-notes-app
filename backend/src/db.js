const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('MONGODB_URI:', MONGODB_URI)
if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in env')
    process.exit(1)
}

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

module.exports = { connectDB, mongoose }
