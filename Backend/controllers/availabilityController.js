// controllers/availabilityController.js
const pool = require('../config/db')

const getAvailability = async (req, res) => {
    const { slug } = req.params
    const { month } = req.query

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({ message: 'Query param "month" must be in YYYY-MM format.' })
    }

    try {
        const userResult = await pool.query('SELECT id FROM users WHERE slug = $1', [slug])
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'No booking page found for that link.' })
        }
        const userId = userResult.rows[0].id

        const result = await pool.query(
            `SELECT to_char(date, 'YYYY-MM-DD') AS date, time, is_booked
             FROM availability_slots
             WHERE user_id = $1 AND to_char(date, 'YYYY-MM') = $2
             ORDER BY date, time`,
            [userId, month]
        )
        return res.status(200).json(result.rows)
    } catch (error) {
        console.error('Get availability error:', error)
        return res.status(500).json({ message: 'Failed to fetch availability.' })
    }
}

module.exports = { getAvailability }