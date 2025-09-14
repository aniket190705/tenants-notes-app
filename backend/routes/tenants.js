// src/routes/tenants.js
const express = require('express')
const router = express.Router()
const Tenant = require('../models/Tenant')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { getUserFromReq } = require('../middleware/auth')

// POST /api/tenants/:slug/upgrade  (Admin only)
router.post('/:slug/upgrade', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { user } = ctx
        const slug = req.params.slug
        const tenant = await Tenant.findOne({ slug })
        if (!tenant) return res.status(404).json({ error: 'Not found' })
        if (tenant._id.toString() !== user.tenantId.toString()) return res.status(403).json({ error: 'Forbidden' })
        if (user.role !== 'admin') return res.status(403).json({ error: 'Only admin can upgrade' })
        tenant.plan = 'pro'
        await tenant.save()
        return res.json({ ok: true, plan: 'pro' })
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

// POST /api/tenants/:slug/invite  (Admin only) - simple create user
// body: { email, role }
router.post('/:slug/invite', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { user } = ctx
        const slug = req.params.slug
        const tenant = await Tenant.findOne({ slug })
        if (!tenant) return res.status(404).json({ error: 'Not found' })
        if (tenant._id.toString() !== user.tenantId.toString()) return res.status(403).json({ error: 'Forbidden' })
        if (user.role !== 'admin') return res.status(403).json({ error: 'Only admin can invite' })
        const { email, role } = req.body
        if (!email || !role) return res.status(400).json({ error: 'email and role required' })
        const existing = await User.findOne({ email })
        if (existing) return res.status(400).json({ error: 'User exists' })
        const pw = 'password' // for assignment convenience (or generate random and email)
        const hash = await bcrypt.hash(pw, 10)
        const newUser = await User.create({ email, password: hash, role, tenantId: tenant._id })
        return res.json({ ok: true, email: newUser.email, password: pw })
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router
