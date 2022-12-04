import React, { useEffect, useState } from 'react'
import { Button, Form, Space, Table, Tag } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { RecordModal } from '../../components/recordModal/RecordModal';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, setBasicAttr } from '../../redux/table/tableSlice';
import { useNavigate, useParams } from 'react-router-dom';



export const MyTable = () => {
  const navigate = useNavigate()
  const {loginStatus} = useSelector(store => store.authenticationReducer)
  const {tableList} = useSelector(store => store.allTableReducer)
  if(!loginStatus){
    navigate("/login")
  }
    const param = useParams()
    const { items,atributes,loading} = useSelector(store => store.tableReducer)
    const dispatch = useDispatch()
    const renderColumns = () => {
      return atributes.map((atr) => {
        return {
          title: atr,
          dataIndex: atr.toLowerCase(),
          key: atr.toLowerCase()
        }
      })
    }
  


    const columns = renderColumns()
    columns.push({
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            showModal()
            setModalType("Edit")
          }}>Edit</a>
          <a style={{color: "red"}}>Delete</a>
        </Space>
      ),
    })

   

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

    useEffect(() => {
      let index = tableList.findIndex((table) => table.tablename == param.tablename)
      dispatch(setBasicAttr({partitionkey: tableList[index].partitionkey,sortkey: tableList[index].sortkey}))
      dispatch(getItems(param.tablename))
    },[window.location.href])
  return (
 
    <div>
    <div style={{display:"flex", justifyContent:"space-between",margin:"15px 30px"}}> 
    <RecordModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} form={form} modalType={modalType}/>
            <h2 style={{margin: 0}}>{param.tablename}</h2>
            <Button onClick={() => {
                showModal()
                setModalType("Add")
            }} type="primary"><PlusOutlined /> Add Record</Button>
        </div>    
    <Table columns={columns} dataSource={items} />
    </div>
  )
}
