'use client'
import React, { useEffect } from 'react';
import Navbar from '../(components)/Navbar/Navbar';
import Sidebar from '../(components)/Sidebar/Sidebar';
import StoreProvider, { useAppSelector } from '../(redux)/Redux';

// Cannot use 'use client' in our layout.tsx file. This DashboardWrapper file must have 'use client' in order to provide the store (StoreProvider) to the DashboardLayout. 

// The reason why this file is not configured as a single component is because the DashboardLayout is going to require some redux state. The StoreProvider has to be wrapped around the '{children}' element.

// '../(components)/Navbar/Navbar': components is places in parens so that next.js doesn't register it as a separate url or domain. The page.tsx file inside of the dashboard directory ensures the page registeres to the route.

// classname={`light`} : light mode.
// classname={`dark`} : dark mode.

// Connect Redux Store to Next.js application.
// This is broken down into two component, the layout is going to require some Redux state, and the 'StoreProvider' wrapper would not be able to provide it to the layout, You have to wrap it around the child.

export const DashboardLayout = ({ children } : { children: React.ReactNode }) => {
  // Grab the state wheather Sidebar is collapsed.
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  // Grap the state wheather DarkMode.
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Dark Mode needs to be added to the html element in layout.tsx file, once you go to a particular page.
  // We can only add Dark Mode here because if we added it to the layout.tsx file, we would have to change it to a client component ('use client'), which we can't do.
  // Add the classList here controling the htlm elements via the different modes.
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }else {
      document.documentElement.classList.add('light');
    }
  })
 
  return (
    <div className={`${isDarkMode ? 'dark' : 'light'} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
        <Sidebar />
        {/* anything in this main tag will render on the rightside of the Sidebar */}
      <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'}`}>
        <Navbar />
        {children}
      </main>
    </div>
  )
}


// Wraps entire website 'layout.tsx'. You still get Redux Store providing the same state on whatever page you navigate to.
const DashboardWrapper = ({ children } : { children: React.ReactNode }) => {
  return (
    <>
      <StoreProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </StoreProvider>
    </>
  )
}

export default DashboardWrapper

