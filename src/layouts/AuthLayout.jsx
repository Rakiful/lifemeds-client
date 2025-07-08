import React from 'react'
import { Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <div>
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}