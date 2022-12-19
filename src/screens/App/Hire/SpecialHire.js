import React, { useEffect, useState } from 'react'
import { PageHeader, Spin, Button } from 'antd'
import { axius, func } from '../../../utils'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const SpecialHire = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axius.get('account/special_hirings').then((res) => {
      setLoading(false)
      setData(res.status === 200 ? res.data : [])
    })
  }, [])
  return (
    <React.Fragment>
      <div id="SpecialHire" className="container">
        <PageHeader
          ghost={false}
          title="Special Hires"
          onBack={() => navigate(-1)}
          extra={[
            <Button
              key="hire-special-bus"
              onClick={() => navigate('/hire-special-bus')}
            >
              Hire a Bus
            </Button>
          ]}
        />
        <div className="row mt-5">
          <Spin spinning={loading} indicator={func.fspinnerSm}></Spin>
          {data.map((hire) => (
            <div className="col-lg-3 col-6 mb-4" key={hire.id}>
              <div className="card  rounded-0">
                <div className="card-body">
                  <div className="mb-3 text-center">
                    {hire?.special_destination?.name} <br />
                    <b>GHS {hire.price}</b>
                  </div>
                  <div className="mb-3">
                    <i className="fa fa-calendar primary muted" /> &nbsp; Trip
                    Date:{' '}
                    <span className="muted">
                      {moment(hire.departure_date).format('MMM DD, YYYY')},{' '}
                      {hire.departure_time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default SpecialHire
