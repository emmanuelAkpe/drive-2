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
import '../../../index.css'
import { useNavigate } from 'react-router-dom'

const HireNormalBus = (props) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [features, setFeatures] = useState([])
  const [towns, setTowns] = useState([])
  const [congregations, setCongregations] = useState([])
  const [passengerRanges, setPassengerRanges] = useState([])
  const [busTypes, setBusTypes] = useState([])
  const [tripPurposes, setTripPurposes] = useState([])

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setLoading(true)
    axius.get('features').then((res) => {
      setFeatures(res.status === 200 ? res.data : [])
    })
    axius.get('towns').then((res) => {
      setTowns(res.status === 200 ? res.data : [])
    })
    axius.get('congregations').then((res) => {
      setCongregations(res.status === 200 ? res.data : [])
    })
    axius.get('passenger_ranges').then((res) => {
      setPassengerRanges(res.status === 200 ? res.data : [])
    })
    axius.get('bus_types').then((res) => {
      setBusTypes(res.status === 200 ? res.data : [])
    })
    axius.get('trip_purposes').then((res) => {
      setTripPurposes(res.status === 200 ? res.data : [])
    })
  }, [])

  useEffect(() => {
    if (
      features.length > 0 &&
      towns.length > 0 &&
      congregations.length > 0 &&
      passengerRanges.length > 0 &&
      busTypes.length > 0
    ) {
      setLoading(false)
    }
  }, [features, towns, congregations, passengerRanges, busTypes])

  const getDisabledHours = () => {
    const hours = []
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i)
    }
    return hours
  }

  const getDisabledMinutes = (selectedHour) => {
    const minutes = []
    if (selectedHour === moment().hour()) {
      for (let i = 0; i < moment().minute(); i++) {
        minutes.push(i)
      }
    }

    return minutes
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  }
  const submit = (v) => {
    setSubmitting(true)
    const formValues = form.getFieldsValue()

    const data = []
    console.log(formValues)

    data.from_id = formValues.from_id
    data.to_id = formValues.to_id
    data.departure_date = moment(formValues.departure_date).format(
      'MM/DD/YYYY'
    )
    data.departure_time = moment(formValues.departure_time).format('HH:mm')
    data.return_time = moment(formValues.return_time).format('HH:mm')
    data.passenger_range = formValues.passenger_range
    data.bus_type_id = formValues.bus_type_id
    data.number_of_buses = formValues.number_of_buses
    data.trip_purpose = formValues.trip_purpose
    data.contact_person_name = formValues.contact_person_name
    data.contact_person_phone = formValues?.contact_person_phone?.phone
    data.number_of_days = formValues.number_of_days
    data.trip_type = formValues.trip_type
    data.itinerary = formValues.itinerary | []
    data.number_of_internal_trips = formValues.number_of_internal_trips

    data.selected_features = features
      .filter((row) => v.features.includes(row.id))
      .map((row) => {
        return row.id
      })
    axius.post('account/hirings', { ...data }).then((res) => {
      setSubmitting(false)
      if (res.status === 200) {
        notification.success({ message: 'Congrats! You have hired a bus.' })
        navigate('/normal-hire', { replace: true })
      } else {
        notification.error({ ...res })
      }
    })
  }

  return (
    <React.Fragment>
      <div id="AppNormalHire" className="container">
        <PageHeader
          ghost={false}
          title="Hire Bus"
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
                        label="Pickup Location"
                        name="from_id"
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
                          placeholder="Choose your pickup point"
                        >
                          {towns.map((dest) => (
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
                        label="Destination"
                        name="to_id"
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
                          {towns.map((dest) => (
                            <Select.Option key={dest.id} value={dest.id}>
                              {dest.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 col-12">
                      <Form.Item
                        colon={false}
                        label="Departure Date"
                        name="departure_date"
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
                          disabledDate={disabledDate}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 col-12">
                      <Form.Item
                        colon={false}
                        label="Departure Time"
                        name="departure_time"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <TimePicker
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                          disabledHours={getDisabledHours}
                          disabledMinutes={getDisabledMinutes}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-4 col-12">
                      <Form.Item
                        colon={false}
                        label="Return Time"
                        name="return_time"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <TimePicker
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                          disabledHours={getDisabledHours}
                          disabledMinutes={getDisabledMinutes}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Contact Person Name"
                        name="contact_person_name"
                        initialValues="3149"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <Input
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                          placeholder="Contact Person Name"
                        />
                      </Form.Item>
                    </div>
                    {/* <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Contact Person Phone"
                        name="contact_person_phone"
                        initialValues="3149"
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <CountryPhoneInput
                          placeholder="Contact Person Phone"
                          locale="en"
                          selectProps={{
                            filterArea: (area) =>
                              area.name?.includes("Ghana") || false,
                          }}
                        />
                      </Form.Item>
                    </div> */}
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Number of Passengers"
                        name="passenger_range"
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
                          placeholder="Select Number of Passengers"
                        >
                          {passengerRanges.map((range) => (
                            <Select.Option key={range.id} value={range.id}>
                              {range?.min === 501
                                ? '500+'
                                : `${range?.min} - ${range?.max}`}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Bus Type"
                        name="bus_type_id"
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
                          placeholder="Choose a bus type"
                        >
                          {busTypes.map((range) => (
                            <Select.Option key={range.id} value={range.id}>
                              {range?.name} ({range?.min_capacity} -{' '}
                              {range?.max_capacity})
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Number of Buses"
                        name="number_of_buses"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <InputNumber
                          autoComplete="off"
                          size="large"
                          placeholder="Number of Buses"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Number of Days"
                        name="number_of_days"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                      >
                        <InputNumber
                          autoComplete="off"
                          size="large"
                          placeholder="Number of Days"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Trip Purpose"
                        name="trip_purpose"
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
                          placeholder="Choose your purpose"
                        >
                          {tripPurposes.map((purpose) => (
                            <Select.Option key={purpose.id} value={purpose.id}>
                              {purpose?.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Trip Type"
                        name="trip_type"
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
                          placeholder="Choose the trip type"
                        >
                          <Select.Option key="oneway" value="oneway">
                            One Way Trip
                          </Select.Option>
                          <Select.Option key="oneway" value="roundtrip">
                            Round Trip
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Number of Internal Trips"
                        name="number_of_internal_trips"
                        rules={[
                          { required: true, message: 'This field is required' }
                        ]}
                        initialValue={0}
                      >
                        <InputNumber
                          min={0}
                          autoComplete="off"
                          size="large"
                          placeholder="Number of Internal Trips"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div>

                    {/*

                    <div className="col-lg-6 col-12">
                      <Form.Item
                        colon={false}
                        label="Passengers"
                        name="passengers"
                        initialValues="3149"
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <InputNumber
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div> */}
                    {/* <div className="col-lg-12 col-12">
                      <Form.Item
                        colon={false}
                        label="Purpose"
                        name="purpose"
                        initialValues="3149"
                        rules={[
                          { required: true, message: "This field is required" },
                        ]}
                      >
                        <Input.TextArea
                          rows={4}
                          autoComplete="off"
                          size="large"
                          disabled={submitting}
                        />
                      </Form.Item>
                    </div> */}
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

export default HireNormalBus
