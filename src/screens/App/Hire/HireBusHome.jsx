import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import HireBusHomeCard from '../../../components/HireBusHomeCard'

const HireBusHome = () => {
  const navigate = useNavigate()
  return (
    <div className="m-5">
      <div className=" pt-5 flex items-start justify-start gap-2">
        <div
          className="grid place-content-center bg-oya-ghana-green rounded-full w-8 h-8 "
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-white" />
        </div>
        <div className="flex items-start justify-start flex-col">
          <h1 className="text-2xl font-semibold">Hire Bus</h1>
          <p className=" text-gray-700">Hire a bus here</p>
        </div>
      </div>
      <HireBusHomeCard />
    </div>
  )
}

export default HireBusHome
