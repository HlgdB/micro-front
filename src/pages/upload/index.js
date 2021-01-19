import 'antd/dist/antd.css';
import React from 'react';
import { Breadcrumb } from 'antd';
import './Upload.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { Dragger } = Upload;

const showHeader = true;
const pagination = { position: 'bottom' };

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.bossk.top/v2/file/upload',
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      console.log(info);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  defaultFileList: [],
};

class PageUpload extends React.Component {
  state = {
    collapsed: false,
    bordered: true,
    loading: false,
    pagination,
    ellipsis: true,
    size: 'default',
    title: undefined,
    showHeader,
    rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomRight',
  };

  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>数据搜集</Breadcrumb.Item>
          <Breadcrumb.Item>文件上传</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 500 }}>
          <div className="Uploadlist">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
              <p className="ant-upload-hint">支持文件拓展名： .mp4 .jpg....</p>
            </Dragger>
          </div>
        </div>
      </div>
    );
  }
}

export default PageUpload;
