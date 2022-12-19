import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { HiArchive } from 'react-icons/hi'
import { FaTicketAlt, FaBus } from 'react-icons/fa'
export const Menus = [
  {
    title: 'Dashboard',
    src: <MdDashboard className="w-[22px] h-[22px]" />,
    path: '/',
    exact: true
  },
  {
    title: 'Book a Bus',
    src: <FaTicketAlt className="w-[22px] h-[22px]" />,
    path: '/book-bus',
    exact: false
  },
  {
    title: 'Hire a Bus',
    src: <FaBus className="w-[22px] h-[22px]" />,
    path: '/hiring',
    exact: false
  },
  {
    title: 'Add  Parcel',
    src: <HiArchive className="w-[22px] h-[22px]" />,
    path: '/parcels',
    exact: false
  }
]
