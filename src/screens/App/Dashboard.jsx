import React from 'react'
import { useSelector } from 'react-redux'
import DashboardHistory from '../../components/DashboardHistory'
import DashboarCards from './Dashboar'

const AppDashboard = () => {
  const logg = useSelector((state) => state.auth.logg)

  return (
    <React.Fragment>
      <div id="Dashboard" className=" mt-5 mb-24 px-10">
        <h1 className="pt-3 md:text-xl mb-8 text-gray-800 font-semibold">
          Welcome Back <br /> {logg.name}!
        </h1>
        <DashboarCards />
        <DashboardHistory />
      </div>
    </React.Fragment>
  )
}

export default AppDashboard
