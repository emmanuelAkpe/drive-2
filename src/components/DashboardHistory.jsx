import React from 'react'
import DashboardAdvancedBookingCard from './DashboardAdvancedBookingCard'
import DashboardRecentTripCard from './DashboardRecentTripCard'

const DashboardHistory = () => {
  return (
    <div className="flex flex-col  xl:flex-row justify-between items-start">
      <div className="mb-3  xl:ml-4 xl:flex-[0.55] w-[95vw] md:w-[20vw] -ml-3">
        <div className="m-3 ">
          <h1 className="xl:text-[32px] text-lg md:text-lg font-semibold mb-2 ">
            History
          </h1>
          <p className="leading-5 text-lg xl:text-[24px] font-medium">
            Your Recent Trips
          </p>
        </div>
        <DashboardRecentTripCard />
      </div>
      <div className="mb-3 w-[90vw] md:w-[50vw] -ml-3 xl:flex-[0.4]">
        <div className="m-3">
          <h1 className="xl:text-[32px] text-lg  md:text-lg font-semibold mb-2">
            Advance Bookings
          </h1>
          <p className="leading-5 text-lg xl:text-[24px] font-medium">
            Your Booked Tickets
          </p>
        </div>
        <div
          className=" rounded-lg hover-scale cursor-pointer bg-white"
          style={{ minHeight: '13rem' }}
        >
          <div className="">
            <DashboardAdvancedBookingCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHistory
