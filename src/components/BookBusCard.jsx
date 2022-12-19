import React from 'react'
import { Link } from 'react-router-dom'
import { FaTicketAlt } from 'react-icons/fa'

const BookBusCard = () => {
  const cards = [
    {
      name: 'Book A Bus Now',
      route: 'buy-ticket',
      icon: (
        <FaTicketAlt
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: ' #EDFFEF',
      Desc: 'you can book a ticket here'
    },
    {
      name: 'Advance Booking',
      route: 'book-advance',
      icon: (
        <FaTicketAlt
          style={{
            height: '20px',
            width: '20px',
            color: '#079669'
          }}
        />
      ),
      Bgcolor: ' #EDFFEF',
      Desc: 'Purchase a ticket and book trips in advance with just a click'
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

export default BookBusCard
