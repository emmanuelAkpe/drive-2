import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {
  Button,
  Form,
  Input,
  Select,
  notification,
  TimePicker,
  DatePicker,
  InputNumber,
  Spin,
  Checkbox,
  PageHeader
} from 'antd'
import { axius, func } from '../../../utils'
import { useNavigate } from 'react-router-dom'

const HireSpecialBus = (props) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [features, setFeatures] = useState([])
  const [destinations, setDestinations] = useState([])
  const [congregations, setCongregations] = useState([])

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLoading(true)
    axius.get('features').then((res) => {
      setFeatures(res.status === 200 ? res.data : [])
    })
    axius.get('special_destinations').then((res) => {
      setDestinations(res.status === 200 ? res.data : [])
    })
    axius.get('congregations').then((res) => {
      setCongregations(res.status === 200 ? res.data : [])
    })
  }, [])

  useEffect(() => {
    if (
      features.length > 0 &&
      destinations.length > 0 &&
      congregations.length > 0
    ) {
      setLoading(false)
    }
  }, [features, destinations, congregations])

  const submit = (v) => {
    setSubmitting(true)
    v.pickup_date = moment(v.pickup_date).format('MM/DD/YYYY')
    v.pickup_time = moment(v.pickup_time).format('HH:mm')
    v.return_time = moment(v.return_time).format('HH:mm')
    v.selected_features = features
      .filter((row) => v.features.includes(row.id))
      .map((row) => {
        return row.id
      })
    axius.post('account/special_hirings', { ...v }).then((res) => {
      setSubmitting(false)
      if (res.status === 200) {
        notification.success({ message: 'Congrats! You have hired a bus.' })
        navigate('/special-hire')
      } else {
        notification.error({ ...res })
      }
    })
  }

  return (
    <React.Fragment>
      <div id="AppSpecialHire" className="container">
        <PageHeader
          ghost={false}
          title="Hire Special Bus"
          onBack={() => navigate(-1)}
        />

        <div className="row mt-3">
          <div className="col-lg-8 col-12">
            <div className="bg-light p-4">
              <Spin spinning={loading} indicator={func.fspinnerSm}>
                <Form form={form} layout="vertical" onFinish={submit}>
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Congregation"
                        name="congregation_id"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <Select
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                          showSearch
                          filterOption={true}
                          optionFilterProp="children"
                          placeholder="Choose your congregation"
                        >
                          {congregations.map((cong) => (
                            <Select.Option key={cong.id} value={cong.id}>
                              {cong.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Destination"
                        name="special_destination_id"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <Select
                          autoComplete="off"
                          size="large"
                          showSearch
                          filterOption={true}
                          optionFilterProp="children"
                          disabled={submitting}
                          placeholder="Choose your destination"
                        >
                          {destinations.map((dest) => (
                            <Select.Option key={dest.id} value={dest.id}>
                              {dest.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Secondary Name"
                        name="secondary_name"
                        initialValues="3149"
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
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Secondary Phone Number"
                        name="secondary_phone"
                        initialValues="3149"
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
                    </div>
                    <div className="col-lg-4 col-12">
                      <Form.Item
                        colon={false}
                        label="Pickup Date"
                        name="pickup_date"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <DatePicker
                          autoComplete="off"
                          size="large"
                          format="LL"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 col-12">
                      <Form.Item
                        colon={false}
                        label="Pickup Time"
                        name="pickup_time"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <TimePicker
                          autoComplete="off"
                          size="large"
                          format="HH:mm"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 col-12">
                      <Form.Item
                        colon={false}
                        label="Pickup Time"
                        name="return_time"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <TimePicker
                          autoComplete="off"
                          size="large"
                          format="HH:mm"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Number of days"
                        name="number_of_days"
                        initialValues="3149"
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
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Passengers"
                        name="passengers"
                        initialValues="3149"
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
                    <div className="col-lg-12 col-12">
                      <Form.Item
                        colon={false}
                        label="Purpose"
                        name="purpose"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <Input.TextArea
                          rows={4}
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-12 col-12">
                      <Form.Item
                        colon={false}
                        label="Features"
                        name="features"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <Checkbox.Group
                          style={{ width: '100%' }}
                          disabled={submitting}
                        >
                          <div className="row">
                            {features.map((feat, index) => (
                              <div className="col-4" key={index}>
                                <Checkbox key={feat.id} value={feat.id}>
                                  {feat.name}
                                </Checkbox>
                              </div>
                            ))}
                          </div>
                        </Checkbox.Group>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="text-right">
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      loading={submitting}
                    >
                      &nbsp; &nbsp; &nbsp; Submit &nbsp; &nbsp; &nbsp;{' '}
                    </Button>
                  </div>
                </Form>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default HireSpecialBus
