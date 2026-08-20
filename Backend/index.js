
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./config/db')

app.use(cors())
app.use(express.json())

app.use('/api/availability', require('./routes/availabilityRoute'))
app.use('/api/bookings', require('./routes/bookingsRoute'))

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})