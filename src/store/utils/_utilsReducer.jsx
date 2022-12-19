import { SET_SITE_LANG, SET_PAGE_TITLE, SET_PAGE_SUB_TITLE } from '../_types'

const initialState = {
  pageTitle: 'Oya Ghana',
  pageSubTitle: '',
  lang: 'en'
}

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.title
      }

    case SET_PAGE_SUB_TITLE:
      return {
        ...state,
        pageSubTitle: action.title
      }

    case SET_SITE_LANG:
      return {
        ...state,
        lang: action.lang
      }
    default:
      return state
  }
}

export default utilsReducer
