import { CLEAR_ERROR, ERROR, LOGIN, LOGOUT, VALIDATE_SESSION } from "../types"

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('loggedAppUser', JSON.stringify({ token: action.payload.token, userName: action.payload.userName }))
      return {
        ...state,
        authenticated: true,
        error: null,
        token: action.payload.token,
        userName: action.payload.userName
      }
    case VALIDATE_SESSION:
      return {
        ...state,
        authenticated: true,
      }
    case LOGOUT:
      localStorage.removeItem('loggedAppUser')
      return {
        ...state,
        authenticated: false,
        token: null,
        userName: null
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default AuthReducer