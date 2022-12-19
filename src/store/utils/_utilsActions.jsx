import { func } from '../../utils'
import { SET_SITE_LANG, SET_PAGE_TITLE, SET_PAGE_SUB_TITLE, SET_SET_SETTINGS } from '../_types'

export const setPageTitle = (title) => {
  return dispatch => {
    dispatch({ type: SET_PAGE_TITLE, title })
  }
}

export const setPageSubTitle = (title) => {
  return dispatch => {
    dispatch({ type: SET_PAGE_SUB_TITLE, title })
  }
}

export const setSiteLang = (lang) => {
  return dispatch => {
    dispatch({ type: SET_SITE_LANG, lang })
  }
}

export const setSetSettings = (key, value) => {
  func.setStorageJson(key, value)
  return dispatch => {
    dispatch({
      type: SET_SET_SETTINGS, key, value
    })
  }
}
