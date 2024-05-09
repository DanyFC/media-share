'use client'
import { createContext, useReducer } from 'react'
import { CLEAR_ERROR, ERROR, LOGIN, LOGOUT, VALIDATE_SESSION } from '../types'
import AuthReducer from './reducer'
import axiosClient from '@/config/axios'
import tokenAuth from '@/config/tokenAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const initialState = {
    authenticated: false,
    error: null,
    token: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('loggedAppUser'))?.token : null,
    userName: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('loggedAppUser'))?.userName : null,
  }

  if (initialState.token) {
    tokenAuth(initialState.token)
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const showError = ({ msg = 'Opps! something goes wrong' }) => {
    dispatch({ type: ERROR, payload: msg })
    setTimeout(() => {
      dispatch({ type: CLEAR_ERROR })
    }, 3000)
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        error: state.error,
        token: state.token,
        userName: state.userName,
        register: async (newUser) => {
          try {
            const response = await axiosClient.post('/api/user', newUser)
            if (response) {
              const loggedUser = await axiosClient.post('/api/auth', {
                account: newUser.email,
                password: newUser.password
              })
              dispatch({ type: LOGIN, payload: loggedUser.data })
            }
          } catch (error) {
            showError(error.response.data.errors[0])
            throw new Error('Registration failed,  please try again.')
          }
        },
        logIn: async (user) => {
          try {
            const response = await axiosClient.post('/api/auth', user)
            dispatch({ type: LOGIN, payload: response.data })
          } catch (error) {
            showError(error.response.data.errors[0])
            throw new Error('Login failed,  please try again.')
          }
        },
        validateSession: async () => {
          try {
            if (state.token) {
              const response = await axiosClient.get('/api/auth')
              if (response.data.id) {
                dispatch({ type: VALIDATE_SESSION })
              }
            }
          } catch (error) {
            dispatch({ type: LOGOUT })
            throw new Error('Validation failed.')
          }
        },
        logOut: async () => {
          try {
            dispatch({ type: LOGOUT })
          } catch (error) {
            showError(error.response.data.errors[0])
            throw new Error('Logout failed, please try again.')
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}