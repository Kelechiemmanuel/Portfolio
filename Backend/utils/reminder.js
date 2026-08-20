const cron = require('node-cron');
const pool = require('../config/db');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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
            const result = await resend.emails.send({
                from: 'Kelechi <onboarding@resend.dev>',
                to: booking.email,
                subject: `Reminder: your session in about an hour`,
                text: `Hi ${booking.name},\n\nJust a reminder — your ${booking.duration_minutes}-minute session is coming up at ${booking.time} on ${booking.date}.\n\nSee you soon.`,
            });

            if (result.error) {
                console.error(`Resend error for booking ${booking.id}:`, result.error);
                continue; // don't mark as sent if it actually failed
            }

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