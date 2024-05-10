import { CLEAR_ERROR, CREATE_LINK, ERROR, LOADING, UPLOAD_FILE } from '../types'
const FileReducer = (state, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        loading: false,
        file: action.payload
      }
    case CREATE_LINK:
      return {
        ...state,
        loading: false,
        url: action.payload
      }
    case LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    case ERROR:
      return {
        ...state,
        loading: false,
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

export default FileReducer