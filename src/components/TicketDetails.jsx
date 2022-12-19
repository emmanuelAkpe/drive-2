import React from 'react'
import moment from 'moment'

const TicketDetails = (row) => {
  const bus = row.bus_schedule || {}
  const conductor = bus.conductor
    ? bus.conductor.user
    : (bus.staffs || []).find((sta) => sta.role.toLowerCase() === 'conductor') || {}

  return (
    <React.Fragment>
      {row.id && (
        <div id="TicketDetails" className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <div className="row">
                <div className="col-1">
                  <i className="fa fa-bus primary muted" />
                </div>
                <div className="col-10">
                  <div className="muted">Vehicle Number</div>
                  <div>{(bus.bus && bus.bus.reg_number) || '-'}</div>
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
                  <div>{row.ticket_no || '-'}</div>
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
                  <div>{(bus.station && bus.station.code) || '-'}</div>
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
                    {conductor.name || '-'} <br /> {conductor.phone || '-'}
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
                    {moment(bus.departure_date).format('MMM DD, YYYY')},{' '}
                    {bus.departure_time}
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
                  <div>{(row.seat || {}).number || '-'}</div>
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
                  <div>{(bus.station && bus.station.phone) || '-'}</div>
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
                  <div>
                    {(bus.bus &&
                      bus.bus.driver &&
                      bus.bus.driver.user &&
                      bus.bus.driver.user.name) ||
                      '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default TicketDetails
