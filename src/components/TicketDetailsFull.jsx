import React from 'react'
import { useSelector } from 'react-redux'
import TicketDetails from './TicketDetails'
import PropTypes from 'prop-types'

const TicketDetailsFull = ({ row }) => {
  const logg = useSelector(state => state.auth.logg)
  const bus = row.bus_schedule || {}

  return (
    <React.Fragment>
      {row.id && (
        <div id='TicketDetailsFull'>
          <div className='text-center mb-3' style={{ fontSize: 16 }}>
            <p>
              {(bus?.station?.bus_company?.name?.indexOf('GPRTU') !== -1 ||
                bus?.station?.bus_company?.logo != null) && (
                  <img
                    alt='station logo'
                    src={
                      bus?.station?.bus_company?.name?.indexOf('GPRTU') !== -1
                        ? 'assets/img/gprtu.jpeg'
                        : bus?.station?.bus_company?.logo != null
                          ? bus?.station?.bus_company?.logo
                          : ''
                    }
                    style={{ height: 50 }}
                  />)}
            </p>
            <div>TICKET</div>
            <div>
              {bus?.station?.bus_company?.name} - {bus?.station?.name}
            </div>
            <div>
              {bus?.route?.from?.name} - {bus?.route?.to?.name}
            </div>
            <b>GHS {bus?.price}</b>
          </div>

          <div
            className='mb-3 p-4'
            style={{ background: '#f8f7f7', borderRadius: 10 }}
          >
            <h4 className='mb-2'>Trip Details</h4>

            <TicketDetails row={row} />

            <div className='mt-2'>
              <h4>Passenger Details</h4>
              <div className='row'>
                <div className='col-6'>
                  <div className='mt-3'>
                    <div className='row'>
                      <div className='col-1'>
                        <i className='fa fa-users primary muted' />
                      </div>
                      <div className='col-10'>
                        <div className='muted'>Passenger Details</div>
                        <div>{logg?.name}</div>
                        <div>{logg?.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='mt-3'>
                    <div className='row'>
                      <div className='col-1'>
                        <i className='fa fa-phone primary muted' />
                      </div>
                      <div className='col-10'>
                        <div className='muted'>Emergency Contact</div>
                        <div>{logg?.ice_primary_phone || '-'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <div className='mb-2'>
              Powered by <span className='primary'>Oya!</span>
            </div>
            <div className='mb-3'>Download Android App below</div>
            <a
              href='https://play.google.com/store/apps/details?id=com.oyaghana.oyaapp_porter&hl=en'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='mr-3'
                src={'assets/img/web/play-store.svg'}
                alt='Download on Play store - Oya Ghana'
                style={{ maxHeight: 30 }}
              />
            </a>
          </div>
        </div>
      )}

      {/* <h4>Ticket No.: {row.ticket_no}</h4>
            <div className="muted">Bus: {bus.station.bus_company.name} ({bus.bus.reg_number})</div>
            <div className="muted">Route: {bus.route.from.name} - {bus.route.to.name}</div>
            <div className="muted">Station: {bus.station.name}</div>
            <div className="muted">Departure: {moment(bus.departure_date).format('LL')} at {bus.departure_time}</div>
            <b className="primary">GHS {bus.price}</b>
            <div className="muted">Payment status: {(row.pmt_status || '')}</div> */}
    </React.Fragment>
  )
}
TicketDetailsFull.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number,
    ticket_no: PropTypes.string,
    bus_schedule: PropTypes.object
  })
}
export default TicketDetailsFull
