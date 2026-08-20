const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendBookingNotification(booking) {
    const { name, email, note, date, time, duration_minutes } = booking;

    await resend.emails.send({
        from: 'Portfolio Bookings <onboarding@resend.dev>', // Resend's shared sending domain for testing
        to: process.env.NOTIFY_EMAIL,
        reply_to: email,
        subject: `New booking: ${name} — ${date} ${time}`,
        text: `
    Name: ${name}
    Email: ${email}
    Date: ${date}
    Time: ${time}
    Duration: ${duration_minutes} min
    Note: ${note || '(none)'}
    `.trim(),
    });
}

module.exports = { sendBookingNotification };