import React from 'react'
import moment from 'moment'
import { Modal } from 'antd'

export const api = {
  space: 'qa'
}

export const app = {
  version: require('../../package.json').version,
  dbpref: 'oya_',
  cookieDomain: process.env.REACT_APP_COOKIES_DOMAIN || 'localhost',
  adm_url: process.env.REACT_APP_ADMIN_URL || 'http://localhost:3117/',
  accounts_url: process.env.REACT_APP_ACCOUNTS_URL || 'http://localhost:3115/'
}

export const initialize = () => {
  api.apiURL = process.env.REACT_APP_API_URL || 'https://api.oyaghana.dev/api/'
  api.apiToken = getStorage('token') || ''
}

export const dates = {
  yr: moment().format('YYYY')
}

// ::: cookie
export const setCookie = (cname, cvalue, exdays = 7) => {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = `${app.dbpref + cname}=${cvalue};${expires};path=/;domain=${app.cookieDomain
    }`
}
export const setCookieJson = (cname, cvalue, exdays = 7) => {
  setCookie(cname, JSON.stringify(cvalue), exdays)
}
export const getCookie = (cname) => {
  const name = app.dbpref + cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      if (c.split('=')[1].length !== 0) {
        return c.substring(name.length, c.length)
      }
    }
  }
  return ''
}
export const getCookieJson = (cname) => {
  const value = getCookie(cname)
  return value && isJson(value) ? JSON.parse(value) : ''
}
export const delCookie = (cname) => {
  const expires = 'expires=-1'
  document.cookie = `${app.dbpref + cname}=;${expires};path=/;domain=${app.cookieDomain
    }`
}

export const isJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

// ::: storage
export const setStorage = (key, value) => {
  if (key && value) {
    localStorage.setItem(app.dbpref + key, value)
  }
}
export const getStorage = (key) => {
  const value = localStorage.getItem(app.dbpref + key)
  return value || ''
}
export const setStorageJson = (key, value) => {
  if (key && value) {
    localStorage.setItem(app.dbpref + key, JSON.stringify(value))
  }
}
export const getStorageJson = (key) => {
  if (key) {
    const value = localStorage.getItem(app.dbpref + key)
    return JSON.parse(value) || []
  }
}
export const delStorage = (key) => {
  if (key) {
    localStorage.removeItem(app.dbpref + key)
  }
}

// Data Request
initialize()

// Spinners
export const fspinner = (
  <div style={{}}>
    <i className="fa fa-spin fa-spinner fa-5x primary"></i>
  </div>
)
export const fspinnerSm = (
  <div style={{}}>
    <i className="fa fa-spin fa-spinner fa-3x primary"></i>
  </div>
)
export const fspinnerXs = <i className="fa fa-spin fa-spinner primary"></i>

export const redirect = (to) => {
  window.location = to
}

export const generateOptions = (length, step = 1) => {
  const arr = []
  for (let value = 0; value < length; value += step) {
    arr.push(value)
  }
  return arr
}

export const hasR = (role) => {
  return true
  // let user = getStorageJson('user');
  // let myRoles = ((user.role || {}).data || '').split(',');
  // return (myRoles.includes(role) || myRoles.includes('*'));
}

export const numberFormat = (number, minimumFractionDigits = 0) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits }).format(
    number
  )
}

export const loading = (content) => {
  return new Promise((resolve) => {
    content = (
      <div
        dangerouslySetInnerHTML={{
          __html: `<i class="fa fa-spin fa-spinner primary"></i> <span>${content}</span>`
        }}
      />
    )
    const loading = Modal.info({
      icon: null,
      title: null,
      centered: true,
      content,
      width: '250px',
      cancelText: <div />
    })
    resolve(loading)
  })
}

export const alert = (props = {}) => {
  Modal.confirm({
    okText: 'Okay!',
    width: '300px',
    cancelText: <span />,
    cancelButtonProps: { className: 'hide' },
    ...props,
    icon: null,
    centered: true,
    content: <span dangerouslySetInnerHTML={{ __html: props.content }} />
    // onOk: (close) => {
    //     close();
    //     props.onOK && props.onOK();
    // }
  })
}

export const datesBetween = (startDate, endDate, format = 'YYYY-MM-DD') => {
  const dates = []
  let currentDate = startDate
  const addDays = function (days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }
  while (currentDate <= endDate) {
    const date = moment(currentDate).format(format)
    if (!dates.includes(date)) {
      dates.push(date)
    }
    currentDate = addDays.call(currentDate, 1)
  }
  return dates
}
