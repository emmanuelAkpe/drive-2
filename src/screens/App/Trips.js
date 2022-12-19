import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import TripsCard from '../../components/TripsCard'

const AppTrips = () => {
  const navigate = useNavigate()
  return (
    <div className="m-5 ">
      <div className=" pt-5 flex items-start justify-start gap-2">
        <div
          className="grid place-content-center bg-oya-ghana-green rounded-full w-8 h-8 "
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-white" />
        </div>
        <div className="flex items-start justify-start flex-col mb-10">
          <h1 className="text-2xl font-semibold">My Trips</h1>
          <p className=" text-gray-700">Your overall trips</p>
        </div>
      </div>
      <TripsCard />
    </div>
  )
}

export default AppTrips
