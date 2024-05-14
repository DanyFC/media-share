"use client"
import { AuthContext } from '@/context/auth/context'
import { FileContext } from '@/context/file/context'
import { useContext, useEffect } from 'react'
import Alert from '@/components/alert'
import DropZone from '@/components/dropZone'
import Link from 'next/link'
import Url from '@/components/url'

const Home = () => {
  const { validateSession } = useContext(AuthContext)
  const { error, url } = useContext(FileContext)

  useEffect(() => {
    (async () => {
      try {
        await validateSession()
      } catch (error) {
        //! no need to handle the error
      }
    })()
  }, [])

  return (
    <div className='md:w-3/5 mx-auto mb-32'>
      {error ? <Alert message={error} /> : null}
      <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 mx-8'>
        <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
          {url
            ? <Url fileUrl={url} />
            : <DropZone />
          }
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