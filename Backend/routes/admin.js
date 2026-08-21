const express = require('express')
const router = express.Router()
const { getAllBookings } = require('../controllers/adminController')
const { authToken } = require('../middleware/authMiddleware')

router.get('/bookings', authToken, getAllBookings)

module.exports = router