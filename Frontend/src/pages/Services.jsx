import React, { useState } from 'react'
import { LuChevronDown } from "react-icons/lu";
import Screenshot from '../assets/Screenshot.png'
import shipment from '../assets/shipment.png'
import Blog from '../assets/Blog.png'
import { FaArrowRight } from 'react-icons/fa';

const items = [
    {
        id: 1,
        serial: "01",
        title: "Web Infrastructure",
        description: <div>
            <p className='pb-10'>We build fast websites and web applications, choosing the best way to deliver each part of the application so users get fast load times and quick responses.
            </p>
            <p>
                Performance is considered from the beginning, rather than building the application first and optimizing it later.
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
            <p className='pb-10'>We build with latest technologies to build fast, reliable mobile apps for both iOS and Android from one codebase.
            </p>
            <p>
                with features that keep the app working smoothly even with poor internet connectivity
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
            <p className='pb-10'>We take an existing large application, move it to modern cloud infrastructure, and improve its architecture without forcing the company to rebuild the entire application from scratch.
            </p>
            <p>
                We move the applications to cloud services where much of the infrastructure management is handled by the cloud provider.
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
            <p className='pb-10'>We use AI models to automate or improve actual business processes inside existing applications.
            </p>
            <p>
                We don't build AI just to show that AI works. We integrate AI into applications where it actually saves time, automates work, or improves a business process.
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
            <p className='pb-10'>We help a company decide how its product should look, feel, and be perceived by customers
            </p>
            <p>
                We create the visual system for a brand, from its logo and fonts to the rules that ensure the brand looks consistent everywhere.
            </p>
            <div className='flex items-center gap-3 pt-5'>
                <button className='font-medium'>Learn More</button>
                <FaArrowRight className='text-xs' />
            </div>
        </div>,

    }
]

const cards = [
    {
        id: 1,
        title: <div className='py-5'>
            <p>May 2026 <label>.  Engineering</label></p>
            <h2 className='font-medium text-2xl py-2'>Custom engineering, not cookie-cutter development.</h2>
            <p>Custom engineering, not cookie-cutter development. Every engagement is built around your goals.</p>
        </div>,
        url: 'https://logistics-omega-eight.vercel.app/',
        image: shipment
    },
    {
        id: 2,
        title: <div className='py-5'>
            <p>May 2025 <label>.  Engineering</label></p>
            <h2 className='font-medium text-2xl py-2'>Scan a project for hardcoded secrets and insecure configs.</h2>
            <p>Custom engineering, not cookie-cutter development. Every engagement is built around your goals.</p>
        </div>,
        url: 'https://file-scanner-dun.vercel.app/',
        image: Screenshot
    },
    {
        id: 3,
        title: <div className='py-5'>
            <p>May 2026 <label>.  Engineering</label></p>
            <h2 className='font-medium text-2xl py-2'>Custom engineering, not cookie-cutter development.</h2>
            <p>Custom engineering, not cookie-cutter development. Every engagement is built around your goals.</p>
        </div>,
        url: 'https://authorization-iota-seven.vercel.app/',
        image: Blog
    }
]

const Services = () => {
    const [open, setOpen] = useState(null)

    const handleDropDown = (id) => {
        setOpen(open === id ? null : id)
    }
    return (
        <div className='h-full w-full dark:bg-white bg-[#0F172A] text-white dark:text-[#0F172A]'>
            <div className='px-10 pb-10 lg:pt-30 lg:px-40'>
                <p>SERVICES...</p>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-30'>
                    <div>
                        <div>
                            <h1 className='font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5'>
                                Every great product starts as an idea. We engineer the impact.
                            </h1>
                            <p>Custom engineering, not cookie-cutter development. Every engagement <br className='hidden md:block' />is built around your goals.</p>
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
                            <p>Custom engineering, not cookie-cutter development. <br className='hidden md:block' />Every engagement is built around your goals.</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>

                        {
                            cards.map((card, id) => (
                                <div key={id} className='dark:border-gray-300 border-gray-600 border-b border rounded-2xl'>
                                    <div className='w-full h-60 overflow-hidden group rounded-t-2xl'>
                                        <a href={card.url} target="_blank" rel="noopener noreferrer">
                                            <img src={card.image} alt="" className='w-full h-full rounded-t-2xl object-cover transition-transform duration-500 group-hover:scale-110' />
                                        </a>
                                    </div>
                                    <div className='p-5'>
                                        {card.title}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* <hr className='dark:border-gray-300 border-gray-600' /> */}
        </div>
    )
}

export default Services