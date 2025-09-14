// src/seed.js
require('dotenv').config()
const { connectDB } = require('./db')
const bcrypt = require('bcryptjs')
const Tenant = require('../models/Tenant')
const User = require('../models/User')

async function main() {
    await connectDB()
    console.log('Seeding DB...')

    const pwHash = await bcrypt.hash('password', 10)

    const acme = await Tenant.findOneAndUpdate(
        { slug: 'acme' },
        { name: 'Acme', slug: 'acme', plan: 'free' },
        { upsert: true, new: true }
    )
    const globex = await Tenant.findOneAndUpdate(
        { slug: 'globex' },
        { name: 'Globex', slug: 'globex', plan: 'free' },
        { upsert: true, new: true }
    )

    await User.findOneAndUpdate(
        { email: 'admin@acme.test' },
        { email: 'admin@acme.test', password: pwHash, role: 'admin', tenantId: acme._id },
        { upsert: true }
    )
    await User.findOneAndUpdate(
        { email: 'user@acme.test' },
        { email: 'user@acme.test', password: pwHash, role: 'member', tenantId: acme._id },
        { upsert: true }
    )
    await User.findOneAndUpdate(
        { email: 'admin@globex.test' },
        { email: 'admin@globex.test', password: pwHash, role: 'admin', tenantId: globex._id },
        { upsert: true }
    )
    await User.findOneAndUpdate(
        { email: 'user@globex.test' },
        { email: 'user@globex.test', password: pwHash, role: 'member', tenantId: globex._id },
        { upsert: true }
    )

    console.log('Seed completed. Default password for seeded users: "password"')
    process.exit(0)
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
