'use client'
import { useAppDispatch, useAppSelector } from '@/app/(redux)/Redux';
import { setIsSidebarCollapsed } from '@/state';
import { Archive, CircleDollarSign, Clipboard, Icon, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Creating Sidebar Links.
// 'pathname': grap the path of the URL that we're at.
// 'isActive': determine if the link URL is active so we can know what page we are on and determine what to highlight.
interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}
// pathname: This will grab the path of the URL that we are at. If we are at a separate path we can grab it using usePathname().

// isActive: Helps determine which page we are on so it can be highlighted. This current configuration highlights the Dashboard page (Home page) by default for its the first page users will see when logged into the browser.
const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'} hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? 'bg-blue-200 text-white' : ''}`}>
                <Icon className='w-6 h-6 !text-gray-700' />

                <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = () => {
  // Addidng state as we need.
  const dispath = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  
  // Toggle Sidebar, invert Sidebar Collapse anytime this function is triggered.
  const toggleSidebar = () => {
    dispath(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // Classes to apply different setting.
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

  return (
    <div className={sidebarClassNames}>
        {/* Top Logo */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-7'}`}>
            <div>
                Logo
            </div>

            <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-2xl`}>
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

        {/* Links: Component above. */}
        <div className='flex-grow mt-8'>
            <SidebarLink 
                href='/dashboard'
                icon={Layout}
                label='Dashboard'
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
                href='/inventory'
                icon={Archive}
                label='Inventory'
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
                href='/products'
                icon={Clipboard}
                label='Products'
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
                href='/users'
                icon={User}
                label='Users'
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
                href='/settings'
                icon={SlidersHorizontal}
                label='Settings'
                isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink 
                href='/expenses'
                icon={CircleDollarSign}
                label='Expenses'
                isCollapsed={isSidebarCollapsed}
            />
        </div>

        {/* Footer */}
        <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
            <p className='text-center text-xs text-gray-500'>
                &copy; 2025 DOTSTOCK
            </p>
        </div>
    </div>
  )
}

export default Sidebar
