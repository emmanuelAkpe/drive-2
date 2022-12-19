import React from 'react'
import { Link } from 'react-router-dom'
import { FaRoad, FaTicketAlt, FaBus, FaGift } from 'react-icons/fa'

const DashboarCards = () => {
  const cards = [
    {
      name: 'Trips',
      route: 'trips',
      icon: (
        <FaRoad
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: ' #EDFFEF',
      Desc: 'you can view all your previous trips here'
    },
    {
      name: 'Tickets',
      route: 'tickets',
      icon: (
        <FaTicketAlt
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: ' #E6E6E6',
      Desc: 'you can book a ticket or view all your previous tickets here'
    },
    {
      name: 'Hiring Service',
      route: 'hiring',
      icon: (
        <FaBus
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: '#FFF2EC',
      Desc: 'you can hire a bus here'
    },
    {
      name: 'Parcel Service',
      route: 'parcels',
      icon: (
        <FaGift
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: '#ECFBFF',
      Desc: 'you can send or receive a parcel here'
    }
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  place-items-center gap-x-5 mx-3 my-10  ">
      {cards.map((card, index) => (
        <div className="mb-4 w-full  " key={index}>
          <Link className="card-body  pt-5 pb-5 mr-5  " to={`/${card.route}`}>
            <div
              className="rounded-xl hover:scale-105 transition-all duration-2000 ease-in-out p-5 h-48"
              style={{ backgroundColor: `${card.Bgcolor}` }}
            >
              <div className="bg-iconBg w-8 h-8 rounded-lg flex items-center justify-center ">
                {card.icon}
              </div>
              <div className="dark mt-3">
                <h4 className="font-bold">{card.name}</h4>
                <p className="text-gray-700 font-xl">{card.Desc}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default DashboarCards
