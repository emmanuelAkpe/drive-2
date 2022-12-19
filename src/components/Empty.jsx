import { Button } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

const Empty = ({ btnText, btnAction, style, text, icon }) => {
  return (
    <React.Fragment>
      <div
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          ...style
        }}
        className="flex-middle "
      >
        {icon}
        <div className="text-center pd-50">
          <div dangerouslySetInnerHTML={{ __html: text }} />

          {btnText && btnAction && (
            <div>
              <p>&nbsp;</p>
              <Button type="primary" size="large" onClick={() => btnAction()}>
                <span dangerouslySetInnerHTML={{ __html: btnText }} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}
Empty.propTypes = {
  btnText: PropTypes.string,
  btnAction: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string,
  icon: PropTypes.string
}
export default Empty
