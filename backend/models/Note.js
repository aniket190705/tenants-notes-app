const { mongoose } = require('../src/db')
const { Schema } = require('mongoose')

const NoteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.models?.Note || mongoose.model('Note', NoteSchema)
