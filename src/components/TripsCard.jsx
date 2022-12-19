/*eslint-disable*/
import React, { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import { axius } from '../utils'
import { FaRoad } from 'react-icons/fa'
import Empty from './Empty'

const TripsCard = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axius.get('trips').then((res) => {
      setLoading(false)
      setData(res.status === 200 ? res.data : [])
    })
  }, [])

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data.map((trip, index) => {
          var bus = trip?.ticket?.bus_schedule
          return (
            <div
              key={index}
              className="flex items-center justify-start  bg-white  px-5 py-2 rounded-lg mb-3 hover-scale cursor-pointer md:w-10/12"
            >
              <div className="mr-5 bg-iconBg w-8 h-8 md:w-14 md:h-14 rounded-full  flex items-center justify-center">
                <FaRoad className="text-ticket md:w-8 md:h-8 w-5 h-5 " />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-start relative font-bold w-full">
                  <h1 className="flex-1">
                    {bus?.route?.from?.name} - {bus?.route?.to?.name}
                  </h1>
                  <span className="flex-1"></span>
                  <p
                    className="text-oya-ghana-green cursor-pointer font-bold "
                    onClick={() =>
                      window.open(`/ticket?tn=${trip?.manifest_code}`, '_blank')
                    }
                  >
                    view receipt
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
                   <img src="/assets/img/dashboardIcons/404.png" alt="" />
                   <h1 class='text-4xl font-bold '>No Trips Found</h1>
                     <p class="text-gray-700">oops! Seems like you have not had any trip with us yet.</p>
                    </div>`}
        />
      )}
    </>
  )
}

export default TripsCard
