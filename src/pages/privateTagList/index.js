import 'antd/dist/antd.css';
import { Link } from 'umi';
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Statistic, Row, Col } from 'antd';
import './PageprTagList.css';
import { DatePicker, Space, Button } from 'antd';
import { Table } from 'antd';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const { RangePicker } = DatePicker;

const Picdata = ['文件名称：阿巴阿巴阿巴', '创建时间：2020.2.30', '类型：图片'];

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
for (let i = 1; i <= 30; i++) {
  data.push({
    key: i,
    name: 'lable' + i,
    describe: `第${i}个标签描述`,
    creator: '管理员/个人',
  });
}

class PagePrTagList extends React.Component {
  state = {
    collapsed: false,
    bordered: false,
    loading: false,
    size: 'default',
    title: undefined,
    rowSelection: {},
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
    const tableColumns = columns.map((item) => ({ ...item, ellipsis: state.ellipsis }));
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>标签列表</Breadcrumb.Item>
          <Breadcrumb.Item>标签列表-个人</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ padding: 24, minHeight: 360 }}>
          <Button id="btn1" className="Btn">
            批量删除
          </Button>
          <Button id="btn2" className="Btn" type="primary">
            添加
          </Button>
          <Button id="btn3" className="Btn">
            公共
          </Button>
          <Button id="btn4" className="Btn">
            个人
          </Button>
          <Search
            className="Search"
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            enterButton
          />

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

export default PagePrTagList;
