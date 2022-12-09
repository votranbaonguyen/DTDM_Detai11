import { Button, Checkbox, Form, Input, Modal, Select, Spin } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const options =
    [
        {
            value: 'S',
            label: 'String',
        },
        {
            value: 'N',
            label: 'Number',
        }

    ]

export const TableModal = ({ isModalOpen, handleOk, handleCancel, form }) => {

    const [partitionKeyType, setPartitionKeyType] = useState("S")
    const [softKeyType, setSoftKeyType] = useState("S")

    const {loading} = useSelector(store => store.allTableReducer)

    const partitionKeyTypeChange = (value) => {
        setPartitionKeyType(value)
        form.setFieldsValue({
            partitionkeytype: value
        })
    }
    const softKeyTypeChange = (value) => {
        setSoftKeyType(value)
        form.setFieldsValue({
            softKeyType: value
        })
    }

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
            confirmLoading={loading}
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
                    label="Table Name"
                    name="TableName"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the table name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Partition Key"
                    name="partitionkey"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the partition key!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Partition Key Type"
                    name="partitionkeytype"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the partition key!',
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: 120,
                        }}
                        onChange={partitionKeyTypeChange}
                        options={options}
                    />
                </Form.Item>
                <Form.Item
                    label="Soft Key"
                    name="sortkey"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the partition key!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Soft Key Type"
                    name="sortkeytype"
                    labelCol={5}
                    wrapperCol={19}
                    rules={[
                        {
                            required: true,
                            message: 'Please input the partition key!',
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: 120,
                        }}
                        onChange={softKeyTypeChange}
                        options={options}
                    />
                </Form.Item>

                <div style={{ textAlign: "right" }}>
                    <Button style={{ marginRight: "15px" }} onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Add
                    </Button>
                </div>

            </Form>
        </Modal>
    )
}
