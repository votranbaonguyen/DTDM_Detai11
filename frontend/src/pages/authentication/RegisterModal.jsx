import { Button, Descriptions, Modal } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

export const RegisterModal = ({ isModalOpen, handleOk, handleCancel }) => {
    const { registerBody } = useSelector(store => store.authenticationReducer)
    return (
        <Modal
            title=""
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button type="primary" key="goto" onClick={handleOk}>
                  Go to Login
                </Button>,
              ]}
        >
            <h2>This is your Infomation </h2>
            <h4 style={{ color: "red" }}>You will need them to login so just NOTE IT BACK</h4>
            <Descriptions>
                <Descriptions.Item label="ID">{registerBody ? registerBody.id : ""}</Descriptions.Item>
                <Descriptions.Item label="Username">{registerBody ? registerBody.username : ""}</Descriptions.Item>
            </Descriptions>
        </Modal>
    )
}
