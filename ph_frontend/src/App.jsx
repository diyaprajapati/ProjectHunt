import React from 'react'
import './index.css'
import { ChevronLeft, ChevronRight, Code, Sparkle } from 'lucide-react';

export default function App() {
  return (
    <div className='bg-gradient-to-br from-gray-900 to-blue-900 h-screen w-full'>
      {/* logo */}
      <div className='flex text-2xl px-2 py-4 gap-3 items-center'>
        <div className='flex justify-center'>
          <Code className='text-blue-500 size-8' />
        </div>
        <div>
          <h1 className='text-white font-bold'>ProjectHunt</h1>
        </div>
      </div>

      {/* heading */}
      <div className='text-white text-center p-4'>
        <div className='text-4xl font-bold mt-10 md:text-5xl'>
          Discover & Upvote <span className='text-blue-500'> Innovative </span> Tech Projects
        </div>
        <div className='mt-4 text-lg text-gray-300'>
          Explore cutting-edge software projects, support emerging innovations, and connect with creators.
        </div>
      </div>

      {/* search box */}
      <div className='mt-4 flex w-full justify-center items-center'>
        <input type='search' placeholder='Search projects, tags or creators...' className='border-none rounded-full h-11 w-[90%] px-4 py-5 bg-gray-800 text-zinc-400 md:w-[50%]'/>
        <Sparkle className='absolute right-[8%] text-zinc-500 md:right-[26%]' />
      </div>

    </div>
  )
}
