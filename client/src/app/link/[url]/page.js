"use client"
import axiosClient from '@/config/axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Link = ({ params }) => {
  const router = useRouter()
  const { url } = params
  const [data, setData] = useState({
    password: '',
    validated: false
  })

  const getFileInfo = async () => {
    try {
      const response = await axiosClient.get(`/api/link/${url}`)
      setData({ ...data, file: response.data })
    } catch (error) {
      router.push('/')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setData({ ...data, validated: true })
  }

  useEffect(() => {
    getFileInfo()
  }, [])

  return (
    <div className='py-40 flex flex-col items-center gap-6'>
      {
        data.file?.password && !data.validated
          ? <>
            <form className='mx-10 bg-white shadow-lg p-10' onSubmit={handleSubmit}>
              <label className='block text-black text-2xl font-bold mb-2' >This file is password protected, please enter the password to enable download.</label>
              <input type='password' className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 focus:outline-none focus:border-gray-500' placeholder='●●●●●●●●' />
              <input type='submit' className='bg-primary hover:bg-black w-full p-2 text-white uppercase font-bold mt-5' value='Unlock' />
            </form>
          </>
          : <>
            <h1 className='text-5xl text-center text-gray-700'>Download your file:</h1>
            <div className='flex items-center justify-center mt-5'>
              <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/file/${data.name}`} className='bg-primary text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-black'>Download!</a>
            </div>
          </>
      }

    </div>
  )
}

export default Link