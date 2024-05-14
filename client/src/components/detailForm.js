const DetailForm = ({ detailForm, setDetailForm }) => {
  return (
    <div className='w-full'>
      <div>
        <label className='text-lg text-gray-800'>Number of downloads:</label>
        <select className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus: outline-none' onChange={(event) => setDetailForm({ ...detailForm, downloads: parseInt(event.target.value, 10) })}>
          <option value='1'>1 download</option>
          <option value='5'>5 downloads</option>
          <option value='10'>10 downloads</option>
          <option value='15'>15 downloads</option>
          <option value='20'>20 downloads</option>
        </select>
      </div>
      <div>
        <label className='text-lg text-gray-800'>Password (optional):</label>
        <input type='password' className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 focus:outline-none focus:border-gray-500' placeholder='●●●●●●●●' onChange={(event) => setDetailForm({ ...detailForm, password: event.target.value })} />
      </div>
    </div>
  )
}

export default DetailForm