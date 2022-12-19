import React from 'react'
import PropTypes from 'prop-types'
import { func } from '../utils'

const Loading = ({ text }) => {
  return (
    <React.Fragment>
      <div className="flex-middle" style={{ height: '70vh', justifyContent: 'center' }}>
        <div className="text-center">
          {func.fspinnerSm}
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </React.Fragment>
  )
}
Loading.propTypes = {
  text: PropTypes.string
}

export default Loading
