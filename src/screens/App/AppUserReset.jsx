/*eslint-disable*/

import { Button, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { axius } from '../../utils'

const AppUserReset = () => {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)

  const onlyNumbers = (e) => {
    const regex = /[^0-9]/gi

    form.setFieldsValue({
      [e.target.id]: e.target.value.replace(regex, '')
    })
  }

  const confirmPin = (rule, value, callback) => {
    if (!value) {
      callback()
    }
    if (value !== form.getFieldValue('new_pin')) {
      // eslint-disable-next-line n/no-callback-literal

      callback('Pins do not match')
    }
    callback()
  }

  const submit = (v) => {
    setSubmitting(true)

    delete v.new_pin2

    axius.put('user/pin', v).then((res) => {
      setSubmitting(false)
      if (res.status === 200) {
        form.resetFields()
        notification.success({ message: 'Your Pin has been changed' })
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
            <Form.Item
              colon={false}
              label="Current Pin"
              name="old_pin"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input
                type="password"
                autoComplete="off"
                size="large"
                disabled={submitting}
                onChange={onlyNumbers}
              />
            </Form.Item>
            <Form.Item
              colon={false}
              label="New Pin"
              name="new_pin"
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input
                type="password"
                autoComplete="off"
                size="large"
                disabled={submitting}
                onChange={onlyNumbers}
              />
            </Form.Item>
            <Form.Item
              colon={false}
              label="Confirm New Pin"
              name="new_pin2"
              rules={[
                { required: true, message: 'This field is required' },
                { validator: confirmPin }
              ]}
            >
              <Input
                type="password"
                autoComplete="off"
                size="large"
                disabled={submitting}
                onChange={onlyNumbers}
              />
            </Form.Item>

            <div className="text-right">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={submitting}
              >
                &nbsp; &nbsp; &nbsp; &nbsp; Save &nbsp; &nbsp; &nbsp; &nbsp;{' '}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </React.Fragment>
  )
}

export default AppUserReset
