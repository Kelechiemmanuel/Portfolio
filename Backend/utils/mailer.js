const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    family: 4, // force IPv4 — fixes ENETUNREACH on hosts with broken IPv6 routing
});

async function sendBookingNotification(booking) {
    const { name, email, note, date, time, duration_minutes } = booking;

    await transporter.sendMail({
        from: `"Portfolio Bookings" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        replyTo: email, // lets you hit "reply" and it goes straight to the booker
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