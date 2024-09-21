"use client"
import React from 'react'
import Logo from './Logo';
import { UserButton } from '@clerk/nextjs';
import ConnectWallet from './ConnectWallet';

function Navbar() {
  return (
    <div className='flex justify-between p-3 px-4 md:px-10 border-b-[1px] shadow-sm '>
        <div className='flex gap-10 items-center'>
        <div>
            <Logo/>
        </div>
        <div className='gap-4 hidden md:flex'>
            <h2 className='hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md cursor-pointer transition-all'>Home</h2>
            <h2 className='hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md cursor-pointer transition-all'>History</h2>
            <h2 className='hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md cursor-pointer transition-all'>Help</h2>
        </div>
        </div>
        <div className='flex items-center gap-4'>
        <ConnectWallet/>
        <UserButton afterSignOutUrl='/'/>
        </div>
    </div>
  )
}

export default Navbar;   