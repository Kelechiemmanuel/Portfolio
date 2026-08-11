import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../utils/ThemeToggle'
import Booking from '../features/Booking'

const Navbar = () => {
    return (
        <header className='fixed left-0 right-0 z-2000 border-b px-40 bg-white dark:bg-[#0F172A] border-b-gray-400 dark:border-b-gray-800'>
            <nav className='flex justify-between py-5 '>
                <h1 className='font-bold'>AKE</h1>

                <div className='flex gap-6 font-light dark:text-gray-400'>
                    <Link to='/'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/testimonies'>Testimonies</Link>
                    <Link to='/blog'>Blog</Link>
                </div>

                <div className='flex gap-10'>
                    <ThemeToggle />
                    <Booking />
                </div>
                {/* <Link to='/account'>Account</Link> */}
            </nav>

        </header>
    )
}

export default Navbar