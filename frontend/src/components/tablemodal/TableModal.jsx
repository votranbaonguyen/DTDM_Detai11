import { Button, Checkbox, Form, Input, Modal } from 'antd'
import React from 'react'

export const TableModal = ({ isModalOpen, handleOk, handleCancel,form }) => {
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            title="Add Table"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={600}   
        >
            <Form
                name="basic"
                form={form}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleOk}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <div style={{textAlign:"right"}}>
                    <Button style={{marginRight:"15px"}} onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </div>

            </Form>
        </Modal>
    )
}
