import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BookBusCard from '../../components/BookBusCard'

const AppTickets = () => {
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
          <h1 className="text-2xl font-semibold">Book a Bus</h1>
          <p className=" text-gray-700">Book your trips</p>
        </div>
      </div>
      <BookBusCard />
    </div>
  )
}

export default AppTickets
