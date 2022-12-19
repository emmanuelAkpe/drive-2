// eslint-disable-next-line
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardNav from '../../components/dashboardLayout/DashboardNav'
import './App.scss'

// ::: app screens
const AppUser = React.lazy(() => import('./AppUser'))
const AppDashboard = React.lazy(() => import('./Dashboard'))
const AppBuyTicket = React.lazy(() => import('./BuyTicket'))
const AppTickets = React.lazy(() => import('./AppTickets'))
const AppMyTickets = React.lazy(() => import('./AppMyTickets'))
const AppEnrollBus = React.lazy(() => import('./EnrollBus'))
const AppTrips = React.lazy(() => import('./Trips'))
const AppSpecialHire = React.lazy(() => import('./Hire/SpecialHire'))
const AppNormalHire = React.lazy(() => import('./Hire/NormalHire'))
const HireSpecialBus = React.lazy(() => import('./Hire/HireSpecialBus'))
const HireNormalBus = React.lazy(() => import('./Hire/HireNormalBus'))
const AppParcel = React.lazy(() => import('./AppParcel'))
const AppHiring = React.lazy(() => import('./Hire'))
const BookBusHome = React.lazy(() => import('./BookBusHome'))
const AdvanceBooking = React.lazy(() => import('./AdvanceBooking'))

const routes = [
  { path: '/', component: AppDashboard, exact: true },
  { path: '/user', component: AppUser, exact: true },
  { path: '/trips', component: AppTrips, exact: true },
  { path: '/buy-ticket', component: AppBuyTicket, exact: true },
  { path: '/book-advance', component: AdvanceBooking, exact: true },
  { path: '/tickets', component: AppTickets, exact: true },
  { path: '/my-tickets', component: AppMyTickets, exact: true },
  { path: '/enroll-bus', component: AppEnrollBus, exact: true },
  { path: '/parcels', component: AppParcel, exact: true },
  { path: '/hiring', component: AppHiring, exact: true },
  { path: '/special-hire', component: AppSpecialHire, exact: true },
  { path: '/normal-hire', component: AppNormalHire, exact: true },
  { path: '/hire-special-bus', component: HireSpecialBus, exact: true },
  { path: '/hire-bus', component: HireNormalBus, exact: true },
  { path: '/book-bus', component: BookBusHome, exact: true }
]

const App = (props) => {
  return (
    <React.Fragment>
      {/* <SideNav /> */}
      <DashboardNav {...props} id="App">
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
      </DashboardNav>
    </React.Fragment>
  )
}

export default App
