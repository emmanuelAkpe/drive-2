import React from 'react'
import { FaBook } from 'react-icons/fa'
// import Empty from './Empty'

const DashboardAdvancedBookingCard = () => {
  // const [loading] = useState(true)
  return (
    <div className="flex items-start justify-start  px-5 py-2 rounded-lg mb-3   my-3">
      <div className="">
        <h1 className="font-bold">Destinations</h1>
        <div className="flex items-center justify-center gap-x-1">
          <div className=" bg-appBg rounded-full w-7 h-7 md:w-12 md:h-12 flex items-center justify-center">
            <FaBook className="text-oya-ghana-green" />
          </div>
          <div className="flex flex-col justify-center items-center ">
            <h1 className="  text-bgCol  font-bold -mb-2">6:30</h1>
            <h2 className=" font-bold text=">Accra</h2>
          </div>

          {/* break */}
          <div className="flex justify-center items-center gap-2 ">
            <span className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-ticket flex items-center justify-center ">
              <span className="w-5 h-5 bg-ticket rounded-full flex items-center justify-center ">
                <span className="w-3 h-3 bg-bgCol rounded-full"></span>
              </span>
            </span>

            <span className="bg-bgCol w-1.5 h-px "></span>
            <span className="bg-bgCol w-1.5 h-px "></span>
            <span className="bg-bgCol hidden  md:w-1.5 h-px "></span>
            <span className="bg-bgCol hidden  md:w-1.5 h-px "></span>
            <span className="bg-bgCol hidden md:w-1.5 h-px "></span>

            <span className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-ticket flex items-center justify-center ">
              <span className="w-5 h-5 bg-ticket rounded-full flex items-center justify-center ">
                <span className="w-3 h-3 bg-bgCol rounded-full"></span>
              </span>
            </span>
          </div>
          {/* break */}
          <div className="flex flex-col justify-center  items-center   ">
            <h1 className="  text-bgCol font-bold -mb-2 ">2:30</h1>
            <h2 className=" font-bold">Tarkwa</h2>
          </div>
        </div>
      </div>
      <div className="px-2 ml-3 md:ml-12">
        <h1 className="font-bold">Date</h1>
        <h3 className="mt-2 text-sm">23/02/2020</h3>
      </div>
    </div>
  )
}

export default DashboardAdvancedBookingCard
