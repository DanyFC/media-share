"use client"
import { AuthContext } from '@/context/auth/context'
import { useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import Alert from '@/components/alert'
import FormField from '@/components/formField'

const Register = () => {
  const { authenticated, error, register } = useContext(AuthContext)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required('Username is required.'),
      email: Yup.string()
        .email('Invalid Email')
        .required('Email is required!'),
      password: Yup.string()
        .min(8, 'Password should have at least 8 characters')
        .required('Please enter your password')
    }),
    onSubmit: async (values) => {
      try {
        await register(values)
      } catch (err) {
        //! no need to handle the error
      }
    }
  })

  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [authenticated])

  return (
    <div className='md:w-4/5 xl:w-3/5 mx-auto mb-2'>
      <h2 className='text-4xl font-bold text-gray-800 text-center my-4'>Create Account</h2>
      {error && <Alert message={error} />}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <FormField formik={formik} id={'userName'} label={'Username'} placeholder={'Your Username'} type={'text'} />
            <FormField formik={formik} id={'email'} label={'Email'} placeholder={'Example@domain.com'} type={'email'} />
            <FormField formik={formik} id={'password'} label={'Password'} placeholder={'●●●●●●●●'} type={'password'} />
            <input type='submit' className='bg-primary hover:bg-black w-full p-2 text-white uppercase font-bold' value='Continue' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register