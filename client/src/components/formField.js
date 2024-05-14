const FormField = ({ formik, id, label, placeholder, type }) => {
  return (
    <div className='mb-4'>
      <label className='block text-black text-sm font-bold mb-2' htmlFor={id}>{label}</label>
      <input type={type} id={id} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md' placeholder={placeholder} value={formik.values[id]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {
        formik.touched[id] && formik.errors[id]
          ? (<div className='my-2 bg-gray-200 border-l-4 border-red-500 text-primary p-4'>
            <p className='font-bold'>Error:</p>
            <p>{formik.errors[id]}</p>
          </div>)
          : null
      }
    </div>
  )
}

export default FormField