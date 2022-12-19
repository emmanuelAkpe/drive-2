import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'

const NormalHireCard = ({
  price,
  departureDate,
  departureTime,
  returnDate,
  returnTime,
  referenceCode = '',
  townFrom = '',
  townTo = ''
}) => {
  return (
    <Link to={`/hire?ref=${referenceCode}`}>
      <Card
        title={`${townFrom} ${townTo ? '-' : ''} ${townTo}`}
        extra={`GH${price}`}
      >
        <div className="mb-3">
          <i className="fa fa-calendar primary muted" /> &nbsp; Departure Date:
          <br />
          <span className="muted">
            {departureDate ? moment(departureDate).format('MMM DD, YYYY') : ''},{' '}
            {departureTime}
          </span>
        </div>
        <div className="mb-3">
          <i className="fa fa-calendar primary muted" /> &nbsp; Return Date:
          <br />
          <span className="muted">
            {returnDate ? moment(returnDate).format('MMM DD, YYYY') : ''},{' '}
            {returnTime}
          </span>
        </div>
      </Card>
    </Link>
  )
}

NormalHireCard.propTypes = {
  townFrom: PropTypes.string.isRequired,
  townTo: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  departureDate: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  returnDate: PropTypes.string.isRequired,
  returnTime: PropTypes.string.isRequired,
  referenceCode: PropTypes.string.isRequired
}

export default NormalHireCard
