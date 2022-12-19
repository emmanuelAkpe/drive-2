/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  notification,
  PageHeader,
  Radio,
  Select,
  Checkbox,
  Input,
  Space
} from 'antd'
import moment from 'moment'
import { axius } from '../../utils'
import { PayModal } from '../../components'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

import { useNavigate } from 'react-router'

const required = {
  0: ['target_person'],
  1: ['from', 'to', 'departure'],
  2: ['bus_schedule_id', 'pickup', 'midway'],
  3: [
    'target_person',
    'from',
    'to',
    'departure',
    'bus_schedule_id',
    'pickup',
    'midway',
    'minor_count'
  ],
  4: [
    'target_person',
    'from',
    'to',
    'departure',
    'bus_schedule_id',
    'pickup',
    'midway',
    'minor_count'
  ]
}

const steps = [
  {
    step: 0,
    title: 'Target User',
    description: 'Choose whom you are buying for.'
  },
  {
    step: 1,
    title: 'Journey Details',
    description: 'Provide details of your trip here.'
  },
  {
    step: 2,
    title: 'Bus Selection',
    description: 'Select bus.'
  },
  {
    step: 3,
    title: 'Seat Selection',
    description: 'Select seats.'
  },
  {
    step: 4,
    title: 'Summary',
    description:
      'Review all entries concerning this ticket purchase. Confirm all details and submit to complete the process'
  }
]

