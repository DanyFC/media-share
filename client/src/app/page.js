"use client"
import { AuthContext } from '@/context/auth/context'
import { useContext, useEffect } from 'react'
import DropZone from '@/components/dropZone'
import Link from 'next/link'

const Home = () => {
  const { authenticated, validateSession } = useContext(AuthContext)

  useEffect(() => {
    (async () => {
      try {
        await validateSession()
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [])

  return (
    <div className='md:w-3/5 mx-auto mb-32'>
      <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 mx-8'>
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
          <DropZone />
        </div>
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
          <h2 className='text-4xl font-bold text-gray-800 my-4'>Share files easily and privately</h2>
          <p className='leading-loose text-2xl'>
            <span className='text-primary font-bold'>MediaShare</span>&nbsp;
            is a platform that allows you to share your media content with others in an easy way. You can upload any type of file or image, set is a platform that allows you to share your media.
          </p>
          <Link href='/register'>
            <p className='text-primary font-bold text-3xl hover:text-black'>Create account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home