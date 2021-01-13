import 'antd/dist/antd.css';
import { Link } from 'umi';
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Statistic, Row, Col } from 'antd';
import './PagePTagList.css';
import { Card, Avatar } from 'antd';
import { DatePicker, Space, Button } from 'antd';
import { List, Typography, Divider, Tag, Table } from 'antd';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const { RangePicker } = DatePicker;

const Picdata = ['文件名称：阿巴阿巴阿巴', '创建时间：2020.2.30', '类型：图片'];
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const columns = [
  {
    title: '标签名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '标签描述',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    key: 'creator',
  },
];

const data = [];
// eslint-disable-next-line no-plusplus
for (let i = 1; i <= 30; i++) {
  data.push({
    key: i,
    name: `lable${i}`,
    describe: `第${i}个标签描述`,
    creator: '管理员/个人',
  });
}

class PagePTagList extends React.Component {
  state = {
    collapsed: false,
    bordered: false,
    loading: false,
    size: 'default',
    title: undefined,
    // rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomRight',
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { xScroll, yScroll, ...state } = this.state;
    const tableColumns = columns.map((item) => ({
      ...item,
      ellipsis: state.ellipsis,
    }));
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>标签列表</Breadcrumb.Item>
          <Breadcrumb.Item>标签列表-公共</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ padding: 24, minHeight: 360 }}>
          <Search
            className="Search"
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            enterButton
          />
          <Button className="Type">公共</Button>
          <Button className="Type">个人</Button>
          <br />
          <br />
          <br />
          <br />
          <br />

          <Table {...this.state} className="SourceData" columns={columns} dataSource={data} />
        </div>
      </div>
    );
  }
}

export default PagePTagList;
