import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import localeIntl from './assets/intl/data.json'

// import * as authAct from './store/auth/_authActions'
// import * as utilsAct from './store/utils/_utilsActions'

import { Loading } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from './utils/functions'
import { signOutSuccess } from './store/auth/_authActions'

// ::: main screens
const App = React.lazy(() => import('./screens/App'))
const Ticket = React.lazy(() => import('./screens/App/Ticket'))

const routes = [
  { path: '/*', component: App, auth: true, exact: true },
  { path: '/ticket', component: Ticket, exact: true, auth: 'any' }
]

const LoadingHTML = () => (
  <div
    className="text-center flex-middle"
    style={{ width: '100%', height: '100vh', justifyContent: 'center' }}
  >
    <Loading text="starting app..." />
  </div>
)

const OyaGhana = () => {
  const lang = useSelector((state) => state.utils.lang)
  const authenticated = getCookie('token')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authenticated && location.pathname !== '/ticket') {
      dispatch(signOutSuccess())
    }
  }, [])

  return (
    <React.Fragment>
      <React.Suspense fallback={<LoadingHTML />}>
        <IntlProvider
          locale={lang}
          defaultLocale="en"
          messages={localeIntl[lang]}
        >
          <Router>
            <Routes>
              {routes.map((row) => (
                <Route
                  key={row.path}
                  path={row.path}
                  exact={row.exact}
                  element={<row.component />}
                />
              ))}
            </Routes>
          </Router>
        </IntlProvider>
      </React.Suspense>
    </React.Fragment>
  )
}

OyaGhana.propTypes = {
  _auth: PropTypes.object,
  _utils: PropTypes.object
}
export default OyaGhana
