import React, { useState } from 'react'

const Booking = () => {
    const [pop, setPop] = useState(false)
    return (
        <div className='transition-colors duration-300'>
            <button onClick={() => setPop(true)} className='cursor-pointer border border-gray-800 py-2 px-5 rounded-sm dark:bg-white dark:text-[#0F172A] font-bold'>Book A Session</button>

            {pop && (
                <div className='fixed inset-0 z-9999'>
                    <div className='absolute inset-0 bg-black/80' onClick={() => setPop(false)} />

                    {/* the modal */}
                    <div className='absolute inset-0 flex justify-center items-center'>
                        <div className='h-120 w-200 bg-white rounded-2xl relative'>
                            <button className='text-black absolute right-5 top-5' onClick={() => setPop(false)}>X</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Booking