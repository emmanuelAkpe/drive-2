import { func } from '../../utils'
import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS, UPDATE_PROFILE } from '../_types'

export const signInSuccess = (data) => {
  return (dispatch) => {
    func.setCookieJson('user', data)
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: { data }
    })
  }
}

export const signOutSuccess = () => {
  return (dispatch) => {
    func.delCookie('user')
    func.delCookie('role')
    func.delCookie('token')
    func.redirect(
      func.app.accounts_url + '?appref=' + window.location.origin + '/'
    )
    dispatch({ type: SIGNOUT_SUCCESS })
  }
}

export const profileUpdated = (payload) => {
  return (dispatch) => {
    func.setCookieJson('user', payload)
    dispatch({ type: UPDATE_PROFILE, payload })
  }
}
