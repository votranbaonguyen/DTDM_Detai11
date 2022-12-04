import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
const { Option } = Select;
const areas = [
  {
    label: 'Beijing',
    value: 'Beijing',
  },
  {
    label: 'Shanghai',
    value: 'Shanghai',
  },
];
const sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
};
const TestModal = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  const handleChange = () => {
    form.setFieldsValue({
      sights: [],
    });
  };
  return (
    <Form form={form} name="dynamic_form_complex" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="area"
        label="Area"
        rules={[
          {
            required: true,
            message: 'Missing area',
          },
        ]}
      >
        <Select options={areas} onChange={handleChange} />
      </Form.Item>
      <Form.List name="additionalKey">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field,index) => (
              <Space key={index} align="baseline">
                <Form.Item
                  {...field}
                  label={`Attribut Key ${index}`}
                  name={[field.name, `attributkey${index}`]}
                  rules={[
                    {
                      required: true,
                      message: 'Missing price',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...field}
                  label={`Attribut Value ${index}`}
                  name={[field.name,  `attributvalue${index}`]}
                  rules={[
                    {
                      required: true,
                      message: 'Missing price',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add sights
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default TestModal;