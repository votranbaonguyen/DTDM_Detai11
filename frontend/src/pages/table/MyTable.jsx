import React, { useState } from 'react'
import { Button, Form, Space, Table, Tag } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { RecordModal } from '../../components/recordModal/RecordModal';

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



export const MyTable = () => {
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
              <a onClick={() => {
                showModal()
                setModalType("Edit")
              }}>Edit</a>
              <a style={{color: "red"}}>Delete</a>
            </Space>
          ),
        },
      ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType,setModalType] = useState("Add");

    const [form] = Form.useForm();

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
  return (
    <div>
    <div style={{display:"flex", justifyContent:"space-between",margin:"15px 30px"}}> 
    <RecordModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} form={form} modalType={modalType}/>
            <h2 style={{margin: 0}}>Table 1</h2>
            <Button onClick={() => {
                showModal()
                setModalType("Add")
            }} type="primary"><PlusOutlined /> Add Record</Button>
        </div>    
    <Table columns={columns} dataSource={data} />
    </div>
  )
}
