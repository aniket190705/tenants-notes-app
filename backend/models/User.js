// src/models/User.js
const { mongoose } = require('../src/db')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true }
}, { timestamps: true })

module.exports = mongoose.models?.User || mongoose.model('User', UserSchema)
