import { Button, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileUpdated } from '../../store/auth/_authActions'
import { axius } from '../../utils'

const AppUserProfile = () => {
  const logg = useSelector(state => state.auth.logg)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  const onlyNumbers = (e) => {
    const regex = /[^0-9]/gi
    form.setFieldsValue({
      [e.target.id]: e.target.value.replace(regex, '')
    })
  }

  const submit = (v) => {
    setSubmitting(true)
    axius.put('users', v).then(res => {
      setSubmitting(false)
      if (res.status === 200) {
        dispatch(profileUpdated(res.data))
        notification.success({ message: 'Profile updated' })
      } else {
        notification.error({ ...res })
      }
    })
  }

  return (
    <React.Fragment>
      <Form form={form} layout="vertical" onFinish={submit}>
        <div className="row">
          <div className="col-lg-6">
            <Form.Item colon={false} label="Full Name" name="name" initialValue={logg.name} rules={[{ required: true, message: 'This field is required' }]}>
              <Input autoComplete="off" size="large" disabled={submitting} />
            </Form.Item>
            <Form.Item colon={false} label="Phone Number" name="phone" initialValue={logg.phone} rules={[{ required: true, message: 'This field is required' }]}>
              <Input autoComplete="off" size="large" disabled={submitting} onChange={onlyNumbers} />
            </Form.Item>
            <Form.Item colon={false} label="Primary Emergency Phone Number" initialValue={logg.ice_primary_phone} name="ice1_phone" rules={[{ required: true, message: 'This field is required' }]}>
              <Input autoComplete="off" size="large" disabled={submitting} onChange={onlyNumbers} />
            </Form.Item>
            <Form.Item colon={false} label="Secondary Emergency Phone Number" initialValue={logg.ice_secondary_phone} name="ice2_phone" rules={[{ required: true, message: 'This field is required' }]}>
              <Input autoComplete="off" size="large" disabled={submitting} onChange={onlyNumbers} />
            </Form.Item>

            <div className="text-right">
              <Button size="large" type="primary" htmlType="submit" loading={submitting}>&nbsp; &nbsp; &nbsp; &nbsp; Save &nbsp; &nbsp; &nbsp; &nbsp; </Button>
            </div>
          </div>
        </div>
      </Form>
    </React.Fragment>
  )
}

export default AppUserProfile
