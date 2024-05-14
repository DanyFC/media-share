"use client"
import { CLEAR_CONTEXT, CLEAR_ERROR, CREATE_LINK, ERROR, LOADING, UPLOAD_FILE } from '../types'
import { createContext, useReducer } from 'react'
import axiosClient from '@/config/axios'
import FileReducer from './reducer'

export const FileContext = createContext()

export const FileProvider = ({ children }) => {
  const initialState = {
    error: null,
    file: null,
    loading: false,
    url: null
  }

  const [state, dispatch] = useReducer(FileReducer, initialState)

  const showError = ({ msg = 'Opps! something goes wrong' }) => {
    dispatch({ type: ERROR, payload: msg })
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR })
    }, 3000)
  }

  return <FileContext.Provider
    value={{
      error: state.error,
      file: state.file,
      loading: state.loading,
      url: state.url,
      uploadFile: async (formData) => {
        try {
          dispatch({ type: LOADING })
          const response = await axiosClient.post('/api/file', formData)
          dispatch({
            type: UPLOAD_FILE, payload: {
              name: response.data.file.filename,
              originalName: response.data.file.originalname
            }
          })
        } catch (error) {
          showError(error.response.data.errors[0])
          throw new Error('Something went wrong while trying to upload the file.')
        }
      },
      showError,
      createLink: async ({ downloads, password }) => {
        if (!state.file) return
        try {
          dispatch({ type: LOADING })
          const response = await axiosClient.post('/api/link', {
            downloads: downloads,
            name: state.file.name,
            originalName: state.file.originalName,
            password: password
          })
          dispatch({ type: CREATE_LINK, payload: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/link/${response.data.url}` })
        } catch (error) {
          showError(error.response.data.errors[0])
          throw new Error('Something went wrong while creating a link for your file.')
        }
      },
      clearContext: () => {
        dispatch({ type: CLEAR_CONTEXT })
      }
    }}
  >
    {children}
  </FileContext.Provider>
}