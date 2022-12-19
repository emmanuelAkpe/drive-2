import React, { useEffect, useState } from 'react'

import moment from 'moment'
import QRCode from 'qrcode'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Tic = ({ row }) => {
  const [qrsrc, setQrsrc] = useState('oyaghanabhbhblhl')

  const logg = useSelector((state) => state.auth.logg)

  const bus = row.bus_schedule || {}

  const conductor = bus.conductor
    ? bus.conductor.user
    : (bus.staffs || []).find(
        (sta) => sta.role.toLowerCase() === 'conductor'
      ) || {}

  useEffect(() => {
    QRCode.toDataURL(qrsrc).then(setQrsrc)
  }, [])
  return (
    <div className=" w-full m-0 flex justify-center items-center ">
      {row.id && (
        <div className="w-[327px] md:w-[450px]  border border-ticket flex flex-col rounded-2xl p-10 mt-10 relative">
          <div className="flex flex-col justify-center items-center  ">
            <img src="/assets/img/icon.png" alt="logo" className="pt-5 " />
            <div className="grid grid-cols-3 place-items-center gap-12">
              <div className="flex flex-col justify-center items-center ">
                <h1 className="  text-bgCol text-2xl font-bold ">
                  {/* TKD */}
                  {bus?.route?.from?.alias}
                </h1>
                <h2 className=" font-bold text=">
                  {bus?.route?.from?.name}
                  {/* Takoradi */}
                </h2>
              </div>
              <div className="flex justify-center items-center gap-2 ">
                <span className="w-7 h-7 rounded-full border border-ticket flex items-center justify-center ">
                  <span className="w-5 h-5 bg-ticket rounded-full flex items-center justify-center ">
                    <span className="w-3 h-3 bg-bgCol rounded-full"></span>
                  </span>
                </span>
                <span className="bg-bgCol w-1.5 h-px hidden md:block"></span>
                <span className="bg-bgCol w-1.5 h-px hidden md:block"></span>
                <span className="bg-bgCol w-1.5 h-px hidden md:block"></span>
                <span className="bg-bgCol w-1.5 h-px hidden md:block "></span>
                <span className="bg-bgCol w-1.5 h-px hidden md:block"></span>
                <span className="bg-bgCol w-1.5 h-px "></span>
                <span className="bg-bgCol w-1.5 h-px "></span>
                <span className="bg-bgCol w-1.5 h-px "></span>
                <span className="bg-bgCol w-1.5 h-px "></span>
                <span className="bg-bgCol w-1.5 h-px "></span>

                <span className="w-7 h-7 rounded-full border border-ticket flex items-center justify-center ">
                  <span className="w-5 h-5 bg-ticket rounded-full flex items-center justify-center ">
                    <span className="w-3 h-3 bg-bgCol rounded-full"></span>
                  </span>
                </span>
              </div>
              <div className="flex flex-col justify-center  items-center  ">
                <h1 className="  text-bgCol font-bold text-2xl ">
                  {/* ACC */}
                  {bus?.route?.to?.alias}
                </h1>
                <h2 className=" font-bold">
                  {/* Accra */} {bus?.route?.to?.name}
                </h2>
              </div>
            </div>
            <hr className="w-[302px] md:w-[100%]   border-solid border-px border-gray-600 mt-3"></hr>
          </div>
          {/* second section begins */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-5 md:gap-x-16 m-5 w-full px-2 ">
              <div className="text-left -ml-10 md:m-0">
                <h1 className=" font-bold">TICKET PRICE</h1>
                <h3 className="text-ticketRed font-bold">GH¢ {bus?.price}</h3>
              </div>
              <div className="text-left -mr-10 md:m-0 ">
                <h1 className=" font-bold">TICKET NUMBER</h1>
                <h3 className="text-ticketRed font-bold">
                  {row.ticket_no || '-'}
                </h3>
              </div>

              <div className="text-left -ml-10 md:m-0 ">
                <h1 className=" font-bold">INSURANCE</h1>
                <h3 className="text-ticketRed font-bold">GH¢0.00</h3>
              </div>
              <div className="text-left  md:m-0">
                <h1 className=" font-bold">VEHICLE NUMBER</h1>
                <h3 className="text-ticketRed font-bold">
                  {(bus.bus && bus.bus.reg_number) || '-'}
                </h3>
              </div>

              <div className="text-left -ml-10 md:m-0">
                <h1 className=" font-bold">TRIP DATE</h1>
                <h3 className="text-ticketRed font-bold">
                  {moment(bus.departure_date).format('MMM DD, YYYY')},{' '}
                  {bus.departure_time}
                </h3>
              </div>
            </div>
            <hr className="w-[302px] md:w-[100%]  border-solid border-px border-gray-600 mt-3"></hr>
          </div>

          {/* End of second */}
          {/* 3rd section begins */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-5 md:gap-x-16 m-5 w-full px-2  ">
              <div className="text-left -ml-10 md:m-0">
                <h1 className=" font-bold">STATION</h1>
                <h3 className="text-ticketRed font-bold">
                  {(bus.station && bus.station.code) || '-'}
                </h3>
              </div>
              <div className="text-left -mr-10 md:m-0 ">
                <h1 className=" font-bold">DRIVER&apos;S </h1>

                <h3 className="text-ticketRed font-bold">
                  {(bus.bus &&
                    bus.bus.driver &&
                    bus.bus.driver.user &&
                    bus.bus.driver.user.name) ||
                    '-'}
                  {/* MR APPIAH <br />
                  +233260884406 */}
                </h3>
              </div>
              <div className="text-left -ml-10 md:m-0 ">
                <h1 className=" font-bold">CONDUCTOR&apos;S</h1>

                <h3 className="text-ticketRed font-bold">
                  {conductor.name || '-'} <br /> {conductor.phone || '-'}
                </h3>
              </div>
              <div className="text-left -mr-10 md:m-0">
                <h1 className=" font-bold">STATION&apos;S CONTACT</h1>

                <h3 className="text-ticketRed font-bold">
                  {(bus.station && bus.station.phone) || '-'}
                </h3>
              </div>
            </div>
            <hr className="w-[302px] md:w-[100%]  border-solid border-px border-gray-600 mt-3"></hr>
          </div>

          {/* 4th section begins */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-5 md:gap-x-16 m-5 w-full px-2 ">
              <div className="text-left -ml-10 md:m-0">
                <h1 className=" font-bold">
                  PASSENGER <br />
                  DETAILS
                </h1>
                <h3 className="text-ticketRed font-bold">
                  {logg?.name} <br />
                  {logg?.phone}
                </h3>
              </div>
              <div className="text-left -mr-10 md:m-0 ">
                <h1 className=" font-bold">
                  EMERGENCY <br />
                  CONTACT
                </h1>
                <h3 className="text-ticketRed font-bold">
                  {logg?.ice_primary_phone || '-'}
                </h3>
              </div>
              <div className="flex justify-center items-center gap-2 ">
                {/* <span className='w-8 h-8 rounded-full border-none flex items-center justify-center absolute -left-3 bg-white'></span> */}
                <hr className="w-[302px] md:w-[90%] border-dashed border-px border-gray-600 absolute left-5 right-1"></hr>

                {/* <span className='w-8 h-8 rounded-full border-none  flex items-center justify-center absolute -right-3 bg-white'></span> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="text-bgCol font-bold pb-5">BOARDING PASS</h1>
            <img src={qrsrc} alt="qr" className="w-32 h-32" />
          </div>
        </div>
      )}
    </div>
  )
}

Tic.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number,
    ticket_no: PropTypes.string,
    bus_schedule: PropTypes.object
  })
}

export default Tic
