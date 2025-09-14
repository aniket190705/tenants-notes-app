// src/models/Tenant.js
const { mongoose } = require('../src/db')
const { Schema } = require('mongoose')

const TenantSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    plan: { type: String, enum: ['free', 'pro'], default: 'free' }
}, { timestamps: true })

module.exports = mongoose.models?.Tenant || mongoose.model('Tenant', TenantSchema)
