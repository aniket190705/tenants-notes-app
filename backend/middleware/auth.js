// src/middleware/auth.js
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret'

function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' })
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (e) {
        return null
    }
}

// returns { user, tenant } or null
async function getUserFromReq(req) {
    const auth = req.headers['authorization'] || ''
    const m = auth.match(/^Bearer (.+)$/)
    if (!m) return null
    const token = m[1]
    const payload = verifyToken(token)
    if (!payload || !payload.userId) return null
    const user = await User.findById(payload.userId).lean()

    if (!user) return null
    return user
}

module.exports = { signToken, verifyToken, getUserFromReq }
