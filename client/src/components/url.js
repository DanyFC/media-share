import { useState } from "react"

const Url = ({ fileUrl }) => {
  const [clipboard, setClipboard] = useState({
    value: 'Copy!',
    state: false
  })

  const handleClick = () => {
    navigator.clipboard.writeText(fileUrl)
    setClipboard({
      value: 'Copied!',
      state: true
    })
  }

  return (
    <div className='text-center h-full flex flex-col justify-center gap-4 items-center'>
      <p className='font-bold text-4xl'>Your URL</p>
      <p className='text-3xl'>{fileUrl}</p>
      <button className={`${clipboard.state ? 'bg-gray-400' : 'bg-primary'} w-3/4 py-8 rounded-lg text-white hover:bg-black font-bold my-7 text-4xl`} onClick={handleClick}>
        {clipboard.value}
      </button>
    </div>
  )
}

export default Url