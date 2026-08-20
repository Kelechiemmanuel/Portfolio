
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./config/db')
const { startReminderJob } = require('./utils/reminder')

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-frontend.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())

app.use('/api/availability', require('./routes/availabilityRoute'))
app.use('/api/bookings', require('./routes/bookingsRoute'))

const PORT = process.env.PORT || 3005
startReminderJob()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})