import shipment from '../assets/shipment.png'
import Screenshot from '../assets/Screenshot.png'

const Blog = () => {
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col md:flex-row gap-5 justify-center pt-30 bg-[#f6f3ef] px-10 pb-3 lg:pt-30 lg:px-40'>
                <div className="group shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-[#0F172A] text-white w-full p-10 rounded-2xl overflow-hidden">
                    <div>
                        <h1 className="font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5 transition-transform duration-500 group-hover:scale-105">
                            Scan for Vuln
                        </h1>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 justify-center">
                        <div>
                            <p className="transition-transform duration-500 group-hover:translate-x-5">
                                Custom engineering, not cookie-cutter development.
                                Every engagement is built around your goals.
                            </p>
                        </div>

                        <div className="lg:w-1/2 w-full shrink-0 overflow-hidden rounded-xl">
                            <img
                                src={Screenshot}
                                alt=""
                                className="w-full h-auto max-w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110 border border-gray-300"
                            />
                        </div>


                    </div>

                    <div className="pt-20">
                        <p className="transition-transform duration-500 group-hover:translate-y-2">
                            Year: 2026
                        </p>
                    </div>

                </div>
                <div className='shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white rounded-xl'>
                    <div className='h-50 w-100'>

                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-5 justify-center w-full px-10 lg:px-40 bg-[#f6f3ef] py-5'>
                <div className='shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-white rounded-xl'>
                    <div className='h-50 w-100'>

                    </div>
                </div>
                <div className="group shadow-[0_0_15px_rgba(0,0,0,0.15)] bg-[#0F172A] text-white w-full p-10 rounded-2xl overflow-hidden">
                    <div>
                        <h1 className="font-medium lg:text-5xl md:text-4xl text-2xl lg:leading-15 leading-10 py-5 transition-transform duration-500 group-hover:scale-105">
                            Scan for Vuln
                        </h1>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-10 justify-center">
                        <div>
                            <p className="transition-transform duration-500 group-hover:translate-x-5">
                                Custom engineering, not cookie-cutter development.
                                Every engagement is built around your goals.
                            </p>
                        </div>

                        <div className="lg:w-1/2 w-full shrink-0 overflow-hidden rounded-xl">
                            <img
                                src={shipment}
                                alt=""
                                className="w-full h-auto max-w-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110 border border-gray-300"
                            />
                        </div>


                    </div>

                    <div className="pt-20">
                        <p className="transition-transform duration-500 group-hover:translate-y-2">
                            Year: 2026
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Blog