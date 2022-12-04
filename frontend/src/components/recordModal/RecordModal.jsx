import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { useSelector } from 'react-redux';
import {
    PlusOutlined
} from '@ant-design/icons';

export const RecordModal = ({ isModalOpen, handleOk, handleCancel, form, modalType }) => {
    const { items, atributes, loading } = useSelector(store => store.tableReducer)

    const [attrList,setAttrList] = useState([])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderFormItem = () => {
        return atributes.map((attr, index) => {
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
                <Input />
            </Form.Item>
        })
    }

    const addField = () => {
        const newAttrList = attrList
        newAttrList.push({
            atrributekey: "attributekey",
            atrributevalue: "attributevalue",
            atrributekeylabel: "Attribute Key",
            atrributevaluelabel: "Attribute Value"
        })
        setAttrList(newAttrList)
    }
    
    const renderFlankFormItem = () => {
        return attrList.map((item,index) => {
            return <div style={{display:"flex",width:"100%"}} key={index}>
                <Form.Item
                label= {`${item.atrributekeylabel} ${index}`}
                name={`${item.atrributekey}${index}`}
                labelCol={5}
                wrapperCol={19}
                rules={[
                    {
                        required: true,
                        message: `Please input the ${item.atrributekey}!`,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label= {`${item.atrributevaluelabel} ${index}`}
                name={`${item.atrributevalue}${index}`}
                labelCol={5}
                wrapperCol={19}
                rules={[
                    {
                        required: true,
                        message: `Please input the ${item.atrributevalue}!`,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            </div>
        })
    }
    return (
        <Modal
            title={`${modalType} Record`}
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
                {renderFormItem()}
                {renderFlankFormItem()}
                <Form.Item
                wrapperCol={{
                    span: 24,
                }}
                >
                    
                    <Button
                        type="dashed"
                        onClick={addField}
                        style={{
                            width: '60%',
                        }}
                        icon={<PlusOutlined />}
                    >
                        Add field
                    </Button>

                </Form.Item>
                <div style={{ textAlign: "right" }}>
                    <Button style={{ marginRight: "15px" }} onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        {modalType}
                    </Button>
                </div>

            </Form>
        </Modal>
    )
}
