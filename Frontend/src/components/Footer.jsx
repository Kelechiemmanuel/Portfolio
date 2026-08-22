import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='w-full'>
            <div className='grid grid-cols-2 px-10 py-20 lg:px-40'>
                <div className='w-[60%]'>
                    <div className='mb-5'>
                        <h1 className='font-bold'>A K E S T A C K</h1>
                        <div>
                            <p className='h-3 w-3 rounded-full border'></p>
                            <p className='h-3 w-10 border rounded-2xl flex justify-between items-center p-1'>
                                <p>&lt; /&gt;</p>
                            </p>
                        </div>
                    </div>
                    <p className='text-[14px]'>
                        A software development company that creates high-quality, reliable applications for startups that have received investment funding.
                    </p>
                </div>
                <div className='flex justify-between'>
                    <div className=''>
                        <h1 className='font-bold mb-5'>P R O D U CT</h1>
                        <div className='flex flex-col gap-3 text-[12px]'>
                            <Link to='/about'>ABOUT US</Link>
                            <Link to='/services'>SERVICES</Link>
                            <Link to='/'>BOOK US</Link>
                        </div>
                    </div>
                    <div className=''>
                        <h1 className='font-bold mb-5'>C O M P A N Y</h1>
                        <div className='flex flex-col gap-3 text-[12px]'>
                            <Link to='/about'>ABOUT US</Link>
                            <Link to='/services'>SERVICES</Link>
                            <Link to='/'>BOOK US</Link>
                        </div>
                    </div>
                    <div className=''>
                        <h1 className='font-bold mb-5'>S O C I A L S</h1>
                        <div className='flex flex-col gap-3 text-[12px]'>
                            <Link to='/about'>ABOUT US</Link>
                            <Link to='/services'>SERVICES</Link>
                            <Link to='/'>BOOK US</Link>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='dark:border-gray-600 border-gray-300 pb-10' />

            {/* <div className='mb-20'></div> */}
        </div>
    )
}

export default Footer