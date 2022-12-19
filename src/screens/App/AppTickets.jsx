/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { PageHeader, Spin } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { parse } from 'querystring'
import { axius } from '../../utils'
import { func } from 'prop-types'
import moment from 'moment'

const AppTickets = () => {
  const parsedQueryString = parse(location && location.search.replace('?', ''))
  const [ticketRef, setTicketRef] = useState('')
  const [loading, setLoading] = useState('')
  const [ticket, setTicket] = useState({})
  const bus = ticket && ticket.bus_schedule

  const navigate = useNavigate()

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
  const cards = [
    {
      name: 'My Tickets',
      route: 'my-tickets',
      icon: 'fa fa-ticket-alt round-icon'
    },
    { name: 'Buy a Ticket', route: 'buy-ticket', icon: 'fa fa-tag round-icon' }
  ]

  return (
    <React.Fragment>
      <div id="AppTickets" className="container">
        <PageHeader ghost={false} title="Tickets" onBack={() => navigate(-1)} />
        <div className="mt-3">
          {ticketRef ? (
            <Spin spinning={loading} indicator={func.fspinnerSm}>
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
                        <div>{ticket.ticket_no || '-'}</div>
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
                          {bus?.conductor?.name || '-'} <br />{' '}
                          {bus?.conductor?.phone || '-'}
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
                          {moment(bus?.departure_date).format('MMM DD, YYYY')},{' '}
                          {bus?.departure_time}
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
                        <div>{(ticket.seat || {}).number || '-'}</div>
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
                        <div>{bus?.station.phone || '-'}</div>
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
            </Spin>
          ) : (
            <div className="row">
              {cards.map((card, index) => (
                <div className="col-lg-3 col-6 mb-4" key={index}>
                  <div className="card pointer hover-scale">
                    <Link
                      className="card-body text-center pt-5 pb-5"
                      to={`/${card.route}`}
                    >
                      <i className={`${card.icon} primary`} />
                      <div className="dark mt-3">
                        <h4>{card.name}</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AppTickets
