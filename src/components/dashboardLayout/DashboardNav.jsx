import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Menus } from './menu'
import { func } from '../../utils'
import { Dropdown, Menu } from 'antd'
import { signOutSuccess } from '../../store/auth/_authActions'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FaAngleDown, FaAngleLeft } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const DashboardNav = ({ id, children }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [open, setOpen] = useState(true)

  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.auth.authenticated)
  // const logg = useSelector((state) => state.auth.logg)

  const logout = () => {
    func.alert({
      title: 'Are you sure you  want to logout?',
      // content:
      //   'Select Logout below if you are ready to end your current session.',
      okText: 'Logout',
      cancelText: 'Cancel',
      cancelButtonProps: { className: 'show' },
      onOk: () => {
        dispatch(signOutSuccess())
      }
    })
  }

  return (
    <div className="flex flex-col md:flex-row bg-appBg ">
      <div
        className={`hidden md:block bg-white border border-y-appBg z-[999] ${
          open ? 'w-60' : 'w-32 '
        }   px-5  pt-8 sticky top-0 duration-300 h-[100vh]`}
      >
        <div
          className="absolute cursor-pointer -right-3 top-5 w-7 h-7  bg-bgCol
            rounded-full flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <FaAngleLeft className={`text-white  ${!open && 'rotate-180'}`} />
        </div>

        <Link to="/">
          <span
            className={`flex gap-x-4 items-center  -mt-3 ${
              !open && 'justify-center'
            }`}
          >
            <img
              src={require('../../assets/img/dashboardIcons/logo.png')}
              className={`cursor-pointer duration-500 w-8 h-8  ${
                open ? 'rotate-[360deg] ' : 'w-8 h-8'
              }`}
            />
            <h1
              className={`text-black origin-left font-bold text-xl duration-200 ${
                !open && 'hidden'
              }`}
            >
              Oya!
            </h1>
          </span>
        </Link>
        <ul
          className={`mt-14 mb-20 ${
            !open && 'flex flex-col items-center justify-center'
          }`}
        >
          {Menus.map((Menu, index) => (
            <NavLink
              to={Menu.path}
              exact={Menu.exact}
              className="flex  mb-2  rounded-md p-2  cursor-pointer hover:w-auto   hover:bg-hoverDashBg hover:text-oya-ghana-green   hover:duration-200  text-gray-500 text-xl font-bold items-center gap-x-4 "
              key={index}
            >
              {Menu.src}
              <span
                className={`${
                  !open && 'hidden'
                } origin-left duration-200 text-[16px] font-medium `}
              >
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
        <span
          className={`flex flex-col  rounded-md p-2  cursor-pointer   text-gray-500 text-xl font-bold items-center ${
            !open ? 'text-sm ' : '-ml-8'
          }`}
        >
          <span
            className={`flex flex-col items-center mt-16  mb-3 ${
              !open && 'scale-0 '
            }`}
          >
            <h1>Download</h1>
            <h1>Oya! app</h1>
          </span>
          <div className={`flex flex-col ${!open && 'w-16 mt-8'}`}>
            <a
              href="https://play.google.com/store/apps/details?id=com.oyaghana.oyaapp_porter"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/assets/img/dashboardIcons/google.png"
                alt="google"
                className="my-2  "
              />
            </a>
            <a
              href="https://apps.apple.com/gh/app/oya/id1623866371"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/assets/img/dashboardIcons/apple.png"
                alt="google"
                className="mb-5"
              />
            </a>
          </div>
        </span>
      </div>

      <div className="flex-1 ">
        <nav
          className={`text-2xl  font-semibold flex items-center justify-between duration-300 mb-12  sticky top-0 md:fixed md:right-0  ${
            open ? 'md:left-60' : 'md:left-32'
          } pt-5 px-10   md:h-14 bg-appBg z-50`}
        >
          <div
            className={`w-52 bg-white  pt-5 fixed top-0  left-0 h-screen z-[999] xl:hidden md:hidden m-0   ${
              openMenu
                ? 'block md:hidden  transition ease-in delay-150'
                : 'hidden'
            }`}
          >
            <AiOutlineClose
              onClick={() => setOpenMenu(!openMenu)}
              className="m-5 text-black  z-[999]  fixed top-0 left-0  rounded-full"
            />

            <ul className="mt-24 mx-8 mb-48">
              {Menus.map((Menu, index) => (
                <Link
                  to={Menu.path}
                  key={index}
                  className={`flex  rounded-md p-2  cursor-pointer transition ease-in-out delay-150 hover:w-auto hover:bg-hoverDashBg hover:text-oya-ghana-green   hover:duration-200  text-gray-500  hover:-translate-y-1  hover:bg-ticketbg  duration-300 font-bold items-center gap-x-4 
              text-sm `}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  {Menu.src}
                  <span className={'origin-left duration-200 '}>
                    {Menu.title}
                  </span>
                </Link>
              ))}
            </ul>
            <span
              className={`mt-14 flex flex-col  rounded-md p-2  cursor-pointer  text-gray-500  font-bold items-center -ml-8
          }`}
            >
              <span className="flex flex-col items-center text-sm -mt-32">
                <h1>Download</h1>
                <h1>Oya! app</h1>
              </span>
              <div className="flex flex-col">
                <a
                  href="https://play.google.com/store/apps/details?id=com.oyaghana.oyaapp_porter"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/assets/img/dashboardIcons/google.png"
                    alt="google"
                    className="my-2  "
                  />
                </a>
                <a
                  href="https://apps.apple.com/gh/app/oya/id1623866371"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/assets/img/dashboardIcons/apple.png"
                    alt="google"
                    className="mb-5"
                  />
                </a>
              </div>
            </span>
          </div>
          <div className="flex justify-center items-center md:hidden">
            <GiHamburgerMenu
              className={`md:hidden mx-3 ${openMenu && 'hidden'}`}
              onClick={() => setOpenMenu(!openMenu)}
            />
            <div
              className={`md:hidden flex justify-center items-center ${
                openMenu && 'hidden'
              }`}
            >
              <img
                src="/assets/img/dashboardIcons/logo.png"
                alt="logo"
                className="w-8 "
              />
              Oya
            </div>
          </div>
          <h1 className="hidden md:block">Dashboard</h1>
          <div className="">
            {authenticated && (
              <Dropdown
                trigger={['click']}
                placement="bottomLeft"
                overlay={
                  <Menu>
                    <Menu.Item>
                      <Link to="/">
                        <i className="fas fa-th muted mr-3" /> Dashboard
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/trips">
                        <i className="fas fa-road muted mr-3" /> Trips
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/hiring">
                        <i className="fas fa-bus muted mr-3" /> Hiring
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/tickets">
                        <i className="fas fa-ticket-alt muted mr-3" /> Tickets
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to="/user">
                        <i className="fas fa-user muted mr-3" /> Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item onClick={logout}>
                      <i className="fas fa-power-off muted mr-3" /> Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <span className="pointer flex flex-row items-center">
                  {/* {logg.name} */}
                  <img
                    src="/assets/img/dashboardIcons/avatar.png"
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <FaAngleDown className="text-gray-400" />
                </span>
              </Dropdown>
            )}
          </div>
        </nav>

        <div className="md:mt-24  ">{children}</div>
      </div>
    </div>
  )
}

DashboardNav.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
export default DashboardNav
