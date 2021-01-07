import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Statistic, Row, Col, Button, Table, Tag } from 'antd';
import './Tag.css';
import { Card, Avatar, Input } from 'antd';
import axios from 'axios'
import { Dropdown } from 'antd';
import request from '../request.js';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';

const PageTag = (mainlist) => {

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          全部
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
          自己上传
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">
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
    defaultPageSize: 4
  }


  class TagPage extends React.Component {
    state = {
      collapsed: false,
      selectedRowKeys: [],
      id: [],
      data: [],
      datalist: [],
      loading: false
    };

    componentDidMount() {
      request('http://223.4.179.3:83/v1/file/default', {
        method: 'get'
      }).then((response) => {
          console.log(response)
          // this.state.datalist = response.data;
          if(response){
            this.setState({
              data: response.data
            })
          }
          console.log(this.state.data)
        })

    }

    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };

    deleteTag(record) {

    }

    detectPic(record) {
      this.setState({
        loading: true
      })
      console.log(record);
      request("http://223.4.179.3:83/v1/file/check/" + record.id, {
        method: 'GET'
      })
        .then((response) => {
          console.log(response)
          localStorage['detect_res'] = JSON.stringify(response);
          window.location.replace('http://localhost:8000/main/MianPage_showResult');
          this.setState({
            loading: false
          });
        })
    }

    checkAll = () => {
      alert("选中的文件若已经存在标注信息，一键检测之后将会重置");
      console.log(this.state)
      axios({
        url: 'http://127.0.0.1:5000/2',
        method: "POST",
        data: {
          id: this.state.id
        }
      }).then(res => {
        console.log(res)
        alert(res.data.msg)
      })
    }
    selectRow = (record) => {
      const selectedRowKeys = [...this.state.selectedRowKeys];
      if (selectedRowKeys.indexOf(record.key) >= 0) {
        selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
      } else {
        selectedRowKeys.push(record.key);
      }
      this.setState({ selectedRowKeys });
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
      console.log(selectedRowKeys)
      this.setState({
        id: selectedRowKeys
      }, () => {
        console.log(this.state.id)
      })
    }

    render() {
      const columns = [
        {
          title: '应用名称',
          dataIndex: 'file_name',
          key: 'file_name',
          render: text => <a>{text}</a>,
        },
        {
          title: '检测状态',
          dataIndex: 'check_status',
          key: 'check_status',

        },
        {
          title: '类型',
          dataIndex: 'file_type',
          key: 'file_type',
        },
        {
          title: '创建时间',
          key: 'create_time',
          dataIndex: 'create_time',
        },
        {
          title: '上传者',
          key: 'creator',
          dataIndex: 'creator'
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.detectPic.bind(this, record)}>检测</a>
              <a >标志</a>
              <a onClick={this.deleteTag.bind(this, record)}>删除</a>
            </Space>
          ),
        },
      ];

      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectedRowKeysChange,
      };
      return (
        <div style={{ width: "100%" }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>活体检测</Breadcrumb.Item>
            <Breadcrumb.Item>检测列表</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, float: "left",width:"100%" }}>
            <div style={{float:"left"}}><DatePicker /></div>
            <div style={{marginLeft: "76%"}}><Input style={{ width: 300}} placeholder="搜索" /></div>
            <div style={{float:"left"}}>
              <Button style={{ marginTop: 10}}
                onClick={this.checkAll}
              >一键检测</Button>
            </div>
            <div style={{marginTop: 10,marginLeft:"94%"}}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  筛选目标 <DownOutlined />
                </a>
              </Dropdown>
            </div>
            <Table columns={columns} dataSource={this.state.data} style={{ marginTop: 20 }} pagination={paginationProps} rowSelection={rowSelection}
              loading={this.state.loading}
              onRow={(record) => ({

              })}
            />
          </div>

        </div>
      );
    }
  }

  return (
    <div>
      <TagPage />
    </div>
  )
}



export default PageTag