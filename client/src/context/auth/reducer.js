import { ERROR, LOGIN, LOGOUT, REGISTER } from "../types"

const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        error: null,
        user: action.payload
      }
    case LOGIN:
      return {
        ...state,
        authenticated: true,
        error: null,
        token: action.payload.token,
        user: action.payload.user
      }
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        error: null,
        token: null,
        user: null
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default AuthReducer