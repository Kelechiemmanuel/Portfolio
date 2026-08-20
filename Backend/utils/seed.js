require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const pool = require('../config/db')

const START_HOUR = 9
const END_HOUR = 17
const DAY_AHEAD = 60

function isWeekend(date) {
    const day = date.getDay()
    return day === 0 || day === 6
}

function formatDate(d) {
    return d.toISOString().slice(0, 10)
}

function formatTime(hour) {
    return `${String(hour).padStart(2, '0')}:00:00`
}

async function seed() {
    const today = new Date()
    let inserted = 0

    for (let i = 0; i < DAY_AHEAD; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i);

        if (isWeekend(date)) continue

        for (let hour = START_HOUR; hour < END_HOUR; hour++) {
            await pool.query(`
                INSERT INTO availability_slots (date, time, is_booked)
                VALUES($1, $2, FALSE)
                ON CONFLICT (date, time) DO NOTHING`,
                [formatDate(date), formatTime(hour)]
            )
            inserted++
        }
    }
    console.log(`Seeded up to ${inserted} slots.`);
    await pool.end();
}

seed()