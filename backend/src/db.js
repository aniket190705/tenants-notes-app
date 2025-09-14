// src/db.js
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = "mongodb+srv://aniket190705_db_user:OPOFFyeojKghDtjT@cluster0.x4uo7nr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log('MONGODB_URI:', MONGODB_URI)
if (!MONGODB_URI) {
    console.error('MONGODB_URI not set in env')
    process.exit(1)
}

let cached = global._mongoose

if (!cached) {
    cached = global._mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) return cached.conn
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(m => m)
    }
    cached.conn = await cached.promise
    return cached.conn
}

module.exports = { connectDB, mongoose }
