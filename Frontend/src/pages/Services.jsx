import React, { useState } from 'react'
import { LuChevronDown } from "react-icons/lu";
import crystal from '../assets/crystal.png'
import { FaArrowRight } from 'react-icons/fa';

const items = [
    {
        id: 1,
        serial: "01",
        title: "Web Infrastructure",
        description: <div>
            <p className='pb-10'>SvelteKit for applications that need to be fast by default. Server-side rendering,
                edge deployment, and bundle sizes your users will thank you for.
            </p>
            <p>
                We build full-stack web applications with SvelteKit. SSR where it matters,
                static where it doesn't, and edge-deployed APIs that respond in milliseconds.
            </p>
            <div className='flex items-center gap-3 pt-5'>
                <button className='font-medium'>Learn More</button>
                <FaArrowRight className='text-xs' />
            </div>
        </div>,

    },
    {
        id: 2,
        serial: "02",
        title: "Mobile Application",
        description: <div>
            <p className='pb-10'>SvelteKit for applications that need to be fast by default. Server-side rendering,
                edge deployment, and bundle sizes your users will thank you for.
            </p>
            <p>
                We build full-stack web applications with SvelteKit. SSR where it matters,
                static where it doesn't, and edge-deployed APIs that respond in milliseconds.
            </p>
            <div className='flex items-center gap-3 pt-5'>
                <button className='font-medium'>Learn More</button>
                <FaArrowRight className='text-xs' />
            </div>
        </div>,

    },
    {
        id: 3,
        serial: "03",
        title: "Cloud Migration",
        description: <div>
            <p className='pb-10'>SvelteKit for applications that need to be fast by default. Server-side rendering,
                edge deployment, and bundle sizes your users will thank you for.
            </p>
            <p>
                We build full-stack web applications with SvelteKit. SSR where it matters,
                static where it doesn't, and edge-deployed APIs that respond in milliseconds.
            </p>
            <div className='flex items-center gap-3 pt-5'>
                <button className='font-medium'>Learn More</button>
                <FaArrowRight className='text-xs' />
            </div>
        </div>,

    },
    {
        id: 4,
        serial: "04",
        title: "AI Automation",
        description: <div>
            <p className='pb-10'>SvelteKit for applications that need to be fast by default. Server-side rendering,
                edge deployment, and bundle sizes your users will thank you for.
            </p>
            <p>
                We build full-stack web applications with SvelteKit. SSR where it matters,
                static where it doesn't, and edge-deployed APIs that respond in milliseconds.
            </p>
            <div className='flex items-center gap-3 pt-5'>
                <button className='font-medium'>Learn More</button>
                <FaArrowRight className='text-xs' />
            </div>
        </div>,

    },
    {
        id: 5,
        serial: "05",
        title: "Brand Positioning",
        description: <div>
            <p className='pb-10'>SvelteKit for applications that need to be fast by default. Server-side rendering,
                edge deployment, and bundle sizes your users will thank you for.
            </p>
            <p>
                We build full-stack web applications with SvelteKit. SSR where it matters,
                static where it doesn't, and edge-deployed APIs that respond in milliseconds.
            </p>
            <div className='flex items-center gap-3 pt-5'>
                <button className='font-medium'>Learn More</button>
                <FaArrowRight className='text-xs' />
            </div>
        </div>,

    },
]

const Services = () => {
    const [open, setOpen] = useState(null)

    const handleDropDown = (id) => {
        setOpen(open === id ? null : id)
    }
    return (
        <div className='h-full w-full dark:bg-white bg-[#0F172A] text-white dark:text-[#0F172A]'>
            <div className='px-10 py-35 lg:py-60 lg:px-40'>
                <p>SERVICES...</p>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-30'>
                    <div>
                        <div>
                            <h1 className='font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5'>
                                Every great product starts as an idea. We engineer the impact.
                            </h1>
                            <p>Custom engineering, not cookie-cutter development. Every engagement <br />is built around your goals.</p>
                        </div>
                        <div className='md:flex gap-2 w-full pt-5 hidden '>
                            <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Mobile Apps</button>
                            <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Web Platforms</button>
                            <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Cloud Migration</button>
                            <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>AI Automation</button>
                            <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Brand Strategy</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        {items.map((item, id) => (
                            <div key={item.id} onClick={() => handleDropDown(item.id)} className='dark:border-gray-300 border-gray-600 border-b pb-5'>
                                <div className='flex justify-between'>
                                    <div className='flex gap-5 items-center'>
                                        <p>{item.serial}</p>
                                        <p>{item.title}</p>
                                    </div>
                                    <LuChevronDown className={`transition-transform ${open === item.id ? "rotate-180" : ""}`} />
                                </div>
                                <div className={`overflow-hidden pl-10 transition-all duration-500 ease-in-out ${open === item.id ? "max-h-full opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                    {item.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className='pt-20'>
                        <p>CASE STUDY...</p>
                        <div className=''>
                            <h1 className='font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5'>
                                Selected Work
                            </h1>
                            <p>Custom engineering, not cookie-cutter development. <br />Every engagement is built around your goals.</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>
                        <div className=''>
                            <div className='dark:border-gray-300 border-gray-600 border rounded-2xl w-full'>
                                <img src={crystal} alt="" className='rounded-2xl w-full' />
                            </div>
                            <div className='py-5'>
                                <p>May 2026 <label>.  Engineering</label></p>
                                <h2 className='font-medium text-2xl py-2'>Custom engineering, not cookie-cutter development.</h2>
                                <p>Custom engineering, not cookie-cutter development. Every engagement is built around your goals.</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='dark:border-gray-300 border-gray-600 border rounded-2xl'>
                                <img src={crystal} alt="" className='rounded-2xl w-full' />
                            </div>
                            <div className='py-5'>
                                <p>May 2026 <label>.  Engineering</label></p>
                                <h2 className='font-medium text-2xl py-2'>Custom engineering, not cookie-cutter development.</h2>
                                <p>Custom engineering, not cookie-cutter development. Every engagement is built around your goals.</p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='dark:border-gray-300 border-gray-600 border rounded-2xl'>
                                <img src={crystal} alt="" className='rounded-2xl w-full' />
                            </div>
                            <div className='py-5'>
                                <p>May 2026 <label>.  Engineering</label></p>
                                <h2 className='font-medium text-2xl py-2'>Custom engineering, not cookie-cutter development.</h2>
                                <p>Custom engineering, not cookie-cutter development. Every engagement is built around your goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='dark:border-gray-300 border-gray-600' />
        </div>
    )
}

export default Services