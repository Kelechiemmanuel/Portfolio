import React, { useEffect, useState } from 'react'
import Booking from '../features/Booking'
import { FaArrowRight } from 'react-icons/fa'
import { HiCheck } from 'react-icons/hi'
import { GoGitBranch } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { HiCheckCircle } from "react-icons/hi2";
import { TbPackages } from "react-icons/tb";
import { LuTestTube } from "react-icons/lu";
import { MdRocketLaunch } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import About from './About';
import Services from './Services';
import Testimonies from './Testimonies';
import HeroCubic from '../utils/HeroCubic';

const status = [
    {
        text: 'waiting...',
        color: "text-gray-600",
        borderColor: "border-gray-600",
        iconColor: "text-gray-600",
    },
    {
        text: 'running...',
        color: "text-yellow-600",
        borderColor: "border-yellow-400",
        iconColor: "text-yellow-600",
    },
    {
        text: 'passed...',
        color: "text-green-600",
        borderColor: "border-green-600",
        iconColor: "text-green-600",
    }
]

const cards = [
    {
        title: "Build & Branch",
        icon: <GoGitBranch className="text-2xl" />,
        arrow: <FaArrowDown className='text-xs' />,
        design: <div className='h-5 border-gray-200 border' />,
        loading: "Building project...",
    },
    {
        title: "Install Dependencies",
        icon: <TbPackages className="text-2xl" />,
        arrow: <FaArrowDown className='text-xs' />,
        design: <div className='h-5 border-gray-200 border' />,
        loading: "Installing dependencies...",

    },
    {
        title: "Run Tests",
        icon: <LuTestTube className="text-2xl" />,
        arrow: <FaArrowDown className='text-xs' />,
        design: <div className='h-5 border-gray-200 border' />,
        loading: "Running test suite...",
    },
    {
        title: "Deploy",
        icon: <MdRocketLaunch className="text-2xl" />,
        loading: "Deploying to production...",
    },
];
const Home = () => {
    const [pop, setPop] = useState(false)
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 12);
        }, 2000);

        return () => clearInterval(interval);
    }, []);
    const activeCard = Math.floor(step / 3);
    return (
        <div className='h-full mb-50 flex flex-col'>
            <div className='flex lg:flex-row flex-col justify-between items-center gap-10 w-full px-10 py-35 lg:py-40 lg:px-40 mt-20'>
                <div className='w-full'>
                    <p>SOFTWARE CRAFTING...</p>
                    <h1 className='font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5'>
                        Crafting scalable digital products with engineering excellence.
                    </h1>
                    <p className='leading-7 mb-10'>
                        From strategy to deployment, we transform ambitious ideas into polished digital
                        experiences built for performance, scalability, and growth. Obsess over the details that most people never notice,
                        because those details create products that users never forget.
                    </p>
                    <div className='flex items-start lg:flex-row gap-4 group'>
                        <Booking />
                        <div className='flex items-center gap-5'>
                            <button className=''>Let it work for you </button>
                            <FaArrowRight className='transition-transform duration-300 group-hover:translate-x-2' />
                        </div>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <HeroCubic />
                </div>
            </div>
            <div className='dark:bg-white bg-[#0F172A] text-white dark:text-[#0F172A]'>
                <div className='px-10 py-40 lg:py-40 lg:px-40'>
                    <div className='mb-30'>
                        <p>JUST TRUST THE PROCESS...</p>
                        <h1 className='font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5'>
                            Delivering exceptional products <br /> goes beyond writing code.
                        </h1>
                        <p className='leading-7 mb-10'>
                            Thoughtfully engineered software, built to scale and designed to last.<br className='hidden md:block' />
                            From concept to launch, we create scalable web applications engineered and long-term growth.<br className='hidden md:block' />
                            We build production-ready applications that balance exceptional user experiences with robust engineering.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
                        <div className=' flex flex-col gap-10'>
                            <div className='flex items-start justify-center gap-5'>
                                <button className='border p-2 rounded-sm'>
                                    <HiCheck />
                                </button>
                                <div>
                                    <h1>Cross-Platform Mobile Solutions</h1>
                                    <p>
                                        We build high-performance mobile applications that run seamlessly on both iOS and Android from a single codebase.
                                    </p>
                                </div>
                            </div>
                            <hr className='dark:border-gray-200 border-gray-600' />
                            <div className='flex items-start justify-center gap-5'>
                                <button className='border p-2 rounded-sm'>
                                    <HiCheck />
                                </button>
                                <div>
                                    <h1>Cross-Platform Mobile Solutions</h1>
                                    <p>
                                        We build high-performance mobile applications that run seamlessly on both iOS and Android from a single codebase.
                                    </p>
                                </div>
                            </div>
                            <hr className='dark:border-gray-200 border-gray-600' />
                            <div className='flex items-start justify-center gap-5'>
                                <button className='border p-2 rounded-sm'>
                                    <HiCheck />
                                </button>
                                <div>
                                    <h1>Cross-Platform Mobile Solutions</h1>
                                    <p>
                                        We build high-performance mobile applications that run seamlessly on both iOS and Android from a single codebase.
                                    </p>
                                </div>
                            </div>
                            <hr className='dark:border-gray-200 border-gray-600' />
                            <div className='flex items-start justify-center gap-5'>
                                <button className='border p-2 rounded-sm'>
                                    <HiCheck />
                                </button>
                                <div>
                                    <h1>Cross-Platform Mobile Solutions</h1>
                                    <p>
                                        We build high-performance mobile applications that run seamlessly on both iOS and Android from a single codebase.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='gap-3 flex-col lg:flex hidden'>
                            {cards.map((card, i) => {
                                const progress = step - i * 3;

                                let state = 0;

                                if (progress >= 1) state = 1;
                                if (progress >= 2) state = 2;

                                if (progress >= 3) state = 2;

                                return (
                                    <div key={i} className='flex flex-col items-center justify-center'>
                                        <div className={`${status[state].borderColor} rounded-sm border p-3 min-w-80 transition-all duration-500`}>
                                            <div className="flex items-center gap-5">
                                                <button className="bg-white dark:bg-[#0F172A] p-2 rounded-sm">
                                                    {state === 0 && (
                                                        <span className={status[state].iconColor}>
                                                            {card.icon}
                                                        </span>
                                                    )}

                                                    {state === 1 && (
                                                        <ImSpinner2 className="text-2xl text-yellow-400 animate-spin" />
                                                    )}

                                                    {state === 2 && (
                                                        <HiCheckCircle className="text-2xl text-green-400" />
                                                    )}
                                                </button>

                                                <div>
                                                    <p className="font-bold">{card.title}</p>
                                                    <p className={status[state].color}>
                                                        {status[state].text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            {card.design}
                                            {card.arrow}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="flex items-center justify-center gap-3">
                                {activeCard < cards.length ? (
                                    <>
                                        {/* <ImSpinner2 className="animate-spin text-yellow-400" /> */}
                                        <span className="dark:text-black text-yellow-500">
                                            {cards[activeCard].loading}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <HiCheckCircle className="text-green-400" />
                                        <span className="text-green-400">
                                            Deployment completed successfully.
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className='flex justify-center items-center flex-col'>
                                <p>
                                    Refine. Rebuild. Repeat.
                                </p>
                                <div className='flex gap-3 mt-3'>
                                    <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>CI/CD</button>
                                    <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Staging</button>
                                    <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Rollback</button>
                                    <button className='border dark:border-[#0F172A] py-2 px-3 rounded-2xl text-xs'>Monitoring</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <About />
            <Services />
            <Testimonies />
        </div>
    )
}

export default Home