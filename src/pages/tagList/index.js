import 'antd/dist/antd.css';
import { connect } from 'umi';
import React, { useState } from 'react';
import { Breadcrumb, Modal } from 'antd';
import './PageprTagList.css';
import { Table, Input, Form, Button } from 'antd';

const { Search } = Input;

const Index = (props) => {
  const { tags, loading, dispatch } = props;

  const AddModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <>
        <Button type="primary" onClick={showModal} style={{ float: 'left' }}>
          添加标签
        </Button>
        <Modal
          title="添加标签"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form
            onFinish={(values) => {
              dispatch({
                type: 'tagList/addTag',
                payload: values,
              });
            }}
          >
            <Form.Item name="name" label="名称">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="描述">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };

  const ChangeDes = (record) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      dispatch({
        type: 'tagList/modifyTag',
        payload: { ...values, id: record.record.id },
      });
    };

    return (
      <>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ description: record.record.description }}
          style={{ width: '85%', float: 'left' }}
        >
          <Form.Item name="description" style={{ margin: '0 0' }}>
            <Input style={{ width: '100%', marginRight: 10 }}></Input>
          </Form.Item>
        </Form>
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
          style={{ float: 'right' }}
        >
          修改
        </Button>
      </>
    );
  };

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '标签描述',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        // console.log('record', record)
        return (
          <>
            {/* <Input defaultValue={record.description} style={{width: "80%",marginRight: 10}}/>
            <Button type="primary" onClick >修改</Button> */}
            <ChangeDes record={record} />
          </>
        );
      },
    },
    {
      title: '创建者',
      dataIndex: 'creator_name',
      key: 'creator_name',
    },
  ];

  const PrivateTagList = () => {
    return (
      <div className="site-layout-content" style={{ padding: 24, minHeight: 360 }}>
        <AddModal />
        <Search
          className="Search"
          placeholder="输入关键字"
          onSearch={(value) => {
            if (value) {
              dispatch({
                type: 'tagList/searchTag',
                payload: value,
              });
            } else {
              dispatch({
                type: 'tagList/getTag',
              });
            }
          }}
          enterButton
          style={{ width: 300, float: 'right' }}
        />

        <br />
        <br />
        <br />

        <Table
          columns={columns}
          dataSource={tags}
          rowSelection={{}}
          pagination={{ defaultPageSize: 5 }}
          loading={loading}
        />
      </div>
    );
  };

  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>标签管理</Breadcrumb.Item>
        <Breadcrumb.Item>标签列表</Breadcrumb.Item>
      </Breadcrumb>
      <PrivateTagList />
    </div>
  );
};

const mapStateToProps = ({ tagList, loading }) => {
  console.log('tagList', tagList);
  return {
    tags: tagList.tags,
    loading: loading.effects['tagList/getTag'],
  };
};

export default connect(mapStateToProps)(Index);
