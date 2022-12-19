import { func } from '../../utils'
import { SIGNING_IN, SIGNIN_SUCCESS, SIGNOUT_SUCCESS, UPDATE_PROFILE } from '../_types'

const user = func.getCookieJson('user')
const token = func.getCookie('token')
const verify = func.getCookie('verify')

const initialState = {
  logg: user,
  authenticated: !!(token && user.name && !verify),
  token,
  signingIn: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_IN:
      return {
        ...state,
        signingIn: action.payload
      }

    case SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
        logg: action.payload.data
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        logg: {},
        authenticated: false,
        token: ''
      }

    case UPDATE_PROFILE:
      return {
        ...state,
        logg: action.payload
      }
    default:
      return state
  }
}

export default authReducer
