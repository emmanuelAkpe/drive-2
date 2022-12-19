import React, { useEffect, useState } from 'react'
import { PageHeader, Button, Spin } from 'antd'
import { axius, func } from '../../../utils'
import NormalHireCard from '../../../components/NormalHireCard'
import { useNavigate } from 'react-router-dom'

const NormalHire = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axius.get('account/hirings').then((res) => {
      setLoading(false)
      setData(res.status === 200 ? res.data : [])
    })
  }, [])
  return (
    <React.Fragment>
      <div id="NormalHire" className="container">
        <PageHeader
          ghost={false}
          title="Normal Hires"
          onBack={() => navigate(-1)}
          extra={[
            <Button
              key="hire-bus"
              onClick={() => navigate('/hire-bus')}
            >
              Hire a Bus
            </Button>
          ]}
        />
        <div className="row mt-5">
          <Spin spinning={loading} indicator={func.fspinnerSm}></Spin>

          {data.map((hire) => (
            <div className="col-lg-3 col-6 mb-4" key={hire.id}>
              <NormalHireCard
                referenceCode={hire?.reference_code}
                townFrom={hire?.from?.name}
                townTo={hire?.to?.name}
                price={hire?.price}
                departureDate={hire?.departure_date}
                departureTime={hire?.departure_time}
                returnDate={hire?.return_date}
                returnTime={hire?.return_time}
              />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default NormalHire
