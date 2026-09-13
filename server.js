require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const applicationRoutes = require('./routes/applicationRoutes')

const app = express()

connectDB()

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationRoutes)

app.get('/', (req, res) => {
    res.json({
        message : "JobTrack API is running"
    })
})

app.get('/api/test-protected', authMiddleware, (req, res) => {
    res.json({
        message : "You accessed a protected route",
        userId : req.userId
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})