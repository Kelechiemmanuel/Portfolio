const pool = require('../config/db')
const { sendBookingNotification } = require('../utils/mailer')

const createBooking = async (req, res) => {
    console.log('Incoming booking body:', req.body);
    const { date, time, name, email, note, duration } = req.body;

    if (!date || !time || !name || !email || !duration) {
        return res.status(400).json({ error: 'date, time, name, email, and duration are required.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const slotResult = await client.query(
            `SELECT id, is_booked FROM availability_slots
            WHERE date = $1 AND time = $2
            FOR UPDATE`,
            [date, time]
        );

        if (slotResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'That slot does not exist.' });
        }
        if (slotResult.rows[0].is_booked) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'That slot is no longer available.' });
        }

        const slotId = slotResult.rows[0].id;

        await client.query(
            `UPDATE availability_slots SET is_booked = TRUE WHERE id = $1`,
            [slotId]
        );

        const bookingResult = await client.query(
            `INSERT INTO bookings (slot_id, name, email, note, duration_minutes)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [slotId, name, email, note || null, duration]
        );
        await client.query('COMMIT');

        sendBookingNotification({ ...bookingResult.rows[0], date, time })
            .catch(err => console.error('Failed to send notification email:', err));

        res.status(201).json(bookingResult.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Booking failed.' });
    } finally {
        client.release();
    }
}

module.exports = { createBooking };