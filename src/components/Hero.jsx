import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import hero_image from "../assets/hero_image_1.png"
function Hero() {
    return (
        <div className=' Poppins text-white  m-auto w-screen  overflow-none absolute top-[20%] left-[5%] translate-x-[1%] translate-y-[50%] sm:top-[1%] sm:translate-y-[25%] lg:translate-y-[25%]  lg:translate-x-[0%] lg:left-[0%] lg:w-full'>
            <div className='scrollbar-hide overflow-none w-screen sm:mx-auto   max-w-sm sm:flex items-center flex-col sm:max-w-xl lg:w-full lg:max-w-4xl'>

                <h1 className='text-left text-2xl sm:text-center sm:text-3xl lg:text-4xl lg:w-full lg:text-center lg:tracking-normal lg:font-light'>
                    <p className='leading-normal'>

                    Boost your productivity with our&nbsp; 
                    <b className='font-sembbold'>

                        streamlined <br/> note-taking  &nbsp;
                     </b>
                        solution
                    </p>
                        
                </h1>
                <p className='text-white/[0.6] max-w-md text-sm mt-6 sm:text-center lg:text-md'>
                    Effortlessly access your notes from any device with our convenient cloud-based solution.
                </p>
                <button onClick={()=>window.location="/app"} className='bg-cyan-500 hover:bg-cyan-500/[0.7] active:ring-4 active:ring-offset-1 text-white p-3 mt-6 pl-6 pr-6 rounded-md flex items-center justify-between'>
                    <p className='text-sm mr-2 '>
                        Try For Free
                    </p>
                    <AiOutlineArrowRight size={20} />
                </button >

                <div className='mt-10 hidden sm:block p-10' >
                    <img src={hero_image} />
                </div>
            </div>
        </div>
    )
}

export default Hero