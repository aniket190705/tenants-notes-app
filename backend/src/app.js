// src/app.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectDB } = require('./db')
const authRoutes = require('../routes/auth')
const notesRoutes = require('../routes/notes')
const tenantsRoutes = require('../routes/tenants')

const app = express()

// ✅ CORS must come first
app.use(cors({
    origin: 'http://localhost:5173',  // your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))

// ✅ Parse JSON before routes
app.use(bodyParser.json())

// ✅ Tenant middleware AFTER CORS + JSON
// app.use(tenantMiddleware)

// DB connect
connectDB().then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('DB connect error', err)
})

// Health endpoint
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
// app.use("/tenants", tenantRoutes);
// app.use("/tenants", notesRoutes);

// API routes
app.use('/api', authRoutes)         // /api/login
app.use('/api/notes', notesRoutes)  // /api/notes
app.use('/api/tenants', tenantsRoutes) // /api/tenants/:slug/...

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }))

module.exports = app
