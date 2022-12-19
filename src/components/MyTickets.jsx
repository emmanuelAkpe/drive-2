/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { axius } from '../utils'

import moment from 'moment'
import Empty from './Empty'

import Tic from './Tic'
import { FaBus } from 'react-icons/fa'

const MyTickets = (props) => {
  const [full, setFull] = useState({})
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axius.get('tickets').then((res) => {
      setLoading(false)
      setData(res.status === 200 ? res.data : [])
      //   console.log(data)
    })
  }, [])

  return (
    <React.Fragment>
      <div>
        {loading ? (
          <h1 className="fixed top-1/2 right-1/2">Loading...</h1>
        ) : (
          <div
            className="grid xl:grid-cols-2 md:gap-x-5 md:grid-cols-1 grid-cols-1 place-items-center  "
            style={{ minHeight: '50vh' }}
          >
            {data.map((row, index) => (
              <div
                key={index}
                className="xl:w-[397px] xl:h-[320px] md:w-full md:h-[294px] md:mx-12  bg-white rounded-xl mt-8 hover-scale cursor-pointer"
                onClick={() => {
                  setFull(row)
                }}
              >
                <div className="grid grid-cols-2 p-5 gap-x-8 ">
                  <div className="flex flex-col  items-start justify-start mb-3">
                    <div className="flex gap-x-1">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Vehicle Number</h3>
                    </div>
                    {row.bus_schedule.bus.reg_number || '-'}
                  </div>
                  <div className="flex flex-col  items-start justify-start mb-3">
                    <div className="flex gap-x-1">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Trip Date</h3>
                    </div>
                    <p>
                      {moment(row.bus_schedule.departure_date).format(
                        'MMM DD, YYYY'
                      )}
                    </p>
                    <p>{row.bus_schedule.departure_time}</p>
                  </div>
                  <div className="flex flex-col ititems-start justify-startems-center  mb-3">
                    <div className="flex  gap-x-1 ">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Ticket Number</h3>
                    </div>
                    <p>{row.ticket_no}</p>
                  </div>
                  <div className="flex flex-col ititems-start justify-startems-center  mb-3">
                    <div className="flex  gap-x-1 ">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Seat Number</h3>
                    </div>
                    <p>{row?.seat.number || '-'}</p>
                  </div>
                  <div className="flex flex-col ititems-start justify-startems-center  mb-3">
                    <div className="flex  gap-x-1">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Station Code</h3>
                    </div>
                    <p>{row.bus_schedule.station.code || '-'}</p>
                  </div>
                  <div className="flex flex-col ititems-start justify-startems-center  mb-3">
                    <div className="flex  gap-x-1">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Station Contact</h3>
                    </div>
                    <p>{row.bus_schedule.station.momo || '-'}</p>
                  </div>
                  <div className="flex flex-col ititems-start justify-startems-center  mb-3">
                    <div className="flex  gap-x-1">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Conductor</h3>
                    </div>
                    <p>{row.bus_schedule.conductor.user.name || '-'}</p>
                    <p>{row.bus_schedule.conductor.user.phone || '-'}</p>
                  </div>

                  <div className="flex flex-col ititems-start justify-startems-center  mb-3">
                    <div className="flex  gap-x-1">
                      <FaBus className="text-oya-ghana-green" />
                      <h3>Driver</h3>
                    </div>
                    <p>{row.bus_schedule.driver.user.name || '-'}</p>
                    <p>{row.bus_schedule.driver.user.phone || '-'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && data.length === 0 && (
          <Empty
            text={`<div>
                   <div>
                   <img src="/assets/img/dashboardIcons/Tic404.png" alt="" width='250'/>
                   <h1 class='text-3xl font-bold '>No Trips Found</h1>
                     <p class="text-gray-700">oops! Seems like you have not had any trip with us yet.</p>
                    </div>`}
          />
        )}
      </div>

      <Modal
        title="Ticket details"
        visible={!!full.id}
        onCancel={() => {
          setFull({})
        }}
      >
        <Tic {...props} row={full} />
      </Modal>
    </React.Fragment>
  )
}

export default MyTickets
