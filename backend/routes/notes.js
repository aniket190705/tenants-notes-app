// src/routes/notes.js
const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const { getUserFromReq } = require('../middleware/auth')

// GET /api/notes - list notes for tenant
// POST /api/notes - create note (enforce free plan limit)
router.get('/', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { tenant } = ctx
        const notes = await Note.find({ tenantId: tenant._id }).sort({ createdAt: -1 })
        return res.json(notes)
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

router.post('/', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { user, tenant } = ctx
        // enforce free plan limit
        if (tenant.plan === 'free') {
            const count = await Note.countDocuments({ tenantId: tenant._id })
            if (count >= 3) return res.status(403).json({ error: 'Free plan limit reached' })
        }
        const { title, content } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })
        const note = await Note.create({ title, content: content || '', tenantId: tenant._id, authorId: user._id })
        return res.status(201).json(note)
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

// GET /api/notes/:id
router.get('/:id', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { tenant } = ctx
        const note = await Note.findById(req.params.id)
        if (!note || note.tenantId.toString() !== tenant._id.toString()) return res.status(404).json({ error: 'Not found' })
        return res.json(note)
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

// PUT /api/notes/:id
router.put('/:id', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { tenant } = ctx
        const note = await Note.findById(req.params.id)
        if (!note || note.tenantId.toString() !== tenant._id.toString()) return res.status(404).json({ error: 'Not found' })
        const { title, content } = req.body
        if (title !== undefined) note.title = title
        if (content !== undefined) note.content = content
        await note.save()
        return res.json(note)
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

// DELETE /api/notes/:id
router.delete('/:id', async (req, res) => {
    try {
        const ctx = await getUserFromReq(req)
        if (!ctx) return res.status(401).json({ error: 'unauthenticated' })
        const { tenant } = ctx
        const note = await Note.findById(req.params.id)
        if (!note || note.tenantId.toString() !== tenant._id.toString()) return res.status(404).json({ error: 'Not found' })
        await note.deleteOne()
        return res.json({ ok: true })
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

module.exports = router
