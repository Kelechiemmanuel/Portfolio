const pool = require('../config/db')

const getAllBookings = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT b.id, b.name, b.email, b.note, b.duration_minutes, b.created_at, s.date, s.time
            FROM bookings b
            JOIN availability_slots s ON b.slot_id = s.id
            ORDER BY s.date, s.time
            `)
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch bookings.'
        })
    }
}


module.exports = { getAllBookings }