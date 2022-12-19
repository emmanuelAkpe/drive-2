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
import { useNavigate } from 'react-router'

const required = {
  0: ['from', 'to', 'departure'],
  1: ['bus_schedule_id', 'pickup', 'midway'],
  2: [
    'target_person',
    'from',
    'to',
    'departure',
    'bus_schedule_id',
    'pickup',
    'midway',
    'minor_count'
  ],
  3: [
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
    title: 'Book In Advance',
    description: 'Provide details of your trip here.',
    icon: '/assets/img/app/location.png'
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
              <div className="bg-light p-4 grid place-items-center grid-cols-1">
                <Form form={form} layout="vertical">
                  {/* ::: step 0 */}
                  <div
                    className={`${
                      step !== 0 ? 'hide' : ''
                    } flex flex-col items-center justify-center`}
                  >
                    <div className="flex items-center justify-center ">
                      <h3 className="font-semibold text-2xl my-5 ">
                        Book In Advance
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

                  {/* ::: step 4 */}
                  <div
                    className={`flex flex-col items-center justify-center  w-full md:w-[50vw] ${
                      step !== 1 ? 'hide' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center mb-10 mt-5 w-full ">
                      <div className="mr-3 flex items-center justify-center bg-iconBg h-7 w-7 rounded-lg">
                        <img src="/assets/img/app/file.png" alt="" />
                      </div>
                      <h3 className="font-semibold text-2xl  ">
                        Input Additional Info
                      </h3>
                    </div>
                    <form action="" className=" w-11/12">
                      <span>message</span>
                      <textarea
                        className="w-full border border-gray-400 h-24 rounded-lg mb-5"
                        placeholder="comment"
                      />
                    </form>
                  </div>

                  <div className="  flex flex-col md:flex-row gap-2 items-center justify-center">
                    <div className="">
                      {step >= 0 && (
                        <Button
                          className="  border-oya-ghana-green text-oya-ghana-green rounded-lg  hover:bg-green-800 hover:text-gray-400 "
                          disabled={submitting}
                          onClick={() => nextStep(step - 1)}
                        >
                          &nbsp; &nbsp; &nbsp; &nbsp; Cancel &nbsp; &nbsp;
                          &nbsp; &nbsp;{' '}
                        </Button>
                      )}
                    </div>
                    <div className="">
                      {step >= 0 && (
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
