import { combineReducers } from 'redux'

import authReducer from './auth/_authReducer'
import utilsReducer from './utils/_utilsReducer'
import dataReducer from './data/_dataReducer'
const fn = () =>
  combineReducers({
    auth: authReducer,
    data: dataReducer,
    utils: utilsReducer
  })

export default fn
