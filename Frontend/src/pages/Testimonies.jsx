import React from 'react'
import { FaStar } from "react-icons/fa";

const Testimonies = () => {
    return (
        <div className='h-full w-full dark:bg-white bg-[#0F172A] text-white dark:text-[#0F172A] px-40 py-40'>
            <div className='flex justify-center items-center gap-30'>
                <div className='w-[60%]'>
                    <p>TESTIMONIES...</p>
                    <h1 className='font-medium text-5xl leading-15 py-5'>Built for Scale</h1>
                    <p>Built to perform. Proven in production.</p>
                    <hr className='dark:border-gray-300 border-gray-600 my-10' />
                    <div className='flex gap-10 items-center justify-start mb-10'>
                        <div>
                            <p className='text-2xl font-bold'>35+</p>
                            <p>Global Client</p>
                        </div>
                        <div className='h-12 w-0.5 dark:bg-gray-300 bg-gray-700' />
                        <div>
                            <p className='text-2xl font-bold'>25+</p>
                            <p>Market Release</p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5'>
                    <div className='dark:border-gray-300 border-gray-600 border p-10 rounded-2xl'>
                        <div className='flex items-center gap-2 mt-6 mb-5'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <p className='text-[13px]'>
                            Innovation begins with better engineering. We build systems that give your product a
                            competitive edge and transform ambitious ideas into real-world impact.
                        </p>
                        <hr className='dark:border-gray-300 border-gray-600 my-7' />
                        <div className='flex items-center gap-3'>
                            <button className='font-medium border rounded-full h-10 w-10  bg-white dark:bg-[#0F172A] dark:text-white text-[#0F172A]'>M</button>
                            <button className='font-medium'>Mr John</button>
                        </div>
                    </div>
                    <div className='dark:border-gray-300 border-gray-600 border p-10 rounded-2xl'>
                        <div className='flex items-center gap-2 mt-6 mb-5'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <p className='text-[13px]'>
                            Innovation begins with better engineering. We build systems that give your product a
                            competitive edge and transform ambitious ideas into real-world impact.
                        </p>
                        <hr className='dark:border-gray-300 border-gray-600 my-7' />
                        <div className='flex items-center gap-3'>
                            <button className='font-medium border rounded-full h-10 w-10  bg-white dark:bg-[#0F172A] dark:text-white text-[#0F172A]'>M</button>
                            <button className='font-medium'>Mr John</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonies