import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Space, Spin } from 'antd'
import { useSelector } from 'react-redux';
import {
    PlusOutlined,
    MinusCircleOutlined
} from '@ant-design/icons';

export const RecordModal = ({ isModalOpen, handleOk, handleCancel, form, modalType }) => {
    const { addLoading, baseAttr, atributes, loading } = useSelector(store => store.tableReducer)


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderFormItem = () => {
        let a
        if(modalType === 'Edit')
            a = atributes
        else a = baseAttr
        return a.map((attr, index) => {
            return <Form.Item
                label={attr}
                name={attr}
                labelCol={5}
                wrapperCol={19}
                key={index}

                rules={[
                    {
                        required: true,
                        message: `Please input the ${attr}!`,
                    },
                ]}
            >
                <Input disabled={modalType==="Edit" ? baseAttr[0] === attr ||  baseAttr[1] === attr? true : false : false}/>
            </Form.Item>
        })
    }

    return (
        <Modal
            title={`${modalType} Record`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            width={800}
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
                {renderFormItem()}
                {modalType === "Add" ?
                <Form.List name="additionalKey">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Space key={index} align="baseline" style={{ justifyContent: "space-between", width:"100%" }}>
                                    <Form.Item
                                        {...field}
                                        label={`Attribute Key ${index}`}
                                        name={[field.name, `attributekey${index}`]}
                                        labelCol={{
                                            span: 10,
                                        }}
                                        wrapperCol={{
                                            span: 14,
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing price',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        label={`Attribute Value ${index}`}
                                        name={[field.name, `attributevalue${index}`]}
                                        labelCol={{
                                            span: 10,
                                        }}
                                        wrapperCol={{
                                            span: 14,
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing price',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Attribute
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                : ""
                }
                <div style={{ textAlign: "right" }}>
                    <Button style={{ marginRight: "15px" }} onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit" disabled={addLoading}>
                        {addLoading ? <Spin size="small" /> : ""} {modalType}
                    </Button>
                </div>

            </Form>
        </Modal>
    )
}
