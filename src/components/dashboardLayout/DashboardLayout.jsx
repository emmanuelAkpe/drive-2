import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Menus } from './menu'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true)

  return (
    <div className='flex bg-white h-full '>
      <div
        className={`hidden md:block z-[999] ${open ? 'w-72' : 'w-32 '
          }   px-5  pt-8 sticky top-0 duration-300 h-[100vh]`}
      >
        <div
          className='absolute cursor-pointer -right-3 top-5 w-7 h-7  bg-bgCol
            rounded-full flex items-center justify-center'
          onClick={() => setOpen(!open)}
        >
          <FaArrowRight className={`text-white  ${!open && 'rotate-180'}`} />
        </div>

        <Link to='/'>
          <span className='flex gap-x-4 items-center -mt-3'>
            <img
              src={require('../../assets/img/dashboardIcons/logo.png')}
              className={`cursor-pointer duration-500 w-8 h-8  ${open ? 'rotate-[360deg] ' : 'w-8 h-8'
                }`}
            />
            <h1
              className={`text-black origin-left font-bold text-xl duration-200 ${!open && 'hidden'
                }`}
            >
              Oya
            </h1>
          </span>
        </Link>
        <ul className='mt-14 mb-20'>
          {Menus.map((Menu, index) => (
            // <li
            //   key={index}
            //   className={`flex  rounded-md p-2  cursor-pointer hover:bg-ticketbg  hover:text-gray-400 hover:scale-110 hover:duration-200  text-gray-500 text-xl font-bold items-center gap-x-4
            //    `}
            // >
            <NavLink
              to={Menu.path}
              exact={Menu.exact}
              className='flex mb-2  rounded-md p-2  cursor-pointer hover:bg-hoverDashBg  hover:text-gray-400 hover:scale-110 hover:duration-200  text-gray-500 text-xl font-bold items-center gap-x-4'
              key={index}
            >
              <img
                src={Menu.src}
                alt='icons'
                height={500}
                className={`w-7 h-7 object-cover ${!open && 'w-5 h-5'}`}
              />
              <span
                className={`${!open && 'hidden'} origin-left duration-200  `}
              >
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
        <span
          className={`flex flex-col  rounded-md p-2  cursor-pointer  text-gray-500 text-xl font-bold items-center ${!open ? 'text-sm ' : '-ml-8'
            }`}
        >
          <span className='flex flex-col items-center mb-3'>
            <h1>Download</h1>
            <h1>Our app</h1>
          </span>
          <div className={`flex flex-col ${!open && 'w-16'}`}>
            <a
              href='https://play.google.com/store/apps/details?id=com.oyaghana.oyaapp_porter'
              target='_blank' rel="noreferrer"
            >
              <img
                src='/assets/img/dashboardIcons/google.png'
                alt='google'
                className='my-2  '
              />
            </a>
            <a
              href='https://apps.apple.com/gh/app/oya/id1623866371'
              target='_blank' rel="noreferrer"
            >
              <img
                src='/assets/img/dashboardIcons/apple.png'
                alt='google'
                className='mb-5'
              />
            </a>
          </div>
        </span>
      </div>

      <div className='h-auto flex-1 '>
        {/* <DashboardNav /> */}
        <div className='md:mt-24'>{children}</div>
      </div>
    </div>
  )
}
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default DashboardLayout
