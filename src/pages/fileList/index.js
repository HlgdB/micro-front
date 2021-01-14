import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Menu, Breadcrumb, Button, Table, Tabs } from 'antd';
import './Tag.css';
import { Input } from 'antd';
import { Dropdown } from 'antd';
import request from '@/utils/request';
import { DownOutlined, AudioOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';

const { Search } = Input;
const { TabPane } = Tabs;

const PageTag = (props) => {
  const { videos, pics, dispatch } = props;
  console.log(pics);

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            dispatch({
              type: 'fileList/getAllVideo',
            });
          }}
        >
          全部
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          onClick={() => {
            dispatch({
              type: 'fileList/getSelfVideo',
            });
          }}
        >
          自己上传
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          onClick={() => {
            dispatch({
              type: 'fileList/getOthersVideo',
            });
          }}
        >
          他人上传
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          已检测
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          未检测
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          视频
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          图片
        </a>
      </Menu.Item>
    </Menu>
  );

  const paginationProps = {
    defaultPageSize: 8,
  };

  const VideoPage = () => {
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [videodata, setvideodata] = useState(undefined);

    useEffect(() => {
      if (!videodata) {
        setvideodata(videos);
      }
      return () => {};
    }, [videos]);

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '检测状态',
        dataIndex: 'check_status',
        key: 'check_status',
        render: (text) => <span>{text === 1 ? '已检测' : '未检测'}</span>,
      },
      {
        title: '类型',
        dataIndex: 'file_type',
        key: 'file_type',
        render: () => <span>视频</span>,
      },
      {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time',
      },
      {
        title: '上传者',
        key: 'creator_name',
        dataIndex: 'creator_name',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>检测</a>
            <a>标志</a>
            <a>删除</a>
          </Space>
        ),
      },
    ];

    const onSelectedRowKeysChange = (selectedRowKeys_) => {
      setselectedRowKeys({ selectedRowKeys_ });
      console.log(selectedRowKeys_);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectedRowKeysChange,
    };

    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, float: 'left', width: '100%' }}
      >
        <div style={{ float: 'left' }}>
          <DatePicker />
        </div>
        <div style={{ marginLeft: '76%' }}>
          <Search placeholder="input search text" allowClear enterButton="Search" />
        </div>
        <div style={{ float: 'left' }}>
          <Button style={{ marginTop: 10 }}>一键检测</Button>
        </div>
        <div style={{ marginTop: 10, marginLeft: '94%' }}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              筛选目标 <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <Table
          columns={columns}
          dataSource={videodata}
          style={{ marginTop: 20 }}
          pagination={paginationProps}
          rowSelection={rowSelection}
          loading={false}
          onRow={(record) => ({})}
        />
      </div>
    );
  };

  const PicPage = () => {
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [picdata, setpicdata] = useState(undefined);

    useEffect(() => {
      if (!picdata) {
        setpicdata(pics);
      }
      return () => {};
    }, [pics]);

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '检测状态',
        dataIndex: 'check_status',
        key: 'check_status',
        render: (text) => <span>{text === 1 ? '已检测' : '未检测'}</span>,
      },
      // {
      //   title: '类型',
      //   dataIndex: 'file_type',
      //   key: 'file_type',
      // },
      {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time',
      },
      {
        title: '上传者',
        key: 'creator_name',
        dataIndex: 'creator_name',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>检测</a>
            <a>标志</a>
            <a>删除</a>
          </Space>
        ),
      },
    ];

    const onSearch = (value) => {
      if (value) {
        request(`/picture/search_name/${value}`, {
          method: 'get',
        }).then((res) => {
          setpicdata(res);
        });
      } else {
        request(`/picture/all`, {
          method: 'get',
        }).then((res) => {
          setpicdata(res);
        });
      }
    };

    const onSelectedRowKeysChange = (selectedRowKeys_) => {
      setselectedRowKeys({ selectedRowKeys_ });
      console.log(selectedRowKeys_);
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectedRowKeysChange,
    };

    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, float: 'left', width: '100%' }}
      >
        <div style={{ float: 'left' }}>
          <DatePicker />
        </div>
        <div style={{ marginLeft: '76%' }}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
          />
        </div>
        <div style={{ float: 'left' }}>
          <Button style={{ marginTop: 10 }}>一键检测</Button>
        </div>
        <div style={{ marginTop: 10, marginLeft: '94%' }}>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              筛选目标 <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <Table
          columns={columns}
          dataSource={picdata}
          style={{ marginTop: 20 }}
          pagination={paginationProps}
          rowSelection={rowSelection}
          loading={false}
          onRow={(record) => ({})}
        />
      </div>
    );
  };

  function callback(key) {
    console.log(key);
  }

  const Pages = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="图像" key="1">
        <PicPage />
      </TabPane>
      <TabPane tab="视频" key="2">
        <VideoPage />s
      </TabPane>
    </Tabs>
  );

  return (
    <div style={{ width: '100%' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>活体检测</Breadcrumb.Item>
        <Breadcrumb.Item>检测列表</Breadcrumb.Item>
      </Breadcrumb>
      <Pages />
    </div>
  );
};

const mapStateToProps = ({ fileList, loading }) => {
  console.log('fileList', fileList);
  return {
    videos: fileList.videos,
    pics: fileList.pics,
    // powerEngine: inforImport.powerEngine
  };
};

export default connect(mapStateToProps)(PageTag);
