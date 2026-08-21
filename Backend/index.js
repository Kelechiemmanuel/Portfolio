
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { startReminderJob } = require('./utils/reminder')

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://portfolio-nine-theta-10.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())

app.use('/api/admin', require('./routes/admin'))
app.use('/api/availability', require('./routes/availabilityRoute'))
app.use('/api/bookings', require('./routes/bookingsRoute'))
app.use('/api/auth', require('./routes/authRoute'))

const PORT = process.env.PORT || 3005
startReminderJob()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})