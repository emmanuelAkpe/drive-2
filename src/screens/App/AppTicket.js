import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { parse } from 'querystring'

import { axius } from '../../utils'
import PropTypes, { func } from 'prop-types'

import moment from 'moment'

const AppTicket = ({ location, _auth }) => {
  const parsedQueryString = parse(location && location.search.replace('?', ''))
  const [, setTicketRef] = useState('')
  const [loading, setLoading] = useState('')
  const [ticket, setTicket] = useState({})

  const bus = ticket?.bus_schedule || {}
  const conductor = bus.conductor
    ? bus.conductor.user
    : (bus.staffs || []).find(
        (sta) => sta.role.toLowerCase() === 'conductor'
      ) || {}

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

  return (
    <React.Fragment>
      <div
        id="AppTickets"
        className="col-sm-12 col-md-6 col-lg-4"
        style={{ margin: '0 auto' }}
      >
        <Spin spinning={loading} indicator={func.fspinnerSm}>
          <div id="TicketDetailsFull">
            <div className="text-center" style={{ fontSize: 16 }}>
              <p>
                {(bus?.station?.bus_company?.name?.indexOf('GPRTU') !== -1 ||
                  bus?.station?.bus_company?.logo != null) && (
                  <img
                    src={
                      bus?.station?.bus_company?.name?.indexOf('GPRTU') !== -1
                        ? 'assets/img/gprtu.jpeg'
                        : bus?.station?.bus_company?.logo != null
                          ? bus?.station?.bus_company?.logo
                          : ''
                    }
                    alt={`${bus?.station?.bus_company?.name}`}
                    style={{ height: 50 }}
                  />
                )}
              </p>
              <div>TICKET</div>
              <div>{bus?.station?.name}</div>
              <div>
                {bus?.route?.from?.name} - {bus?.route?.to?.name}
              </div>
              <b>GHS {bus?.price}</b>
            </div>

            <div className="mb-3 p-4" style={{ background: '#f8f7f7' }}>
              <h4 className="mb-2">Trip Details</h4>

              <div id="TicketDetails" className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-bus primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Vehicle Number</div>
                        <div>{bus?.bus?.reg_number || '-'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-tag primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Ticket Number</div>
                        <div>{ticket?.ticket_no || '-'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-copy primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Station Code</div>
                        <div>{bus?.station?.code || '-'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-users primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Conductor</div>
                        <div>
                          {conductor?.name || '-'} <br />{' '}
                          {conductor?.phone || '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-calendar primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Trip Date</div>
                        <div>
                          {bus?.departure_date &&
                            moment(bus?.departure_date).format('MMM DD, YYYY')}
                          , {bus?.departure_time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-chair primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Seat Number</div>
                        <div>{(ticket?.seat || {}).number || '-'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-phone primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Station contact</div>
                        <div>{bus?.station?.phone || '-'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-1">
                        <i className="fa fa-user primary muted" />
                      </div>
                      <div className="col-10">
                        <div className="muted">Driver</div>
                        <div>{bus?.bus?.driver?.user?.name || '-'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <h4>Passenger Details</h4>
                <div className="row">
                  <div className="col-6">
                    <div className="mt-3">
                      <div className="row">
                        <div className="col-1">
                          <i className="fa fa-users primary muted" />
                        </div>
                        <div className="col-10">
                          <div className="muted">Passenger Details</div>
                          <div>{ticket?.user?.name}</div>
                          <div>{ticket?.user?.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mt-3">
                      <div className="row">
                        <div className="col-1">
                          <i className="fa fa-phone primary muted" />
                        </div>
                        <div className="col-10">
                          <div className="muted">Emergency Contact</div>
                          <div>{ticket?.user?.ice1_phone || '-'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="mb-2">
                Powered by <span className="primary">Oya!</span>
              </div>
              <div className="mb-3">Download Android App below</div>
              <a
                href="https://play.google.com/store/apps/details?id=com.oyaghana.oyaapp_porter&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="mr-3"
                  src={'assets/img/web/play-store.svg'}
                  alt="Download on Play store - Oya Ghana"
                  style={{ maxHeight: 30 }}
                />
              </a>
            </div>
          </div>
        </Spin>
      </div>
    </React.Fragment>
  )
}

AppTicket.propTypes = {
  location: PropTypes.any,
  _auth: PropTypes.any
}

export default AppTicket