const AppBuyTicket = (props) => {
  const navigate = useNavigate

  const [form] = Form.useForm()
  const [step, setStep] = useState(0)

  const [pay, setPay] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const [buses, setBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState({})
  const [summary, setSummary] = useState({})
  const [pickup, setPickup] = useState(0)
  const [pickups, setPickups] = useState([])
  const [loadingPickups, setLoadingPickups] = useState(true)
  const [loadingSeats, setLoadingSeats] = useState(false)
  const [busId, setBusId] = useState(null)
  const [busSeats, setBusSeats] = useState([])
  const [extraSeats, setExtraSeats] = useState(0)

  const [origins, setOrigins] = useState([])
  const [loadingOrigins, setLoadingOrigins] = useState(true)

  const [destinations, setDestinations] = useState([])
  const [loadingDesinations, setLoadingDestinations] = useState(true)
  console.log(pickup)
  useEffect(() => {
    // :: get origins
    setLoadingOrigins(true)
    axius.get('routes/towns/from').then((res) => {
      setOrigins(res.status === 200 ? res.data : [])
      setLoadingOrigins(false)
    })
  }, [])

  const getSeats = (s) => {
    setLoadingSeats(true)
    setStep(s)
    axius.get(`schedules/${busId}/bus_seats`).then((res) => {
      setBusSeats(res.status === 200 ? res.data : [])
      setLoadingSeats(false)
    })
  }

  useEffect(() => {
    if (step === 4) {
      const formValues = form.getFieldsValue()

      const seats = formValues.seats
      const numberOfSeats = seats?.length || 0
      const s = formValues.seat_id ? 1 : numberOfSeats
      const bus = buses.find(
        (bu) => bu.id === form.getFieldValue('bus_schedule_id')
      )
      setSelectedBus(bus || {})
      const sum = {
        'Travel Date': `${moment(bus.departure_date).format('LL')} at ${
          bus.departure_time
        }`,
        Route: `${bus.route.from.name} - ${bus.route.to.name}`,
        'Pickup Point':
          form.getFieldValue('pickup') === 0
            ? bus.station.name
            : pickups.find((pic) => pic.id === form.getFieldValue('midway'))
                .name,
        'Transport Company': bus.station.bus_company.name,
        Station: bus.station.name,
        // "Seat Number": bus.station.name,
        'Ticket Price': `GHS ${bus.price * s}`
      }
      if (bus?.station?.insurance_policy?.price) {
        sum[
          'Insurance Price'
        ] = `GHS ${bus?.station?.insurance_policy?.price} per user`
      }
      console.log(bus)
      setSummary(sum)
    }
  }, [step])

  const getDestinations = (e) => {
    setLoadingDestinations(true)
    axius.get(`routes/towns/${e}/to`).then((res) => {
      setDestinations(res.status === 200 ? res.data : [])
      setLoadingDestinations(false)
    })
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  }

  const getBuses = (v, s) => {
    setSubmitting(true)

    v.departure = moment(v.departure).format('MM/DD/YYYY')
    axius.post('tickets/buses', v).then((res) => {
      setSubmitting(false)
      if (res.status === 200 && res.data.length > 0) {
        setStep(s)
        setBuses(res.data)
      } else {
        notification.error({
          message: 'There are no buses available for this route'
        })
      }
    })
  }

  const getPickups = (e) => {
    setBusId(e.target.value)
    setLoadingPickups(true)
    axius.get(`schedules/${e.target.value}/pickups`).then((res) => {
      setLoadingPickups(false)
      setPickups(res.status === 200 ? res.data : [])
    })
  }

  const nextStep = (s) => {
    if (s > step) {
      form.validateFields(required[step]).then((v) => {
        switch (s) {
          case 2:
            getBuses(v, s)
            break
          case 3:
            getSeats(s)
            break
          case 5:
            submit()
            break
          default:
            setStep(s)
            break
        }
      })
    } else {
      setStep(s)
    }
  }
  const submit = () => {
    const formValues = form.getFieldsValue()
    setSubmitting(true)

    const data = []
    data.bus_schedule_id = formValues.bus_schedule_id
    data.from = formValues.from
    data.to = formValues.to
    data.minor_count = formValues.minor_count

    if (formValues.midway) {
      data.pickup_id = formValues.midway
    }
    if (selectedBus?.station?.insurance_policy?.id) {
      data.insurance_policy_id = selectedBus?.station?.insurance_policy?.price
    }

    if (formValues.target_person === 'others') {
      const seats = formValues.seats
      if (seats && seats.length > 0) {
        data.seats = seats.map((seat, index) => {
          return {
            ...seat,
            parent: index === 0 ? 1 : 0,
            pay: 1
          }
        })
      } else {
        data.seats = []
      }
    } else {
      if (formValues.extra_seats === 1) {
        data.extra_seats = formValues.extra_seats
        const seats = formValues.seats
        if (seats && seats.length > 0) {
          data.seats = seats.map((seat) => {
            return {
              seat_id: seat
            }
          })

          data.seats[0].parent = 1
        } else {
          data.seats = []
        }
      } else {
        data.seat_id = formValues.seat_id
      }
    }

    axius.post('tickets', { ...data }).then((res) => {
      if (res.status === 200) {
        setSubmitting(false)

        setPay({
          title: 'Pay for ticket',
          amount: res.data.price,
          reference: res.data.ticket_no
        })
      } else {
        setSubmitting(false)
        notification.error({ ...res })
      }
    })
  }

  return (
    <React.Fragment>
      <div id="AppBuyTicket">
        <div className="container">
          <PageHeader
            ghost={false}
            title="Buy Ticket"
            onBack={() => navigate()}
          />

          <div className="row mt-3">
            <div className="col-lg-4">
              <div className="steps">
                {steps.map((s) => (
                  <div
                    key={s.step}
                    className={`step p-3 mb-2 ${
                      s.step === step ? 'active' : ''
                    }`}
                    onClick={() => nextStep(s.step)}
                  >
                    <h4 className="primary">{s.title}</h4>
                    <div className="muted">{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="bg-light p-4">
                <Form form={form} layout="vertical">
                  {/* ::: step 0 */}
                  <div className={`${step !== 0 ? 'hide' : ''}`}>
                    <h3 className="section-title">Whom are you buying for?</h3>
                    <div>
                      <Form.Item
                        colon={false}
                        label={null}
                        name="target_person"
                        rules={[
                          {
                            required: true,
                            message: 'This field is required'
                          }
                        ]}
                      >
                        <Radio.Group autoComplete="off" size="large">
                          <Radio className="bus" value="self">
                            <h4>Buy for Self</h4>
                          </Radio>
                          <Radio className="bus" value="others">
                            <h4>Buy for Others</h4>
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                  {/* ::: step 1 */}
                  <div className={`${step !== 1 ? 'hide' : ''}`}>
                    <h3 className="section-title">Journey Details</h3>
                    <div className="row mb-4">
                      <div className="col-lg-6 col-12">
                        <Form.Item
                          colon={false}
                          label="What town are you travelling from?"
                          name="from"
                          rules={[
                            {
                              required: true,
                              message: 'This field is required'
                            }
                          ]}
                        >
                          <Select
                            autoComplete="off"
                            size="large"
                            placeholder="Choose your town of origin"
                            disabled={loadingOrigins || submitting}
                            loading={loadingOrigins}
                            showSearch
                            filterOption={true}
                            optionFilterProp="children"
                            onChange={(e) => getDestinations(e)}
                          >
                            {origins.map((town) => (
                              <Select.Option key={town.id} value={town.id}>
                                {town.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-lg-6 col-12">
                        <Form.Item
                          colon={false}
                          label="What town are you travelling to?"
                          name="to"
                          rules={[
                            {
                              required: true,
                              message: 'This field is required'
                            }
                          ]}
                        >
                          <Select
                            autoComplete="off"
                            size="large"
                            placeholder="Choose your town of destination"
                            disabled={loadingDesinations || submitting}
                            loading={loadingDesinations}
                            showSearch
                            filterOption={true}
                            optionFilterProp="children"
                          >
                            {destinations.map((town) => (
                              <Select.Option key={town.id} value={town.id}>
                                {town.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-lg-6 col-12">
                        <Form.Item
                          colon={false}
                          label="Travel Date"
                          name="departure"
                          rules={[
                            {
                              required: true,
                              message: 'This field is required'
                            }
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
                      <div className="col-lg-6 col-12">
                        <Form.Item
                          colon={false}
                          label="Number of Minors"
                          name="minor_count"
                          initialValue={0}
                        >
                          <InputNumber
                            autoComplete="off"
                            size="large"
                            disabled={submitting}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>

                  {/* ::: step 2 */}
                  <div className={`${step !== 2 ? 'hide' : ''}`}>
                    <h3 className="section-title">
                      Select a Bus and Pickup point
                    </h3>
                    <div className="row">
                      <div className="col-lg-12">
                        <Form.Item
                          colon={false}
                          label={null}
                          name="bus_schedule_id"
                          rules={[
                            {
                              required: true,
                              message: 'This field is required'
                            }
                          ]}
                        >
                          <Radio.Group
                            autoComplete="off"
                            size="large"
                            disabled={submitting}
                            onChange={(e) => getPickups(e)}
                          >
                            <div>
                              {buses.map((bus) => (
                                <div key={bus.id}>
                                  <Radio className="bus" value={bus.id}>
                                    <h4>
                                      Bus: {bus.station.bus_company.name} (
                                      {bus.bus.reg_number})
                                    </h4>
                                    <div className="muted">
                                      Station: {bus.station.name}
                                    </div>
                                    <div className="muted">
                                      Departure: {bus.departure_time}
                                    </div>
                                    <b className="primary">GHS {bus.price}</b>
                                  </Radio>
                                </div>
                              ))}
                            </div>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div className="col-lg-6 col-12">
                        <Form.Item
                          colon={false}
                          label="Where will you join the trip?"
                          name="pickup"
                          rules={[
                            {
                              required: true,
                              message: 'This field is required'
                            }
                          ]}
                        >
                          <Radio.Group
                            autoComplete="off"
                            size="large"
                            placeholder="Choose an option"
                            disabled={submitting}
                            onChange={(e) => setPickup(e.target.value)}
                          >
                            <Radio value={0}>Bus Terminal</Radio>
                            <Radio value={1} disabled={!pickups.length > 0}>
                              Mid Route
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      {pickup === 1 && (
                        <div className="col-lg-6 col-12">
                          <Form.Item
                            colon={false}
                            label="Your pickup point"
                            name="midway"
                            rules={[
                              {
                                required: true,
                                message: 'This field is required'
                              }
                            ]}
                          >
                            <Select
                              autoComplete="off"
                              size="large"
                              placeholder="Choose an option"
                              showSearch
                              filterOption={true}
                              optionFilterProp="children"
                              disabled={loadingPickups || submitting}
                              loading={loadingPickups}
                            >
                              {pickups.map((mid) => (
                                <Select.Option key={mid.id} value={mid.id}>
                                  {mid.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* ::: step 3 */}
                  <div className={`${step !== 3 ? 'hide' : ''}`}>
                    <h3 className="section-title">Seat Selection</h3>
                    <div className="table-responsive">
                      {loadingSeats ? (
                        'Loading Seats'
                      ) : form.getFieldValue('target_person') !== 'others' ? (
                        <>
                          <Form.Item
                            label="Will you buy extra seats"
                            colon={false}
                            name="extra_seats"
                            initialValue={extraSeats}
                            rules={[
                              {
                                required: true,
                                message: 'This field is required'
                              }
                            ]}
                          >
                            <Radio.Group
                              name="extra_seats"
                              onChange={(e) => setExtraSeats(e.target.value)}
                            >
                              <Radio value={1}>Yes</Radio>
                              <Radio value={0}>No</Radio>
                            </Radio.Group>
                          </Form.Item>

                          <Form.Item
                            colon={false}
                            label="Seat Selection"
                            name={
                              form.getFieldValue('extra_seats') === 0
                                ? 'seat_id'
                                : 'seats'
                            }
                            rules={[
                              {
                                required: true,
                                message: 'This field is required'
                              }
                            ]}
                          >
                            {form.getFieldValue('extra_seats') === 1 ? (
                              <Checkbox.Group name="seats">
                                {busSeats &&
                                  busSeats.map((seat) => (
                                    <Checkbox
                                      key={seat.id}
                                      value={seat.id}
                                      className="bus"
                                      disabled={seat.status === 1}
                                    >
                                      Seat {seat.number}
                                    </Checkbox>
                                  ))}
                              </Checkbox.Group>
                            ) : (
                              <Radio.Group name="seat_id">
                                {busSeats &&
                                  busSeats.map((seat) => (
                                    <Radio
                                      key={seat.id}
                                      value={seat.id}
                                      className="bus"
                                      disabled={seat.status === 1}
                                    >
                                      Seat {seat.number}
                                    </Radio>
                                  ))}
                              </Radio.Group>
                            )}
                          </Form.Item>
                        </>
                      ) : (
                        <Form.List name="seats">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map((field) => (
                                <Space
                                  direction="vertical"
                                  key={field.key}
                                  style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                    border: '1px solid',
                                    padding: '1rem'
                                  }}
                                >
                                  <div style={{ textAlign: 'right' }}>
                                    <MinusOutlined
                                      onClick={() => remove(field.name)}
                                    />
                                  </div>
                                  <Form.Item
                                    {...field}
                                    label="Name"
                                    colon={false}
                                    name={[field.name, 'name']}
                                    fieldKey={[field.fieldKey, 'name']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Name is required'
                                      }
                                    ]}
                                  >
                                    <Input size="large" placeholder=" Name" />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label="Phone"
                                    colon={false}
                                    name={[field.name, 'phone']}
                                    fieldKey={[field.fieldKey, 'phone']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Phone number is required'
                                      }
                                    ]}
                                  >
                                    <Input
                                      size="large"
                                      type="number"
                                      placeholder="Phone Number"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label="First Emergency Contact Number"
                                    colon={false}
                                    name={[field.name, 'ice1_phone']}
                                    fieldKey={[field.fieldKey, 'ice1_phone']}
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          'First Emergency Contact Number is required'
                                      }
                                    ]}
                                  >
                                    <Input
                                      size="large"
                                      type="number"
                                      placeholder="First Emergency Contact Number"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label="No. of Minors"
                                    colon={false}
                                    name={[field.name, 'minor_count']}
                                    fieldKey={[field.fieldKey, 'minor_count']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Phone number is required'
                                      }
                                    ]}
                                  >
                                    <Input
                                      size="large"
                                      type="number"
                                      placeholder="Number of Minors"
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...field}
                                    label="Seat Number"
                                    colon={false}
                                    name={[field.name, 'seat_id']}
                                    fieldKey={[field.fieldKey, 'seat_id']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Seat number is required'
                                      }
                                    ]}
                                  >
                                    <Select
                                      autoComplete="off"
                                      size="large"
                                      placeholder="Choose an option"
                                      showSearch
                                      filterOption={true}
                                      optionFilterProp="children"
                                      disabled={loadingSeats || submitting}
                                      loading={loadingSeats}
                                    >
                                      {busSeats.map((seat) => (
                                        <Select.Option
                                          key={seat.id}
                                          value={seat.id}
                                        >
                                          Seat {seat.number}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Space>
                              ))}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  Add a Traveller
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      )}
                    </div>
                  </div>

                  {/* ::: step 4 */}
                  <div className={`${step !== 4 ? 'hide' : ''}`}>
                    <h3 className="section-title">Summary</h3>
                    <div className="table-responsive">
                      <table
                        className="table table-striped"
                        style={{ marginBottom: 20 }}
                      >
                        <tbody>
                          {Object.keys(summary).map((sum, index) => (
                            <tr key={index}>
                              <td>
                                <b>{sum}</b>
                              </td>
                              <td>{summary[sum]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="">
                    <div className="float-left">
                      {step > 0 && (
                        <Button
                          size="large"
                          disabled={submitting}
                          onClick={() => nextStep(step - 1)}
                        >
                          &nbsp; &nbsp; &nbsp; &nbsp; Go back &nbsp; &nbsp;
                          &nbsp; &nbsp;{' '}
                        </Button>
                      )}
                    </div>
                    <div className="float-right">
                      <Button
                        size="large"
                        type="primary"
                        onClick={() => nextStep(step + 1)}
                        loading={submitting}
                      >
                        &nbsp; &nbsp; &nbsp; &nbsp; Continue &nbsp; &nbsp;
                        &nbsp; &nbsp;{' '}
                      </Button>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PayModal
        {...props}
        {...pay}
        onCancel={() => setPay({})}
        onSuccess={() => {
          navigate('/', { replace: true })
        }}
      />
    </React.Fragment>
  )
}

export default AppBuyTicket
