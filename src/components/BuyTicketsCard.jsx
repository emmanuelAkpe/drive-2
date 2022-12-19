/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  notification,
  Radio,
  Select,
  Checkbox,
  Input,
  Space
} from 'antd'
import moment from 'moment'
import { axius } from '../utils'
import PayModal from './PayModal'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { MdEventSeat } from 'react-icons/md'

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
    description: 'Choose whom you are buying for.',
    icon: '/assets/img/app/user.png'
  },
  {
    step: 1,
    title: 'Journey Details',
    description: 'Provide details of your trip here.',
    icon: '/assets/img/app/location.png'
  },
  {
    step: 2,
    title: 'Bus Selection',
    description: 'Select bus.',
    icon: '/assets/img/app/bus.png'
  },
  {
    step: 3,
    title: 'Seat Selection',
    description: 'Select seats.',
    icon: '/assets/img/app/seat.png'
  },
  {
    step: 4,
    title: 'Summary',
    description:
      'Review all entries concerning this ticket purchase. Confirm all details and submit to complete the process',
    icon: '/assets/img/app/file.png'
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
        <div className="">
          <div className="flex flex-col md:flex-row mt-3 p-5 gap-x-5">
            <div className="flex-[0.3]">
              <div className="steps">
                {steps.map((s) => (
                  <div
                    key={s.step}
                    className={`step p-3 mb-2  ${
                      s.step === step ? 'active' : ''
                    }`}
                    onClick={() => nextStep(s.step)}
                  >
                    <div className=" flex items-center gap-x-3">
                      <div className="flex items-center justify-center bg-iconBg h-7 w-7 rounded-lg">
                        <img src={s.icon} alt="" />
                      </div>
                      <h4 className="mt-1 font-bold">{s.title}</h4>
                    </div>
                    <div className="muted">{s.description}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-[0.7]">
              <div className="bg-light p-4 grid place-items-center grid-cols-1 ">
                <Form form={form} layout="vertical">
                  {/* ::: step 0 */}
                  <div className={`${step !== 0 ? 'hide' : ''}`}>
                    <div className="flex items-center justify-center ">
                      <h3 className="font-semibold text-2xl my-5 ">
                        Whom are you buying for?
                      </h3>
                    </div>
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
                        <Radio.Group>
                          <Space direction="vertical">
                            <span onClick={() => nextStep(1)}>
                              <Radio className=" target_person" value="self">
                                <h4 className="muted font-bold mt-1 p-3 ">
                                  Buy for Self
                                </h4>
                              </Radio>
                            </span>
                            <span onClick={() => nextStep(1)}>
                              <Radio className="target_person" value="others">
                                <h4 className="muted font-bold mt-1 p-2">
                                  Buy for others
                                </h4>
                              </Radio>
                            </span>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </div>
                  </div>
                  {/* ::: step 1 */}
                  <div
                    className={`${
                      step !== 1 ? 'hide' : ''
                    } flex flex-col items-center justify-center`}
                  >
                    <div className="flex items-center justify-center ">
                      <h3 className="font-semibold text-2xl my-5 ">
                        Journey Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 w-full md:grid-cols-2 mt-3 p-5 md:gap-x-5 mb-4">
                      <div className="">
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
                  <div
                    className={`flex flex-col items-center justify-center ${
                      step !== 2 ? 'hide' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center mb-10 mt-5">
                      <h3 className="font-semibold text-2xl  ">
                        Select a Bus and Pickup point
                      </h3>
                    </div>
                    <div className="">
                      <div className=" ">
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
                            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
                              {buses.map((bus) => (
                                <div key={bus.id} className="w-full ">
                                  <Radio className="bus" value={bus.id}>
                                    <div className="flex  items-center justify-center gap-x-3 ">
                                      <img
                                        src="/assets/img/app/selectBus.png"
                                        alt=""
                                        className="object-contain"
                                      />
                                      <div className="w-full">
                                        <div className="flex font-bold">
                                          <h4>Bus: </h4>
                                          <p className="font-semibold">
                                            {bus.station.bus_company.name} (
                                            {bus.bus.reg_number})
                                          </p>
                                        </div>
                                        <div className="flex">
                                          <h4 className="font-bold">
                                            Station :
                                          </h4>{' '}
                                          <p className="font-semibold">
                                            {bus.station.name}
                                          </p>
                                        </div>
                                        <div className=" flex">
                                          <h4 className="font-bold">
                                            Departure:
                                          </h4>
                                          <p className="font-semibold">
                                            {bus.departure_time}
                                          </p>
                                        </div>
                                        <b className="primary flex">
                                          <h4 className="font-bold">GHS</h4>{' '}
                                          <p className="font-semibold">
                                            {bus.price}
                                          </p>
                                        </b>
                                      </div>
                                    </div>
                                  </Radio>
                                </div>
                              ))}
                            </div>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div className="flex md:gap-x-36">
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
                              <Space direction="vertical">
                                <Radio className=" pickup__radio" value={0}>
                                  Bus Terminal
                                </Radio>
                                <Radio
                                  className=" pickup__radio"
                                  value={1}
                                  disabled={!pickups.length > 0}
                                >
                                  Mid Route
                                </Radio>
                              </Space>
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
                  </div>
                  {/* ::: step 3 */}
                  <div
                    className={`flex flex-col items-center justify-center ${
                      step !== 3 ? 'hide' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center mb-10 mt-5">
                      <h3 className="font-semibold text-2xl  ">
                        Seat Selection
                      </h3>
                    </div>
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
                              <Radio className="pickup__radio" value={1}>
                                Yes
                              </Radio>
                              <Radio className="pickup__radio" value={0}>
                                No
                              </Radio>
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
                              <Checkbox.Group
                                name="seats"
                                className="grid grid-cols-4 md:grid-cols-8"
                              >
                                {busSeats &&
                                  busSeats.map((seat) => (
                                    <Checkbox
                                      key={seat.id}
                                      value={seat.id}
                                      className="seatSelection"
                                      disabled={seat.status === 1}
                                    >
                                      <div className="">
                                        <svg
                                          width="54"
                                          height="49"
                                          viewBox="0 0 54 49"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <rect
                                            y="6.23016"
                                            width="5.25"
                                            height="37.1907"
                                            rx="2.625"
                                            fill="#079669"
                                            className="seat"
                                          />
                                          <rect
                                            x="48.75"
                                            y="6.23016"
                                            width="5.25"
                                            height="37.1907"
                                            rx="2.625"
                                            fill="#079669"
                                            className="seat"
                                          />
                                          <path
                                            d="M10.5 5.51144C10.5 2.95824 12.4242 0.806375 14.9672 0.579164C23.7952 -0.209571 30.1884 -0.180242 39.0114 0.591414C41.5634 0.814609 43.5 2.96993 43.5 5.53167V29.704C43.5 32.064 41.8493 34.1184 39.5261 34.5334C30.5267 36.1411 23.962 36.0686 14.5616 34.4894C12.1998 34.0926 10.5 32.0214 10.5 29.6265V5.51144Z"
                                            fill="#079669"
                                            className="seat"
                                          />
                                          <path
                                            d="M10.5 42.7474C10.5 40.0977 13.0312 38.1936 15.6164 38.7748C23.981 40.6551 30.1751 40.6137 38.3947 38.766C40.9761 38.1858 43.5 40.0888 43.5 42.7347V43.8398C43.5 45.7559 42.1406 47.4108 40.2522 47.7352C30.5438 49.4033 23.8265 49.4414 13.7562 47.7303C11.8644 47.4089 10.5 45.7524 10.5 43.8335V42.7474Z"
                                            fill="#079669"
                                            className="seat"
                                          />
                                        </svg>
                                      </div>
                                      <div className=" absolute text-lg -mt-10 ml-5">
                                        {seat.number}
                                      </div>
                                    </Checkbox>
                                  ))}
                              </Checkbox.Group>
                            ) : (
                              <Radio.Group
                                name="seat_id"
                                className="grid grid-cols-4 md:grid-cols-8"
                              >
                                {busSeats &&
                                  busSeats.map((seat) => (
                                    <Radio
                                      key={seat.id}
                                      value={seat.id}
                                      className=" seatSelection"
                                      disabled={seat.status === 1}
                                    >
                                      <svg
                                        width="54"
                                        height="49"
                                        viewBox="0 0 54 49"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <rect
                                          y="6.23016"
                                          width="5.25"
                                          height="37.1907"
                                          rx="2.625"
                                          fill="#079669"
                                          className="seat"
                                        />
                                        <rect
                                          x="48.75"
                                          y="6.23016"
                                          width="5.25"
                                          height="37.1907"
                                          rx="2.625"
                                          fill="#079669"
                                          className="seat"
                                        />
                                        <path
                                          d="M10.5 5.51144C10.5 2.95824 12.4242 0.806375 14.9672 0.579164C23.7952 -0.209571 30.1884 -0.180242 39.0114 0.591414C41.5634 0.814609 43.5 2.96993 43.5 5.53167V29.704C43.5 32.064 41.8493 34.1184 39.5261 34.5334C30.5267 36.1411 23.962 36.0686 14.5616 34.4894C12.1998 34.0926 10.5 32.0214 10.5 29.6265V5.51144Z"
                                          fill="#079669"
                                          className="seat"
                                        />
                                        <path
                                          d="M10.5 42.7474C10.5 40.0977 13.0312 38.1936 15.6164 38.7748C23.981 40.6551 30.1751 40.6137 38.3947 38.766C40.9761 38.1858 43.5 40.0888 43.5 42.7347V43.8398C43.5 45.7559 42.1406 47.4108 40.2522 47.7352C30.5438 49.4033 23.8265 49.4414 13.7562 47.7303C11.8644 47.4089 10.5 45.7524 10.5 43.8335V42.7474Z"
                                          fill="#079669"
                                          className="seat"
                                        />
                                      </svg>
                                      <div className=" absolute text-lg left-[40%] top-[15%]">
                                        {seat.number}
                                      </div>
                                    </Radio>
                                  ))}
                              </Radio.Group>
                            )}
                          </Form.Item>
                        </>
                      ) : (
                        <Form.List name="seats">
                          {(fields, { add, remove }) => (
                            // work here
                            <>
                              {fields.map((field) => (
                                <Space
                                  direction="vertical"
                                  key={field.key}
                                  style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                    padding: '1rem'
                                  }}
                                >
                                  <div style={{ textAlign: 'right' }}>
                                    <MinusOutlined
                                      onClick={() => remove(field.name)}
                                    />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
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
                                  </div>
                                </Space>
                              ))}
                              <Form.Item className=" flex items-center justify-center">
                                <Button
                                  type="solid"
                                  style={{ borderColor: '#079669' }}
                                  onClick={() => add()}
                                  block
                                >
                                  <div className="flex  justify-center gap-x-2">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-oya-ghana-green">
                                      <PlusOutlined className="text-white" />{' '}
                                    </div>{' '}
                                    Add a Traveller
                                  </div>
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      )}
                    </div>
                  </div>

                  {/* ::: step 4 */}
                  <div
                    className={`flex flex-col items-center justify-center  w-full md:w-[50vw] ${
                      step !== 4 ? 'hide' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center mb-10 mt-5 w-full ">
                      <h3 className="font-semibold text-2xl  ">Summary</h3>
                    </div>
                    <div className="w-full">
                      <table
                        className="table table-striped "
                        style={{
                          marginBottom: 20,
                          width: '100%'
                        }}
                      >
                        <tbody className="w-full">
                          {Object.keys(summary).map((sum, index) => (
                            <tr key={index} className="md:h-10 ">
                              <td className="px-5">
                                <b>{sum}</b>
                              </td>
                              <td>{summary[sum]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className=" flex flex-col md:flex-row gap-2 items-center justify-center">
                    <div className="">
                      {step > 0 && (
                        <Button
                          className="  border-oya-ghana-green text-oya-ghana-green rounded-lg  hover:bg-green-800 hover:text-gray-400 "
                          disabled={submitting}
                          onClick={() => nextStep(step - 1)}
                        >
                          &nbsp; &nbsp; &nbsp; &nbsp; Go back &nbsp; &nbsp;
                          &nbsp; &nbsp;{' '}
                        </Button>
                      )}
                    </div>
                    <div className="">
                      {step > 0 && (
                        <Button
                          className=" bg-oya-ghana-green rounded-lg text-white hover:bg-green-800 hover:text-gray-400 "
                          onClick={() => nextStep(step + 1)}
                          loading={submitting}
                        >
                          &nbsp; &nbsp; &nbsp; &nbsp; Continue &nbsp; &nbsp;
                          &nbsp; &nbsp;{' '}
                        </Button>
                      )}
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
