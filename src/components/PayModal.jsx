import React, { useState } from 'react'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { axius } from '../utils'
import PropTypes from 'prop-types'

const networks = [
  { code: 'mtn', name: 'MTN Mobile Money' },
  { code: 'at', name: 'AirtelTigo Monet' },
  { code: 'vfc', name: 'Vodafone Cash' }
]

const PayModal = ({ onSuccess, onCancel, reference, amount, title }) => {
  const [form] = Form.useForm()

  const [submitting, setSubmitting] = useState(false)

  const submit = (v) => {
    setSubmitting(true)
    axius
      .post('pay', { ...v, amount, reference, payment_type: 'mobile_money' })
      .then((res) => {
        setSubmitting(false)
        if (res.status === 200) {
          close()
          notification.success({ message: 'Payment successful' })
          onSuccess(res.data)
        } else {
          notification.error({ ...res })
        }
      })
  }

  const close = () => {
    setSubmitting(false)
    form.resetFields()
    onCancel()
  }

  return (
    <React.Fragment>
      <Modal
        visible={!!(reference && amount)}
        centered
        closable={false}
        title={`${title}:  #${reference}`}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={submit}>
          <Form.Item
            colon={false}
            label="Choose Payment Network"
            initialValues="mtn"
            name="payment_mode"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Select autoComplete="off" size="large" disabled={submitting}>
              {networks.map((net) => (
                <Select.Option key={net.code} value={net.code}>
                  {net.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            colon={false}
            label="Mobile Money Number"
            initialValues="0249567265"
            name="momo_number"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input
              size="large"
              disabled={submitting}
              placeholder="023 123 4567"
            />
          </Form.Item>

          <Form.Item
            colon={false}
            label="Mobile Money Name"
            initialValues="Bernard Danso"
            name="momo_name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input size="large" disabled={submitting} placeholder="Full name" />
          </Form.Item>

          <div className="text-right">
            <Button
              size="large"
              danger
              onClick={close}
              className="mr-5"
              disabled={submitting}
            >
              &nbsp; &nbsp; &nbsp; Cancel &nbsp; &nbsp; &nbsp;{' '}
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              &nbsp; &nbsp; &nbsp; Pay &nbsp; &nbsp; &nbsp;{' '}
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  )
}
PayModal.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  reference: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}
export default PayModal
