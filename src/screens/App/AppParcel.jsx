/*eslint-disable*/

import React, { useEffect, useState } from 'react'
import { axius } from '../../utils'
import { PageHeader, Tabs } from 'antd'

const { TabPane } = Tabs
const AppParcel = () => {
  const [sent, setSent] = useState([])
  const [received, setReceived] = useState([])
  const [sentLoading, setSentLoading] = useState(false)
  const [receivedLoading, setReceivedLoading] = useState(false)

  useEffect(() => {
    setSentLoading(true)
    setReceivedLoading(true)
    axius.get('account/parcels_sent').then((res) => {
      setSentLoading(false)
      setSent(res.status === 200 ? res.data : [])
    })
    axius.get('account/parcels_received').then((res) => {
      setReceivedLoading(false)
      setReceived(res.status === 200 ? res.data : [])
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <React.Fragment>
      <div id="AppParcel" className="container">
        <PageHeader
          ghost={false}
          title="Track your Parcels"
          onBack={() => history.goBack()}
        />
        <div style={{ background: '#fff', minHeight: 300, marginTop: 10 }}>
          <Tabs type="card" size="large">
            <TabPane tab="Received" key="1">
              <div className="row m-3">
                {received && received.length > 0 && !receivedLoading ? (
                  received.map((parcel) => (
                    <div className="col-lg-3 col-6 mb-4" key={parcel.id}>
                      <div className="card  rounded-0">
                        <div className="card-body">
                          <div className="mb-3 text-center">
                            {parcel?.name} <br />
                            <b>GHS {parcel?.price}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4>No Parcels Received</h4>
                )}
              </div>
            </TabPane>

            <TabPane tab="Sent" key="2">
              <div className="row m-3">
                {sent && sent.length > 0 && !sentLoading ? (
                  sent.map((parcel) => (
                    <div className="col-lg-3 col-6 mb-4" key={parcel.id}>
                      <div className="card  rounded-0">
                        <div className="card-body">
                          <div className="mb-3 text-center">
                            {parcel?.name} <br />
                            <b>GHS {parcel?.price}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4>No Parcels Sent</h4>
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AppParcel
