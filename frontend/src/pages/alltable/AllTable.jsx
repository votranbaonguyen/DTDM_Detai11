import React, { useEffect, useState } from 'react'
import { Button, Form, Space, Table, Tag } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { TableModal } from '../../components/tablemodal/TableModal';
import {createTable,getAllTable} from '../../redux/alltable/allTableSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';


export const AllTable = () => {
  const navigate = useNavigate()
  const {userid, loginStatus} = useSelector(store => store.authenticationReducer)
  if(!loginStatus){
    navigate("/login")
  }
  const columns = [
    {
      title: 'Table Name',
      dataIndex: 'tablename',
      key: 'tablename',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Partition Key',
      dataIndex: 'partitionkey',
      key: 'partitionkey',
    },
    {
      title: 'Partition Key Type',
      dataIndex: 'partitionkeytype',
      key: 'partitionkeytype',
    },
    {
      title: 'Sort Key',
      dataIndex: 'sortkey',
      key: 'sortkey',
    },
    {
      title: 'Sort Key Type',
      dataIndex: 'sortkeytype',
      key: 'sortkeytype',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const {tableList,getTableLoading,loading} = useSelector(store => store.allTableReducer)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk =async (value) => {
    const a = {
      ...value,
      UserID: userid
    }
    await dispatch(createTable(JSON.stringify(a)))
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const [form] = Form.useForm();

  useEffect(() => {
    const a = {
      UserID: userid
    }
  
    dispatch(getAllTable(JSON.stringify(a)))

  },[loading])

  return (
    
    <div style={{textAlign:"right"}}>
        <TableModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} form={form}/>
        <div style={{display:"flex", justifyContent:"space-between",margin:"15px 30px"}}> 
            <h2 style={{margin: 0}}>All Table</h2>
            <Button onClick={showModal} type="primary"><PlusOutlined /> Add Table</Button>
        </div>
        <Table columns={columns} dataSource={tableList} />
    </div>
  )
}
