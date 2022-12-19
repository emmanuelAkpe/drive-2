import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import localeIntl from './assets/intl/data.json'

// import * as authAct from './store/auth/_authActions'
// import * as utilsAct from './store/utils/_utilsActions'

import { Loading } from './components'
import { useSelector } from 'react-redux'
import './assets/scss/custom.scss'

// ::: main screens
const App = React.lazy(() => import('./screens/App'))
const Ticket = React.lazy(() => import('./screens/App/Ticket'))

const routes = [
  { path: '/*', component: App, exact: true, auth: true },
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
  const authenticated = useSelector((state) => state.auth.authenticated)
  const lang = useSelector((state) => state.utils.lang)

  useEffect(() => {
    if (!authenticated && this.props.history.location.pathname !== '/ticket') {
      // this.props.signOutSuccess()
    }
  }, [])

  const rautes = routes.filter(
    (route) => route.auth === authenticated || route.auth === 'any'
  )

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
              {rautes.map((row) => (
                <Route
                  key={row.path}
                  path={row.path}
                  exact={row.exact}
                  element={<row.component />}
                />
              ))}
            </Routes>
            {/* <Route path='/' exact element={authenticated?location.replace(LOGIN)} />  */}
            {/* <Navigate to="/" /> */}
          </Router>
        </IntlProvider>
      </React.Suspense>
    </React.Fragment>
  )
}

// const mapStateToProps = (state) => ({
//   _data: state.data,
//   _auth: state.auth,
//   _utils: state.utils
// })

// const mapDispatchToProps = (dispatch) => ({
//   signInSuccess: (data) => {
//     dispatch(authAct.signInSuccess(data))
//   },
//   signOutSuccess: () => {
//     dispatch(authAct.signOutSuccess())
//   },
//   setPageTitle: (title) => {
//     dispatch(utilsAct.setPageTitle(title))
//   },
//   setPageSubTitle: (title) => {
//     dispatch(utilsAct.setPageSubTitle(title))
//   },
//   profileUpdated: (data) => {
//     dispatch(authAct.profileUpdated(data))
//   }
// })

OyaGhana.propTypes = {
  _auth: PropTypes.object,
  _utils: PropTypes.object
}
export default OyaGhana
