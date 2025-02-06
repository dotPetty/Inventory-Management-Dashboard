'use client'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/Redux';
import { setIsSidebarCollapsed } from '@/state';
import { Menu } from 'lucide-react';
import React from 'react';

const Sidebar = () => {
  // Addidng state as we need
  const dispath = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  
  // Toggle Sidebar, invert Sidebar Collapse anytime this function is triggered.
  const toggleSidebar = () => {
    dispath(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // Classes to apply different setting
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

  return (
    <div className={sidebarClassNames}>
        {/* Top Logo */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-7'}`}>
            <div>
                Logo
            </div>

            <h1 className='font-extrabold text-2xl'>
                DOTSTOCK
            </h1>
        
            <button
                className='md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100'
                onClick={toggleSidebar}
            >
                <Menu 
                    className='w-4 h-4'
                />
            </button>
        </div>

        {/* Links */}
        <div className='flex-grow mt-8'>
            <h1>
                Links
            </h1>
        </div>

        {/* Footer */}
        <div>
            <p className='text-center text-xs text-gray-500'>
                &copy; 2025 DOTSTOCK
            </p>
        </div>
    </div>
  )
}

export default Sidebar
