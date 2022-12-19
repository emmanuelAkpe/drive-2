import React, { useState } from 'react'
import moment from 'moment'
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  PageHeader
} from 'antd'
import { axius } from '../../utils'
import { useNavigate } from 'react-router'

const AppEnrollBus = (props) => {
  const [form] = Form.useForm()

  const [step, setStep] = useState(1)
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const submit = (v) => {
    setSubmitting(true)
    if (step === 1) {
      axius.post('find_trip', v).then((res) => {
        setSubmitting(false)
        if (res.status === 200) {
          setData(res.data)
          setStep(2)
        } else {
          notification.error({ ...res })
        }
      })
    } else {
      axius
        .post('enroll_self', { ...v, bus_schedule_id: data.bus.id })
        .then((res) => {
          setSubmitting(false)
          if (res.status === 200) {
            notification.success({
              message: 'You have enrolled for this trip'
            })
            navigate('/')
          } else {
            notification.error({ ...res })
          }
        })
    }
  }

  return (
    <React.Fragment>
      <div id="AppEnrollBus" className="container">
        <PageHeader
          title="Enroll on a Bus"
          onBack={() => navigate(-1)}
        />

        <div className="row mt-3">
          <div className="col-lg-6 col-12">
            <div className="bg-light p-4">
              <Form form={form} layout="vertical" onFinish={submit}>
                {step === 1 && (
                  <div>
                    <Form.Item
                      colon={false}
                      label="Please enter your trip code"
                      name="code"
                      initialValues="3149"
                      rules={[
                        { required: true, message: 'This field is required' }
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        size="large"
                        autoFocus
                        disabled={submitting}
                      />
                    </Form.Item>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <div className="card mb-4">
                      <div className="card-body">
                        <h4>Trip details</h4>
                        <div className="muted">
                          Bus: {data.station.bus_company.name} (
                          {data.bus.reg_number})
                        </div>
                        <div className="muted">
                          Route: {data.route.from.name} - {data.route.to.name}
                        </div>
                        <div className="muted">
                          Station: {data.station.name}
                        </div>
                        <div className="muted">
                          Departure: {moment(data.departure_date).format('LL')}{' '}
                          at {data.departure_time}
                        </div>
                      </div>
                    </div>

                    <Form.Item
                      colon={false}
                      label="Please enter your ticket number"
                      name="ticket_no"
                      initialValues="601d7554af4c"
                      rules={[
                        { required: true, message: 'This field is required' }
                      ]}
                    >
                      <Input
                        autoComplete="off"
                        size="large"
                        disabled={submitting}
                      />
                    </Form.Item>
                    <Form.Item
                      colon={false}
                      label="Number of Minors"
                      name="minors"
                      initialValue={0}
                      rules={[
                        { required: true, message: 'This field is required' }
                      ]}
                    >
                      <InputNumber
                        autoComplete="off"
                        size="large"
                        disabled={submitting}
                      />
                    </Form.Item>
                  </div>
                )}

                <div className="text-right">
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                  >
                    &nbsp; &nbsp; &nbsp; {step === 1 ? 'Find trip' : 'Enroll'}{' '}
                    &nbsp; &nbsp; &nbsp;{' '}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AppEnrollBus
