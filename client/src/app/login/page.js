"use client"
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      account: '',
      password: ''
    },
    validationSchema: Yup.object({
      account: Yup.string()
        .required('Account is required.'),
      password: Yup.string()
        .min(8, 'Password should have at least 8 characters')
        .required('Please enter your password')
    }),
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <div className='md:w-4/5 xl:w-3/5 mx-auto mb-2'>
      <h2 className='text-4xl font-bold text-gray-800 text-center my-4'>Log In</h2>
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label className='block text-black text-sm font-bold mb-2' htmlFor='account'>Account</label>
              <input type='text' id='account' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md' placeholder='your Username' value={formik.values.account} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.account && formik.errors.account
                  ? (<div className='my-2 bg-gray-200 border-l-4 border-red-500 text-primary p-4'>
                    <p className='font-bold'>Error:</p>
                    <p>{formik.errors.account}</p>
                  </div>)
                  : null
              }
            </div>
            <div className='mb-4'>
              <label className='block text-black text-sm font-bold mb-2' htmlFor='password'>Password</label>
              <input type='password' id='password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md' placeholder='●●●●●●●●' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {
                formik.touched.password && formik.errors.password
                  ? (<div className='my-2 bg-gray-200 border-l-4 border-red-500 text-primary p-4'>
                    <p className='font-bold'>Error:</p>
                    <p>{formik.errors.password}</p>
                  </div>)
                  : null
              }
            </div>
            <input type='submit' className='bg-primary hover:bg-black w-full p-2 text-white uppercase font-bold' value='Continue' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login