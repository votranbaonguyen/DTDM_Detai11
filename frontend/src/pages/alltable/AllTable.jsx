import React, { useState } from 'react'
import { Button, Form, Space, Table, Tag } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { TableModal } from '../../components/tablemodal/TableModal';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

export const AllTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const [form] = Form.useForm();
  return (

    <div style={{textAlign:"right"}}>
        <TableModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} form={form}/>
        <div style={{display:"flex", justifyContent:"space-between",margin:"15px 30px"}}> 
            <h2 style={{margin: 0}}>All Table</h2>
            <Button onClick={showModal} type="primary"><PlusOutlined /> Add Table</Button>
        </div>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}
