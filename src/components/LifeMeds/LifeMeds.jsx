import React from 'react'
import logo from "../../assets/web_logo.png"
import { Link } from 'react-router'

export const LifeMeds = () => {
  return (
    <Link to={"/"}>
        <img className='w-32' src={logo} alt="logo" />
    </Link>
  )
}
