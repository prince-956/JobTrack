const express = require('express')
require('dotenv').config()

const app = express()

// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message : "JobTrack API is running"
    })
})

// start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})