import axios from 'axios'
import { APP_API_URL } from './constants'
import { getCookie } from './functions'

export const apiHeaders = (type = '') => {
  const token = getCookie('token') || ''
  if (type === 'file') {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  } else {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
}

export const get = async (path, params = {}, options = {}) => {
  let headers = apiHeaders()
  headers = { ...headers, ...options }
  const url = `${APP_API_URL}${path}`
  return axios({
    method: 'GET',
    url,
    headers,
    params
  }).then(response => {
    const res = response.data
    return res
  }).catch(error => {
    return { status: 606, result: 'Network request failed', error }
  })
}
