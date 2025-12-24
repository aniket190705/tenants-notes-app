require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectDB } = require('./db')
const authRoutes = require('../routes/auth')
const notesRoutes = require('../routes/notes')

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://rbac-notes-app.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}))


app.use(bodyParser.json())

connectDB().then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('DB connect error', err)
})


app.use('/api/v1/', authRoutes)
app.use('/api/v1/notes', notesRoutes)


app.use((req, res) => res.status(404).json({ error: 'Not found' }))

module.exports = app
