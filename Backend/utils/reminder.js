const cron = require('node-cron');
const pool = require('../config/db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendReminders() {
    const { rows } = await pool.query(`
    SELECT b.id, b.name, b.email, b.duration_minutes,
           s.date, s.time
    FROM bookings b
    JOIN availability_slots s ON b.slot_id = s.id
    WHERE b.reminder_sent = FALSE
      AND (s.date + s.time) BETWEEN NOW() AND NOW() + INTERVAL '1 hour'
  `);

    for (const booking of rows) {
        try {
            await transporter.sendMail({
                from: `"Kelechi" <${process.env.EMAIL_USER}>`,
                to: booking.email,
                subject: `Reminder: your session in about an hour`,
                text: `Hi ${booking.name},\n\nJust a reminder — your ${booking.duration_minutes}-minute session is coming up at ${booking.time} on ${booking.date}.\n\nSee you soon.`,
            });

            await pool.query(`UPDATE bookings SET reminder_sent = TRUE WHERE id = $1`, [booking.id]);
        } catch (err) {
            console.error(`Failed to send reminder for booking ${booking.id}:`, err);
        }
    }
}

function startReminderJob() {
    // runs every 10 minutes
    cron.schedule('*/10 * * * *', () => {
        sendReminders().catch(err => console.error('Reminder job failed:', err));
    });
}

module.exports = { startReminderJob };