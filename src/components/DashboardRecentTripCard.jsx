/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { FaRoad } from 'react-icons/fa'
import Empty from './Empty'
import { get } from '../utils/api'

const DashboardRecentTripCard = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    get('trips').then((res) => {
      setLoading(false)
      setData(res.status === 200 ? res.data : [])
    })
  }, [])

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data.slice(0, 2).map((trip, index) => {
          const bus = trip?.ticket?.bus_schedule
          return (
            <div
              key={index}
              className="flex items-start justify-start  bg-white  px-5 py-2 rounded-lg mb-3 hover-scale cursor-pointer w-[90vw] md:w-[60vw] xl:w-[100%] "
            >
              <div className="mr-5 bg-iconBg w-8 h-8 md:w-14 md:h-14 rounded-full  flex items-center justify-center">
                <FaRoad className="text-ticket md:w-8 md:h-8 w-5 h-5 " />
              </div>
              <div className="">
                <div className="flex justify-start md:justify-center items-center gap-x-3 md:gap-x-36  xl:gap-x-60 font-bold ">
                  <h1>
                    {bus?.route?.from?.name} - {bus?.route?.to?.name}
                  </h1>
                  <p
                    className="text-oya-ghana-green cursor-pointer font-bold"
                    onClick={() =>
                      window.open(`/ticket?tn=${trip?.manifest_code}`, '_blank')
                    }
                  >
                    View Receipt
                  </p>
                </div>
                <div className="flex  items-start justify-start gap-x-2 ">
                  <h3 className="font-bold ">Price:</h3>
                  <p className="font-bold text-gray-500">{bus?.price}</p>
                </div>
                <div className="flex  items-start justify-start  gap-x-2 ">
                  <h3 className="font-bold ">Vehicle Number:</h3>
                  <p className="font-bold text-gray-500">
                    {bus?.bus?.reg_number}
                  </p>
                </div>
                <div className="flex  items-start justify-start gap-x-2 ">
                  <h3 className="font-bold ">Trip Date:</h3>
                  <p className="font-bold text-gray-500">
                    {moment(bus?.departure_date).format('MMM DD, YYYY')},{' '}
                    {bus?.departure_time}
                  </p>
                </div>
              </div>
            </div>
          )
        })
      )}

      {!loading && data.length === 0 && (
        <Empty
          text={`<div>
                   <div>
                   <img src="/assets/img/dashboardIcons/404.png" alt="" width='250'/>
                   <h1 class='text-3xl font-bold '>No Trips Found</h1>
                     <p class="text-gray-700">oops! Seems like you have not had any trip with us yet.</p>
                    </div>`}
        />
      )}
    </>
  )
}

export default DashboardRecentTripCard
