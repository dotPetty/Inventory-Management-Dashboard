'use client';

import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/(redux)/Redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
 // Addidng state as we need
  const dispatch = useAppDispatch();
  // Sidebar state.
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  // Darkmode state.
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  
  // Sidebar toggle function
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  // Darkmode toggle function
  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
   }

  return (
    <div className='flex justify-between items-center w-full mb-7'>
        {/* Left side */}
        <div className='flex justify-between items-center gap-5'>
            <button 
                className='px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100'
                onClick={toggleSidebar}
            >
                <Menu 
                    className='w-4 h-4' 
                />
            </button>

            <div className='relative'>
                <input 
                    type='search'
                    placeholder='Search groups and products...'
                    className='pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500'
                />

                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Bell 
                        className='text-gray-500' 
                        size={20} 
                    />
                </div>
            </div>
        </div>

        {/* Right side */}
        <div className='flex justify-between items-center gap-3'>
            <div className='hidden md:flex justify-between items-center gap-5'>
                <div>
                    <button
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? (<Moon className='cursor-pointer text-gray-500' size={24}/>) : (<Sun className='cursor-pointer text-gray-500' size={24}/>)}
                        
                    </button>
                </div>
                
                {/* add bell notification number function to increase or decrease as well as notification functionality */}
                <div className='relative inline-block'>
                    <Bell 
                        className='cursor-pointer text-gray-500'
                        size={24}
                    />
                    <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full'>
                        3
                    </span>
                </div>

                <hr 
                    className='w-0 h-7 border border-solid border-l border-gray-300 max-3'
                />

                <div className='flex items-center gap-3 cursor-pointer'>
                    <div className='w-9 h-9'>
                        image
                    </div>
                    <span className='font-semibold'>
                        Mike Vega
                    </span>
                </div>
            </div>

            <Link
                href='/settings'
            >
                <Settings 
                    className='cursor-pointer text-gray-500'
                    size={24}
                />
            </Link>
        </div>
    </div>
  )
}

export default Navbar
