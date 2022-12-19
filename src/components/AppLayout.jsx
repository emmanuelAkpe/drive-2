import React from 'react'
import { Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { func } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import * as authAct from '../store/auth/_authActions'
import PropTypes from 'prop-types'

const AppLayout = ({ id, children }) => {
  const authenticated = useSelector(state => state.auth.authenticated)
  const logg = useSelector(state => state.auth.logg)
  const dispatch = useDispatch()

  const logout = () => {
    func.alert({
      title: 'Ready to Leave?',
      content:
        'Select Logout below if you are ready to end your current session.',
      okText: 'Logout',
      cancelText: 'Cancel',
      cancelButtonProps: { className: 'show' },
      onOk: () => {
        dispatch(authAct.signOutSuccess())
      }
    })
  }

  return (
    <React.Fragment>
      <div id='page-top' className='WebLayout'>
        <nav
          className='navbar navbar-expand-lg navbar-light bg-light fixed-top  '
          id='mainNav'
        >
          <div className='container '>
            <a className='navbar-brand js-scroll-trigger' href='/'>
              <img
                src='assets/img/icon.png'
                alt='Oya Ghana'
                height='30px'
                className='h-[30px]'
              />
            </a>

            {authenticated && (
              <div className='flex flex-row items-center'>

                <Link
                  className='mr-4 primary pointer'
                  style={{ fontWeight: 'bold' }}
                  to='/buy-ticket'
                >
                  <span className='flex flex-row items-center'>
                    <i className='fas fa-ticket-alt muted mr-3' />
                    Buy a Ticket
                  </span>
                </Link>
                <Link
                  className='mr-4 primary pointer'
                  style={{ fontWeight: 'bold' }}
                  to='/hire-bus'
                >
                  <span className='flex flex-row items-center'>
                    <i className='fas fa-bus muted mr-3' />
                    Hire a Bus
                  </span>
                </Link>
                <Link
                  className='mr-4 primary pointer'
                  style={{ fontWeight: 'bold' }}
                  to='/enroll-bus'
                >
                  <span className='flex flex-row items-center'>
                    <i className='fas fa-registered muted mr-3' />
                    Enroll on a Bus
                  </span>
                </Link>
                <Dropdown
                  trigger={['click']}
                  placement='bottomLeft'
                  overlay={
                    <Menu>
                      <Menu.Item>
                        <Link to='/'>
                          <i className='fas fa-th muted mr-3' /> Dashboard
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link to='/trips'>
                          <i className='fas fa-road muted mr-3' /> Trips
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link to='/hiring'>
                          <i className='fas fa-bus muted mr-3' /> Hiring
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link to='/tickets'>
                          <i className='fas fa-ticket-alt muted mr-3' /> Tickets
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link to='/user'>
                          <i className='fas fa-user muted mr-3' /> Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item onClick={logout}>
                        <i className='fas fa-power-off muted mr-3' /> Logout
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <span className='pointer flex flex-row items-center'>
                    {logg.name}
                    {(logg.staffs.length > 0 || logg.role_id === 1) && (
                      <img
                        src='assets/img/web/admin.svg'
                        alt='Admin'
                        className='ml-2'
                      />
                    )}
                    {logg.staffs.length === 0 && (
                      <i className='fa fa-chevron-down ml-2 primary' />
                    )}
                  </span>
                </Dropdown>
              </div>
            )}
          </div>
        </nav>

        <div id={id} style={{ paddingTop: 140, paddingBottom: 140 }}>
          {children}
        </div>
      </div>
    </React.Fragment>
  )
}

AppLayout.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default AppLayout
