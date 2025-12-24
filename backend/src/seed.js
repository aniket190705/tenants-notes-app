// src/seed.js
require('dotenv').config()
const { connectDB } = require('./db')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

async function main() {
    await connectDB()
    console.log('Seeding DB...')

    const adminHash = await bcrypt.hash('admin', 10)
    const userHash = await bcrypt.hash('user', 10)

    await User.findOneAndUpdate(
        { email: 'admin@test.com' },
        { email: 'admin@test.com', password: adminHash, role: 'admin' },
        { upsert: true }
    )
    await User.findOneAndUpdate(
        { email: 'user@test.com' },
        { email: 'user@test.com', password: userHash, role: 'user' },
        { upsert: true }
    )

    console.log('Seed completed. Default password for seeded users: "user"')
    process.exit(0)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
