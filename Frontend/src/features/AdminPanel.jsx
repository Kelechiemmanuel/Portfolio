import React, { useState, useEffect, useCallback } from 'react'
import api from '../../config/api'

function formatDateTime(date, time) {
    const [hStr] = time.split(':')
    const h = parseInt(hStr, 10)
    const label = h < 12 ? `${h}:00 AM` : `${h === 12 ? 12 : h - 12}:00 PM`
    return `${date} · ${label}`
}

const AdminPanel = () => {
    const [token, setToken] = useState(() => localStorage.getItem('adminToken'))

    // ----- login form state -----
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)

    // ----- dashboard state -----
    const [bookings, setBookings] = useState([])
    const [loadingBookings, setLoadingBookings] = useState(false)
    const [fetchError, setFetchError] = useState('')

    const fetchBookings = useCallback(async () => {
        setLoadingBookings(true)
        setFetchError('')
        try {
            const { data } = await api.get('/admin/bookings')
            setBookings(data)
        } catch (err) {
            if (err.response?.status === 401) {
                // api.js's response interceptor already cleared the token — just update local state
                setToken(null)
                setFetchError('Session expired — please log in again.')
                return
            }
            setFetchError(err.response ? 'Could not load bookings.' : 'Network error — check your connection.')
        } finally {
            setLoadingBookings(false)
        }
    }, [])

    useEffect(() => {
        if (token) fetchBookings()
    }, [token, fetchBookings])

    async function handleLogin(e) {
        e.preventDefault()
        setLoginError('')
        if (!email.trim() || !password.trim()) {
            setLoginError('Enter both email and password.')
            return
        }
        setLoggingIn(true)
        try {
            const { data } = await api.post('/auth/login', { email, password })
            localStorage.setItem('adminToken', data.token)
            setToken(data.token)
            setPassword('')
        } catch (err) {
            setLoginError(err.response?.data?.message || 'Invalid email or password.')
        } finally {
            setLoggingIn(false)
        }
    }

    function handleLogout() {
        localStorage.removeItem('adminToken')
        setToken(null)
        setBookings([])
    }

    // ---------------- LOGIN VIEW ----------------
    if (!token) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white px-4'>
                <form onSubmit={handleLogin} className='w-full max-w-sm border border-gray-200 dark:border-gray-700 rounded-2xl p-8'>
                    <div className='text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-1'>&gt;_ Admin</div>
                    <h1 className='text-xl font-bold mb-6'>Sign in to manage bookings</h1>

                    <label className='flex flex-col gap-1 mb-4'>
                        <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>Email</span>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='you@example.com'
                            className='border border-gray-300 dark:border-gray-600 bg-transparent rounded-md px-3 py-2 text-sm outline-none'
                        />
                    </label>

                    <label className='flex flex-col gap-1 mb-5'>
                        <span className='text-xs font-bold text-gray-500 dark:text-gray-400'>Password</span>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='border border-gray-300 dark:border-gray-600 bg-transparent rounded-md px-3 py-2 text-sm outline-none'
                        />
                    </label>

                    {loginError && <div className='text-xs text-red-600 dark:text-red-400 mb-4'>{loginError}</div>}

                    <button
                        type='submit'
                        disabled={loggingIn}
                        className='w-full py-2.5 rounded-md bg-[#0F172A] text-white dark:bg-white dark:text-[#0F172A] font-bold text-sm disabled:opacity-50 cursor-pointer'
                    >
                        {loggingIn ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>
            </div>
        )
    }

    // ---------------- DASHBOARD VIEW ----------------
    return (
        <div className='min-h-screen bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white px-4 sm:px-8 py-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <div className='text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-1'>&gt;_ Admin</div>
                        <h1 className='text-xl font-bold'>Bookings</h1>
                    </div>
                    <div className='flex gap-2'>
                        <button
                            onClick={fetchBookings}
                            className='border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-xs font-bold cursor-pointer'
                        >
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className='border border-gray-800 dark:border-gray-300 rounded-md px-3 py-1.5 text-xs font-bold cursor-pointer'
                        >
                            Log out
                        </button>
                    </div>
                </div>

                {fetchError && (
                    <div className='text-xs text-red-600 dark:text-red-400 mb-4'>{fetchError}</div>
                )}

                {loadingBookings ? (
                    <div className='text-sm text-gray-500 dark:text-gray-400 font-mono'>Loading…</div>
                ) : bookings.length === 0 ? (
                    <div className='text-sm text-gray-500 dark:text-gray-400 font-mono'>No bookings yet.</div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        {bookings.map((b) => (
                            <div
                                key={b.id}
                                className='border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'
                            >
                                <div>
                                    <div className='font-bold text-sm'>{b.name}</div>
                                    <div className='text-xs text-gray-500 dark:text-gray-400'>{b.email}</div>
                                    {b.note && <div className='text-xs mt-1 text-gray-600 dark:text-gray-300'>"{b.note}"</div>}
                                </div>
                                <div className='text-right'>
                                    <div className='font-mono text-sm'>{formatDateTime(b.date, b.time)}</div>
                                    <div className='text-xs text-gray-500 dark:text-gray-400'>{b.duration_minutes} min</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminPanel