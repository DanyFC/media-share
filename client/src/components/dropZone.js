import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axiosClient from '@/config/axios'

const DropZone = () => {
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    //const response = await axiosClient.post('/api/file', formData)
    //console.log("🚀 ~ onDrop ~ response:", response)
    console.log("🚀 ~ onDrop ~ formData:", formData)
  }, [])

  const onDropRejected = useCallback(async () => {
    console.log('File rejection happened.')
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 })

  return (
    <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-primary border-2 bg-gray-100 px-4  md:h-[300px]'>
      {
        acceptedFiles.length > 0
          ? (
            <div className='mt-10 w-full'>
              <h4 className='text-3xl font-bold text-center mb-4'>Files</h4>
              <ul>
                <li className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'>
                  <p className='font-bold text-2xl text-center'>{acceptedFiles[0].name}</p>
                  <p className='text-lg text-gray-500 text-center'>{(acceptedFiles[0].size / Math.pow(1024, 2)).toFixed(2)} MB</p>
                </li>
              </ul>
              <button className='bg-primary w-full py-3 rounded-lg text-white my-10 hover:bg-black font-bold'>Create link</button>
            </div>
          )
          : (
            <div {...getRootProps({ className: 'dropzone w-full h-full py-32' })}>
              <input {...getInputProps()} className='h-full' />
              <div className='text-center content-center h-full cursor-default'>
                {
                  isDragActive
                    ? (<p className='text-4xl text-center text-gray-600'>
                      Drop it like it's hot!
                    </p>)
                    : (<>
                      <p className='text-3xl text-center text-gray-600'>
                        Drag and drop some files here, or click to select files.
                      </p>
                    </>)
                }
              </div>
            </div>
          )
      }
    </div>
  )
}

export default DropZone