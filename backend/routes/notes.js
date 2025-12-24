// src/routes/notes.js
const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const { getUserFromReq } = require('../middleware/auth')

// GET /api/notes - list notes for tenant
// POST /api/notes - create note (enforce free plan limit)
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        return res.json(notes)
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body
        if (!title) return res.status(400).json({ error: 'Title is required' })
        const note = await Note.create({ title, content: content })
        return res.status(201).json(note)
    } catch (e) {
        console.error(e); return res.status(500).json({ error: 'Server error' })
    }
})

// PUT /api/notes/:id
router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({ error: 'Not found' })
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
        const user = await getUserFromReq(req); // decoded from JWT
        console.log(user)
        if (user.role !== "admin") {
            return res.status(403).json({ error: "Only admins can delete notes" });
        }

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Not found" });

        await note.deleteOne();
        return res.json({ ok: true });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Server error" });
    }
});


module.exports = router
