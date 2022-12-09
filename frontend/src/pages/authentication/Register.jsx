import { Button, Checkbox, Form, Input } from 'antd';

import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, register, removeRegisterBody } from '../../redux/authentication/authenticationSlice';
import { poppupNoti } from '../../util/notification/Notification';
import { RegisterModal } from './RegisterModal';

export const Register = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalStatus, setModalStatus] = useState(false)
    const { loading, registerBody } = useSelector(store => store.authenticationReducer)

    const onFinish = async (values) => {
        
        if(values.Password === values.retypePassword){
            const newData = {
                UserName: values.UserName,
                Password: values.Password
            }
            await dispatch(register(newData))
        }else{
            poppupNoti.registerFail()
        }
        // if (localStorage.getItem("userid")) {
        //     navigate("/")
        // }
    };
    const onFinishFailed = (errorInfo) => {

    };

    const handleOk = () => {
        navigate("/login")
        setModalStatus(false)
        dispatch(removeRegisterBody())
    }

    const handleCancel = () => {
        navigate("/login")
        setModalStatus(false)
        dispatch(removeRegisterBody())
    }

    useEffect(() => {
        
     if(registerBody !== null){
        setModalStatus(true)
     }   
    })

    return (
        <div className="login-page">
            <RegisterModal isModalOpen={modalStatus} handleOk={handleOk} handleCancel={handleCancel}/>
            <div className="login-page__container">
                <h1 className="login-page__heading">
                    Register
                </h1>
                <Form
                    className='login-form'
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Username"
                        name="UserName"
                        labelCol={12}
                        wrapperCol={12}
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
                        name="Password"
                        labelCol={12}
                        wrapperCol={12}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Re-type Password"
                        name="retypePassword"
                        labelCol={12}
                        wrapperCol={12}
                        rules={[
                            {
                                required: true,
                                message: 'Please re-type your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        labelCol={0}
                        wrapperCol={12}

                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Register
                        </Button>
                        <Link to="/login" style={{marginLeft:"20px"}}>
                            <Button type="primary" ghost>
                                Login
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
