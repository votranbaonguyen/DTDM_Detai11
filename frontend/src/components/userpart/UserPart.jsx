import { Avatar, Dropdown } from 'antd'
import React from 'react'
import {
    UserOutlined,
} from '@ant-design/icons';

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

export const UserPart = ({ userName }) => {
    return (
        <div className="user-part">
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
            >
                <div className="user-info">
                    <Avatar size={48} icon={<UserOutlined />} style={{ marginRight: "10px" }} />
                    {userName}
                </div>
            </Dropdown>
        </div>
    )
}
