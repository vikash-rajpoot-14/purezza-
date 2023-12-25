import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='flex  text-white justify-between items-center h-10 bg-slate-400 fixed top-0 w-screen'>
      <div className='ml-4 italic text-xl uppercase'>
        <p>Purezze</p>
      </div>
      <div className='flex gap-16 justify-center items-center'>
        <Link to={"/"}>
        <p>Home</p>
        </Link>
        <Link to={"/products"}>
        <p>Products</p>
        </Link>
      </div>
      <div className='flex gap-6 mr-4 justify-center items-center'>
        <p className='bg-cyan-500 p-1 px-2 rounded'>Sign Up</p>
        <p className='bg-sky-600 p-1 px-2 rounded'>Sign In</p>
      </div>
    </div>
  )
}

export default Header
