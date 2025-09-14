// src/models/Note.js
const { mongoose } = require('../src/db')
const { Schema } = require('mongoose')

const NoteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, default: '' },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.models?.Note || mongoose.model('Note', NoteSchema)
