import React from 'react'
import Booking from '../features/Booking'
import { useNavigate } from 'react-router-dom'
import { LuFingerprint } from "react-icons/lu";
import { LuNetwork } from "react-icons/lu";
import { LuChartLine } from "react-icons/lu";
import { FaArrowRight } from 'react-icons/fa';

const About = () => {
    const navigate = useNavigate()
    return (
        <div className='h-full'>
            <div className='px-10 py-35 lg:py-40 lg:px-40'>
                <p>OUR MISSION...</p>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className=''>
                        <div>
                            <h1 className='font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5'>Built with conviction. <br className='hidden md:block' />
                                Shipped with confidence.
                            </h1>
                            <p>
                                We work with founders and growing businesses that value speed, quality, and long-term <br className='hidden md:block' />impact.
                                Most agencies deliver projects—we engineer products built to scale.
                            </p>
                        </div>
                        <hr className='border-gray-300 dark:border-gray-600 my-10' />
                        <div className='flex gap-10 items-center mb-10'>
                            <div>
                                <p className='text-2xl font-bold'>$750M+</p>
                                <p>Revenue generated</p>
                            </div>
                            <div className='h-12 w-0.5 bg-gray-300 dark:bg-gray-700' />
                            <div>
                                <p className='text-2xl font-bold'>45+</p>
                                <p>Global Client</p>
                            </div>
                        </div>
                        <div className='flex justify-center lg:justify-start'>
                            <Booking />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold leading-15'>Every detail has a purpose.</h2>
                        <p>
                            We've removed the barriers between vision and execution. Every decision, every <br className='hidden md:block' />
                            sprint, and every deployment is focused on building software that creates lasting business value.
                        </p>
                        <hr className='border-gray-300 dark:border-gray-600 my-10' />

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                            <div>
                                <h2 className='text-lg font-bold leading-15 py-2'>Built for Velocity</h2>
                                <p>
                                    We optimize every engineering investment to deliver greater velocity, <br className='hidden md:block' />
                                    stronger products, and sustainable growth
                                </p>
                            </div>
                            <div>
                                <h2 className='text-lg font-bold leading-15 py-2'>Scalability by Design</h2>
                                <p>
                                    Resilient architecture that adapts to increasing demand without compromising performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='dark:bg-white bg-[#0F172A] text-white dark:text-[#0F172A] h-full px-10 py-20 lg:py-40 lg:px-40'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <div className='dark:border-gray-300 border-gray-600 border p-10 rounded-2xl'>
                        <LuNetwork className='text-4xl bg-white dark:bg-[#0F172A] p-2 rounded-sm dark:text-white text-[#0F172A]' />
                        <h2 className='text-lg font-medium mt-6 mb-2'>Every detail has a purpose.</h2>
                        <p className='text-[13px]'>
                            Innovation begins with better engineering. We build systems that give your product a
                            competitive edge and transform ambitious ideas into real-world impact.
                        </p>
                        <div className='flex items-center gap-3 pt-5'>
                            <button className='font-medium'>Learn More</button>
                            <FaArrowRight className='text-xs' />
                        </div>
                    </div>
                    <div className='dark:border-gray-300 border-gray-600 border p-10 rounded-2xl'>
                        <LuChartLine className='text-4xl bg-white dark:bg-[#0F172A] p-2 rounded-sm dark:text-white text-[#0F172A]' />
                        <h2 className='text-lg font-medium mt-6 mb-2'>Real-Result.</h2>
                        <p className='text-[13px]'>
                            Design attracts users. Performance keeps them. We combine intelligent architecture with
                            flawless execution to build products that deliver measurable results.
                        </p>
                        <div className='flex items-center gap-3 pt-5'>
                            <button className='font-medium'>Learn More</button>
                            <FaArrowRight className='text-xs' />
                        </div>
                    </div>
                    <div className='dark:border-gray-300 border-gray-600 border p-10 rounded-2xl'>
                        <LuFingerprint className='text-4xl bg-white dark:bg-[#0F172A] p-2 rounded-sm dark:text-white text-[#0F172A]' />
                        <h2 className='text-lg font-medium mt-6 mb-2'>Built to Be Recognized.</h2>
                        <p className='text-[13px]'>
                            Confidence comes from consistency. We build products and platforms that strengthen your
                            brand at every touch-point and every stage of growth.
                        </p>
                        <div className='flex items-center gap-3 pt-5'>
                            <button className='font-medium'>Learn More</button>
                            <FaArrowRight className='text-xs' />
                        </div>
                    </div>
                </div>
            </div>
            <hr className='dark:border-gray-300 border-gray-600' />
        </div>
    )
}

export default About