import React from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { Outlet } from 'react-router'

export const MainLayout = () => {
  return (
    <div className='container mx-auto px-2'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}
