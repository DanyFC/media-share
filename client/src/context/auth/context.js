"use client"
import { createContext, useReducer } from 'react'
import { ERROR, LOGIN, LOGOUT, REGISTER } from "../types"
import AuthReducer from './reducer'
import axiosClient from '@/config/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const initialState = {
    authenticated: false,
    error: null,
    token: null,
    user: null,
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        error: state.error,
        token: state.token,
        user: state.user,
        register: async (name, email, password) => {
          try {


          } catch (error) {
            console.log('Error creating user: ', error.message)
            throw new Error("Registration failed,  please try again.")
          }
        },
        logOut: async () => {
          try {

          } catch (error) {
            console.log('Error to log out', error.message)
            throw new Error("Logout failed, please try again.")
          }
        },
        logIn: async (email, password) => {
          try {

          } catch (error) {
            console.log('Error logging in: ', error.message)
            throw new Error("Unable to login, please check your credentials.")
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}