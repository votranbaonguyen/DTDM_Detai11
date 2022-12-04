import { Avatar, Dropdown } from 'antd'
import React from 'react'
import {
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authentication/authenticationSlice';



export const UserPart = ({ userName }) => {
    const dispatch = useDispatch()
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    User Info
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <span
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => dispatch(logout())}
                >
                    Logout
                </span>
            ),
        },
      
    ];
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
