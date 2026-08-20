import React, { useState, useMemo, useEffect } from 'react'

const API_BASE = 'https://portfolio-ukyo.onrender.com/api' // swap for your deployed URL later

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const DURATIONS = [
    { id: 15, label: "15 min", desc: "Quick chat" },
    { id: 30, label: "30 min", desc: "Standard call" },
    { id: 60, label: "60 min", desc: "Deep dive" },
]

function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()) }
function addMonths(d, n) { return new Date(d.getFullYear(), d.getMonth() + n, 1) }
function sameDay(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate() }
function isPast(d, today) { return startOfDay(d).getTime() < startOfDay(today).getTime() }
function toISODate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
function formatLong(d) { return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` }
function formatSlotLabel(time) {
    const [hStr] = time.split(':')
    const h = parseInt(hStr, 10)
    return h < 12 ? `${h}:00 AM` : `${h === 12 ? 12 : h - 12}:00 PM`
}

function buildMonthGrid(year, month) {
    const first = new Date(year, month, 1)
    const startOffset = (first.getDay() + 6) % 7
    const gridStart = new Date(year, month, 1 - startOffset)
    const cells = []
    for (let i = 0; i < 42; i++) cells.push(new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i))
    const weeks = []
    for (let i = 0; i < 6; i++) {
        const week = cells.slice(i * 7, i * 7 + 7)
        if (week.some((d) => d.getMonth() === month)) weeks.push(week)
    }
    return weeks
}

const Booking = () => {
    const [pop, setPop] = useState(false)
    const today = useMemo(() => startOfDay(new Date()), [])

    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
    const [selectedDate, setSelectedDate] = useState(today)
    const [monthSlots, setMonthSlots] = useState({})
    const [loadingSlots, setLoadingSlots] = useState(false)

    const [duration, setDuration] = useState(30)
    const [selectedTime, setSelectedTime] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [note, setNote] = useState('')
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [confirmed, setConfirmed] = useState(null)

    const grid = useMemo(() => buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth()), [viewDate])

    useEffect(() => {
        if (!pop) return
        const monthKey = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}`
        setLoadingSlots(true)
        fetch(`${API_BASE}/availability?month=${monthKey}`)
            .then(r => r.json())
            .then(rows => {
                const grouped = {}
                rows.forEach(row => {
                    if (!grouped[row.date]) grouped[row.date] = []
                    grouped[row.date].push(row)
                })
                setMonthSlots(grouped)
            })
            .catch(() => setErrors({ general: 'Could not load availability.' }))
            .finally(() => setLoadingSlots(false))
    }, [viewDate, pop])

    const selectedSlots = monthSlots[toISODate(selectedDate)] || []

    function availabilityLevel(day) {
        if (isPast(day, today) && !sameDay(day, today)) return -1
        const daySlots = monthSlots[toISODate(day)]
        if (!daySlots) return -1
        const free = daySlots.filter(s => !s.is_booked).length
        if (free === 0) return 0
        if (free <= 2) return 1
        if (free <= 4) return 2
        return 3
    }

    function pickDate(day) {
        if (isPast(day, today) && !sameDay(day, today)) return
        if (day.getMonth() !== viewDate.getMonth()) setViewDate(new Date(day.getFullYear(), day.getMonth(), 1))
        setSelectedDate(day)
        setSelectedTime(null)
        setErrors({})
    }

    async function submit() {
        const errs = {}
        if (!selectedTime) errs.time = 'Pick a time slot first.'
        if (!name.trim()) errs.name = 'Enter your name.'
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email.'
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setSubmitting(true)
        try {
            const res = await fetch(`${API_BASE}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: toISODate(selectedDate), time: selectedTime, name, email, note, duration }),
            })
            if (res.status === 409) {
                setErrors({ time: 'That slot was just taken — pick another.' })
                setSelectedTime(null)
                return
            }
            if (!res.ok) {
                setErrors({ general: 'Something went wrong. Try again.' })
                return
            }
            const data = await res.json()
            setConfirmed({ ...data, dateObj: selectedDate })
        } catch {
            setErrors({ general: 'Network error — check your connection.' })
        } finally {
            setSubmitting(false)
        }
    }

    function resetBooking() {
        setConfirmed(null)
        setSelectedTime(null)
        setName('')
        setEmail('')
        setNote('')
        setErrors({})
    }

    function closeModal() {
        setPop(false)
        resetBooking()
    }

    return (
        <div className='transition-colors duration-300'>
            <button onClick={() => setPop(true)} className='cursor-pointer border border-gray-800 py-2 px-5 rounded-sm dark:bg-white dark:text-[#0F172A] font-bold text-sm'>Book A Session</button>

            <div className={`fixed inset-0 z-9999 transition-all duration-500 ease-in-out bg-black/90 left-0 h-screen
                ${pop ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
                {pop && (
                    <div className='fixed inset-0 z-9999'>
                        <div onClick={closeModal} />

                        <div className='absolute inset-y-0 right-0 w-full sm:max-w-xl'>
                            <div className='h-screen w-full bg-white dark:bg-[#0F172A] rounded-l-2xl relative overflow-y-auto text-[#0F172A] dark:text-white'>
                                <button className='absolute right-5 top-5 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700' onClick={closeModal}>×</button>

                                <div className='p-6 sm:p-8'>
                                    <div className='mb-6'>
                                        <div className='text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-1'>&gt;_ Book a session</div>
                                        <h2 className='text-xl font-bold'>Book time with us</h2>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Pick a date, a slot, and a length — we'll confirm by email.</p>
                                    </div>

                                    {confirmed ? (
                                        <div className='border border-gray-200 dark:border-gray-700 rounded-xl p-6'>
                                            <div className='text-xs font-mono text-gray-500 dark:text-gray-400 mb-1'>$ booking --confirm</div>
                                            <div className='text-lg font-bold text-green-600 dark:text-green-400 mb-2'>✓ Confirmed</div>
                                            <div className='text-sm'>{formatLong(confirmed.dateObj)} at {formatSlotLabel(selectedTime)}</div>
                                            <div className='text-sm'>{confirmed.duration_minutes} min — {confirmed.name}</div>
                                            <div className='text-xs text-gray-500 dark:text-gray-400 mt-2 mb-4'>A calendar invite will be sent to {confirmed.email}.</div>
                                            <button onClick={resetBooking} className='border border-gray-800 dark:border-gray-300 py-2 px-4 rounded-sm text-sm font-bold'>Book another slot</button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className='text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2'>Duration</div>
                                            <div className='flex gap-2 mb-5'>
                                                {DURATIONS.map(d => (
                                                    <button
                                                        key={d.id}
                                                        onClick={() => setDuration(d.id)}
                                                        className={`flex-1 text-left px-3 py-2 rounded-lg border text-sm
                                                            ${duration === d.id
                                                                ? 'border-[#0F172A] dark:border-white bg-gray-100 dark:bg-gray-800'
                                                                : 'border-gray-200 dark:border-gray-700'}`}
                                                    >
                                                        <div className='font-bold'>{d.label}</div>
                                                        <div className='text-xs text-gray-500 dark:text-gray-400'>{d.desc}</div>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className='border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-5'>
                                                <div className='flex items-center justify-between mb-3'>
                                                    <button onClick={() => setViewDate(addMonths(viewDate, -1))} className='w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600'>‹</button>
                                                    <span className='font-bold text-sm'>{MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
                                                    <button onClick={() => setViewDate(addMonths(viewDate, 1))} className='w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600'>›</button>
                                                </div>
                                                <div className='grid grid-cols-7 gap-1 mb-1'>
                                                    {DAY_LABELS.map(d => <span key={d} className='text-[10px] text-center font-bold text-gray-500 dark:text-gray-400'>{d}</span>)}
                                                </div>
                                                {grid.map((week, wi) => (
                                                    <div className='grid grid-cols-7 gap-1' key={wi}>
                                                        {week.map((day, di) => {
                                                            const outside = day.getMonth() !== viewDate.getMonth()
                                                            const level = availabilityLevel(day)
                                                            const disabled = outside || level === -1
                                                            const selected = sameDay(day, selectedDate)
                                                            return (
                                                                <button
                                                                    key={di}
                                                                    disabled={disabled}
                                                                    onClick={() => pickDate(day)}
                                                                    className={`h-9 rounded-md text-xs font-semibold flex flex-col items-center justify-center gap-0.5
                                                                        ${disabled ? 'text-gray-300 dark:text-gray-600' : ''}
                                                                        ${selected ? 'bg-[#0F172A] text-white dark:bg-[#0F172A] dark:text-[#0F172A]' : ''}`}
                                                                >
                                                                    <span>{day.getDate()}</span>
                                                                    {!disabled && (
                                                                        <span className={`w-1 h-1 rounded-full
                                                                            ${selected ? 'bg-white dark:bg-[#0F172A]' :
                                                                                level === 0 ? 'bg-gray-300 dark:bg-gray-600' :
                                                                                    level === 1 ? 'bg-green-300' :
                                                                                        level === 2 ? 'bg-green-500' : 'bg-green-600'}`}
                                                                        />
                                                                    )}
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className='text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2'>{formatLong(selectedDate)}</div>
                                            <div className='bg-[#0F172A] rounded-xl p-2 mb-1 flex flex-col gap-0.5'>
                                                {loadingSlots ? (
                                                    <div className='text-gray-400 text-xs font-mono p-3'>Loading…</div>
                                                ) : selectedSlots.length === 0 ? (
                                                    <div className='text-gray-400 text-xs font-mono p-3'>No slots today — try a weekday.</div>
                                                ) : (
                                                    selectedSlots.map(slot => (
                                                        <button
                                                            key={slot.time}
                                                            disabled={slot.is_booked}
                                                            onClick={() => setSelectedTime(slot.time)}
                                                            className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono text-left
                                                                ${slot.is_booked ? 'text-gray-600' : 'text-gray-200'}
                                                                ${selectedTime === slot.time ? 'bg-white/10 text-white' : ''}`}
                                                        >
                                                            <span className='w-2 text-green-500'>{selectedTime === slot.time ? '>' : ''}</span>
                                                            <span className='flex-1'>{formatSlotLabel(slot.time)}</span>
                                                            <span className='opacity-70'>{slot.is_booked ? 'booked' : selectedTime === slot.time ? 'selected' : 'open'}</span>
                                                        </button>
                                                    ))
                                                )}
                                            </div>
                                            {errors.time && <div className='text-xs text-red-600 dark:text-red-400 mb-3'>{errors.time}</div>}

                                            <div className='border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col gap-3 mt-4'>
                                                <label className='flex flex-col gap-1'>
                                                    <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>Name</span>
                                                    <input value={name} onChange={e => setName(e.target.value)} placeholder='Enter your fullname'
                                                        className='border border-gray-300 dark:border-gray-600 bg-transparent rounded-md px-3 py-2 text-sm outline-none' />
                                                    {errors.name && <span className='text-xs text-red-600 dark:text-red-400'>{errors.name}</span>}
                                                </label>
                                                <label className='flex flex-col gap-1'>
                                                    <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>Email</span>
                                                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder='your@email.com'
                                                        className='border border-gray-300 dark:border-gray-600 bg-transparent rounded-md px-3 py-2 text-sm outline-none' />
                                                    {errors.email && <span className='text-xs text-red-600 dark:text-red-400'>{errors.email}</span>}
                                                </label>
                                                <label className='flex flex-col gap-1'>
                                                    <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>What's this about? (optional)</span>
                                                    <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder='A short note helps me prepare.'
                                                        className='border border-gray-300 dark:border-gray-600 bg-transparent rounded-md px-3 py-2 text-sm outline-none resize-none' />
                                                </label>
                                                {errors.general && <div className='text-xs text-red-600 dark:text-red-400'>{errors.general}</div>}
                                                <button onClick={submit} disabled={submitting}
                                                    className='mt-1 py-2.5 rounded-md bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] font-bold text-sm disabled:opacity-50 cursor-pointer'>
                                                    {submitting ? 'Booking…' : 'Confirm booking'}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Booking