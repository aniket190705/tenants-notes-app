// src/routes/auth.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { signToken } = require('../middleware/auth')

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(password)
        if (!email || !password) return res.status(400).json({ error: 'Missing credentials' })
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ error: 'Invalid credentials' })
        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
        const token = signToken({ userId: user._id, role: user.role })
        return res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router
