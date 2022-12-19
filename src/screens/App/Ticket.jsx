/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { parse } from 'querystring'
import { axius } from '../../utils'
import { func } from 'prop-types'
import moment from 'moment'
import QRCode from 'qrcode'

const Ticket = () => {
  const parsedQueryString = parse(location && location.search.replace('?', ''))
  const [, setTicketRef] = useState('')
  const [loading, setLoading] = useState('')
  const [ticket, setTicket] = useState({})

  const [qrsrc, setQrsrc] = useState('oyaghanabhbhblhl')

  const bus = ticket?.bus_schedule || {}
  const conductor = bus.conductor
    ? bus.conductor.user
    : (bus.staffs || []).find((sta) => sta.role.toLowerCase() === 'conductor') || {}

  useEffect(() => {
    const { tn } = parsedQueryString
    setTicketRef(tn)
    if (tn) {
      setLoading(true)
      axius.get(`public_ticket/${tn}`).then((res) => {
        setTicket(res.status === 200 ? res.data : [])
        setLoading(false)
      })
    }
  }, [])

  useEffect(() => {
    QRCode.toDataURL(qrsrc).then(setQrsrc)
  }, [])
  return (
    <div className=" w-full m-0 flex justify-center items-center  ">
      <Spin spinning={loading} indicator={func.fspinnerSm}>
        <div className="w-[327px] md:w-[450px] bg-ticketbg border border-ticket flex flex-col rounded-2xl p-10 mt-10 relative">
          <div className="flex flex-col justify-center items-center  ">
            <img src="/assets/img/icon.png" alt="logo" className="pt-5 " />
            <div className="grid grid-cols-3 place-items-center gap-12">
              <div className="flex flex-col justify-center items-center ">
                <h1 className="  text-bgCol text-2xl font-bold ">
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
                  <span className="w-5 h-5 bg-ticket rounded-full flex items-center justify-center z-50 ">
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
                  {/* Accra */}
                  {bus?.route?.to?.name}
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
                  {ticket?.ticket_no || '-'}
                </h3>
              </div>

              <div className="text-left -ml-10 md:m-0 ">
                <h1 className=" font-bold">INSURANCE</h1>
                <h3 className="text-ticketRed font-bold">GH¢0.00</h3>
              </div>
              <div className="text-left  md:m-0">
                <h1 className=" font-bold">VEHICLE NUMBER</h1>
                <h3 className="text-ticketRed font-bold">
                  {bus?.bus?.reg_number || '-'}
                </h3>
              </div>

              <div className="text-left -ml-10 md:m-0">
                <h1 className=" font-bold">TRIP DATE</h1>
                <h3 className="text-ticketRed font-bold">
                  {bus?.departure_date &&
                    moment(bus?.departure_date).format('MMM DD, YYYY')}
                  , {bus?.departure_time}
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
                  {bus?.station?.code || '-'}
                </h3>
              </div>
              <div className="text-left -mr-10 md:m-0 ">
                <h1 className=" font-bold">DRIVER&apos;S </h1>

                <h3 className="text-ticketRed font-bold">
                  {bus?.bus?.driver?.user?.name || '-'}
                  {/* MR APPIAH <br />
                  +233260884406 */}
                </h3>
              </div>
              <div className="text-left -ml-10 md:m-0 ">
                <h1 className=" font-bold">CONDUCTOR&apos;S</h1>

                <h3 className="text-ticketRed font-bold">
                  {conductor?.name || '-'} <br /> {conductor?.phone || '-'}
                </h3>
              </div>
              <div className="text-left -mr-10 md:m-0">
                <h1 className=" font-bold">STATION&apos;S CONTACT</h1>

                <h3 className="text-ticketRed font-bold">
                  {bus?.station?.phone || '-'}
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
                  {ticket?.user?.name} <br />
                  {ticket?.user?.phone}
                </h3>
              </div>
              <div className="text-left -mr-10 md:m-0 ">
                <h1 className=" font-bold">
                  EMERGENCY <br />
                  CONTACT
                </h1>
                <h3 className="text-ticketRed font-bold">
                  {ticket?.user?.ice1_phone || '-'}
                </h3>
              </div>
              {/* <div className="flex justify-center items-center gap-2 ">
                <span className="w-8 h-8 rounded-full border-none flex items-center justify-center absolute -left-3 bg-appBg"></span>
                <hr className="w-[302px] md:w-[97%] border-dashed border-px border-gray-600 absolute left-5 right-1"></hr>

                <span className="w-8 h-8 rounded-full border-none  flex items-center justify-center absolute -right-3 bg-appBg"></span>
              </div> */}
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="text-bgCol font-bold pb-5">BOARDING PASS</h1>
            <img src={qrsrc} alt="qr" className="w-32 h-32" />
          </div> */}
        </div>
      </Spin>
    </div>
  )
}

export default Ticket
