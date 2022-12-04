import React, { useEffect, useState } from 'react'
import { Button, Form, Space, Table, Tag } from 'antd';
import {
  PlusOutlined
} from '@ant-design/icons';
import { RecordModal } from '../../components/recordModal/RecordModal';
import { useDispatch, useSelector } from 'react-redux';
import { addAndUpdateItem, deleteItem, getItems, setBasicAttr } from '../../redux/table/tableSlice';
import { useNavigate, useParams } from 'react-router-dom';



export const MyTable = () => {
  const navigate = useNavigate()
  const { loginStatus } = useSelector(store => store.authenticationReducer)
  const { tableList } = useSelector(store => store.allTableReducer)
  if (!loginStatus) {
    navigate("/login")
  }
  const param = useParams()
  const { items, atributes,baseAttr, addLoading } = useSelector(store => store.tableReducer)
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
        <a onClick={async () => {
          await setModalType("Edit")
          if (modalType === "Edit") {
            await form.setFieldsValue(record)
          }
          showModal()

        }}>Edit</a>
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={async () => {
            const a = {
              TableName:param.tablename ,
              Key: {}
            }
            baseAttr.forEach(attr => {
              a["Key"][attr] = record[attr]
            })
            await dispatch(deleteItem(JSON.stringify(a)))
            dispatch(getItems(param.tablename))
          }}
        >
          Delete
        </span>
      </Space>
    ),
  })



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Add");

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);

  };

  const handleOk = async (values) => {

    const a = {}
    for (const key of Object.keys(values)) {
      if (key === "additionalKey") {
        if (values[key]) {
          values[key].forEach((item, index) => {
            a[item[`attributekey${index}`]] = item[`attributevalue${index}`]
          })
        }
      } else {
        const val = values[key];
        a[key] = val
      }
    }
    const b = {
      TableName: param.tablename,
      Item: a
    }
    await dispatch(addAndUpdateItem(JSON.stringify(b)))
    setIsModalOpen(false);
    form.resetFields();
    dispatch(getItems(param.tablename))
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    let index = tableList.findIndex((table) => table.tablename == param.tablename)
    dispatch(setBasicAttr({ partitionkey: tableList[index].partitionkey, sortkey: tableList[index].sortkey }))
    dispatch(getItems(param.tablename))
  }, [window.location.href])
  return (

    <div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 30px" }}>
        <RecordModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} form={form} modalType={modalType} />
        <h2 style={{ margin: 0 }}>{param.tablename}</h2>
        <Button onClick={() => {
          showModal()
          setModalType("Add")
        }} type="primary"><PlusOutlined /> Add Record</Button>
      </div>
      <Table columns={columns} dataSource={items} />
    </div>
  )
}
