import { Button, Checkbox, Form, Input } from 'antd';

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/authentication/authenticationSlice';

export const Login = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading} = useSelector(store => store.authenticationReducer)
    const onFinish = async (values)  => {
        const a = {
            ...values,
            UserID: parseInt(values.UserID)
        }
        await dispatch(login(a))
        if(localStorage.getItem("userid")){
            navigate("/")
        }
    };
    const onFinishFailed = (errorInfo) => {
       
    };

    return (
        <div className="login-page">
            <div className="login-page__container">
                <h1 className="login-page__heading">
                    Login
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
                        label="UserID"
                        name="UserID"
                        labelCol={12}
                        wrapperCol={12}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your userid!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
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
                       labelCol={0}
                       wrapperCol={12}

                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Login
                        </Button>
                        <Link to="/register" style={{marginLeft:"20px"}}>
                            <Button type="primary" ghost>
                                Register
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
