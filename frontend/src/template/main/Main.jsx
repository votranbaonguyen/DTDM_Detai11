import React, { useState } from 'react'
import { Col, Row, Layout, Menu, Dropdown, Avatar } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
    UserOutlined,
    DatabaseOutlined,
    TableOutlined
} from '@ant-design/icons';
import { UserPart } from '../../components/userpart/UserPart';
import { useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;







export const Main = () => {

    const { tableList, getTableLoading, loading } = useSelector(store => store.allTableReducer)

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const getAllTable = () => {
        return tableList.map((table) => {
            return getItem(<Link to={`/table/${table.tablename}`}>
                {table.tablename}
            </Link>, table.tablename)
        })
    }

    const items = [
        getItem(<Link to="">
            All Table
        </Link>, '1', <DatabaseOutlined />),
        getItem('Table Detail', 'sub1', <TableOutlined />,getAllTable()),
    ];

    return (
        <div className="main-container">
            <Row >
                <Col xs={24} sm={5} md={5} lg={5} xl={5} xxl={5}>
                    <div className="navigation-bar">
                        <h1>Team 1 - FreeDB</h1>
                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme="dark"
                            items={items}
                            className="main-menu"

                        />
                    </div>
                </Col>
                <Col xs={24} sm={19} md={19} lg={19} xl={19} xxl={19}>
                    <div className="top-part">
                        <UserPart userName="Bao Nguyen" />
                    </div>
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}
