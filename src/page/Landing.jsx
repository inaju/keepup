import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'

function Landing() {
  return (
    <div className='h-screen w-full  bg-[#1E1E1E]  relative'>

      <div className='radial-bg h-1/2 blur-sm '>
      </div>
      <div className='h-[100%] bg-[#1E1E1E] overflow-hidden '>

        <NavBar />
        <Hero />
      </div>
    </div>
  )
}



export default Landing