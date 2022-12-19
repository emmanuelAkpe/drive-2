import React from 'react'
import { Link } from 'react-router-dom'
import { FaBus, FaTrain } from 'react-icons/fa'

const HireBusHomeCard = () => {
  const cards = [
    {
      name: 'Normal Hires',
      route: 'normal-hire',
      icon: (
        <FaBus
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: ' #EDFFEF',
      Desc: 'you can hire a bus here'
    },
    {
      name: 'Special Hires',
      route: 'special-hire',
      icon: (
        <FaTrain
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: ' #EDFFEF',
      Desc: 'Have special requests in mind? Then hire this bus.'
    }
  ]
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-cols-1 gap-x-5 mx-3 my-10  ">
      {cards.map((card, index) => (
        <div className="mb-4" key={index}>
          <Link className="card-body  pt-5 pb-5 mr-5 " to={`/${card.route}`}>
            <div
              className="hover:scale-105 transition-all duration-2000 ease-in-out p-5 h-52"
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

export default HireBusHomeCard
