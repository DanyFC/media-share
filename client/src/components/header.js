"use client"
import { AuthContext } from "@/context/auth/context"
import Link from "next/link"
import { useContext } from "react"

const Header = () => {
  const { authenticated, userName, logOut } = useContext(AuthContext)

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
      <Link href='/' className='cursor-pointer'>
        <p className='font-extrabold text-5xl my-2 font-roboto-slab'><span className='text-primary'>MEDIA</span> SHARE</p>
      </Link>
      <div className='flex flex-row gap-6 items-center'>
        {
          authenticated
            ? <>
              <p className='text-3xl'>Hi <span className='font-bold'>{userName}</span></p>
              <button className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase' onClick={logOut}>Log Out</button>
            </>
            : <>
              <Link href='/login'>
                <p className='bg-primary px-5 py-3 rounded-lg text-white font-bold uppercase'>Log In</p>
              </Link>
              <Link href='/register'>
                <p className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>Register</p>
              </Link>
            </>
        }
      </div >
    </header >
  )
}

export default Header