import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import {
  Menu,
  Breadcrumb,
  Button,
  Table,
  Tabs,
  Drawer,
  Result,
  message,
  Tag,
  Popconfirm,
  notification,
  Alert,
} from 'antd';
import './Tag.css';
import { Input } from 'antd';
import { Dropdown } from 'antd';
import request from '@/utils/request';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';

const { Search } = Input;
const { TabPane } = Tabs;

const PageTag = (props) => {
  const { videos, pics, picLoading, videoLoading, dispatch, history } = props;
  const [tab_key, settabkey] = useState('1');
  const [visible, setvisible] = useState(false);

  // useEffect(()=>{

  // }, [])
  // console.log(pics);

  const SuccessDrawer = () => {
    return (
      <>
        <Drawer
          title="检测结果"
          placement="right"
          closable={false}
          onClose={() => {
            setvisible(false);
          }}
          visible={visible}
        >
          <Result
            status="success"
            title="检测成功!"
            extra={[
              <Button
                type="primary"
                onClick={() => {
                  history.push('/videoTool');
                }}
              >
                查看结果
              </Button>,
            ]}
          />
          ,
        </Drawer>
      </>
    );
  };

  const paginationProps = {
    defaultPageSize: 8,
  };

  const VideoPage = () => {
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [videodata, setvideodata] = useState(undefined);
    const [loading, setloading] = useState(false);

    useEffect(() => {
      if (!videodata) {
        setvideodata(videos);
      }
      return () => {};
    }, [videos]);

    const menu = (
      <Menu>
        <Menu.Item>
          <a
            onClick={() => {
              setloading(true);
              request(`/video/all`, {
                method: 'get',
              }).then((res) => {
                setvideodata(res);
                setloading(false);
              });
            }}
          >
            全部
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={() => {
              setloading(true);
              request(`/video/myself`, {
                method: 'get',
              }).then((res) => {
                setvideodata(res);
                setloading(false);
              });
            }}
          >
            自己上传
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            onClick={() => {
              setloading(true);
              request(`/video/others`, {
                method: 'get',
              }).then((res) => {
                setvideodata(res);
                setloading(false);
              });
            }}
          >
            他人上传
          </a>
        </Menu.Item>
        <Menu.Item disabled>
          <a target="_blank" rel="noopener noreferrer" href="#">
            已检测
          </a>
        </Menu.Item>
        <Menu.Item disabled>
          <a target="_blank" rel="noopener noreferrer" href="#">
            未检测
          </a>
        </Menu.Item>
      </Menu>
    );

    const onSearch = (value) => {
      setloading(true);
      if (value) {
        request(`/video/search_name/${value}`, {
          method: 'get',
        }).then((res) => {
          setvideodata(res);
          setloading(false);
        });
      } else {
        request(`/video/all`, {
          method: 'get',
        }).then((res) => {
          setvideodata(res);
          setloading(false);
        });
      }
    };

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
        render: (text) =>
          text === 1 ? (
            <Tag key={1} color={'green'}>
              已检测
            </Tag>
          ) : (
            <Tag key={0} color={'volcano'}>
              未检测
            </Tag>
          ),
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
            <a
              onClick={() => {
                setloading(true);
                request(`/video/mark/${record.id}`, {
                  method: 'get',
                }).then((res) => {
                  console.log('mark res', res);
                  if (res) {
                    dispatch({
                      type: 'global/setVideo',
                      payload: { ...record, frames: res?.frames_info, editable: 0 },
                    });
                    setloading(false);
                    history.push('/videoTool');
                  } else {
                    setloading(false);
                  }
                });
              }}
            >
              查看
            </a>
            <a
              onClick={() => {
                setloading(true);
                request(`/video/mark/${record.id}`, {
                  method: 'get',
                }).then((res) => {
                  // console.log("mark res", res);
                  if (res) {
                    if (res?.editable === 1) {
                      dispatch({
                        type: 'global/setVideo',
                        payload: { ...record, frames: res?.frames_info, editable: 1 },
                      });
                      setloading(false);
                      history.push('/videoTool');
                    } else {
                      setloading(false);
                      notification.error({
                        message: '无权限对此文件进行操作！',
                      });
                    }
                  } else {
                    setloading(false);
                  }
                });
              }}
            >
              标注
            </a>

            <Popconfirm
              title="已检测的视频再次检测会覆盖原先结果，确定检测吗？"
              onConfirm={() => {
                setloading(true);
                request(`/video/check/${record.id}`, {
                  method: 'get',
                }).then((res) => {
                  if (res) {
                    request(`/video/mark/${record.id}`, {
                      method: 'get',
                    }).then((_res) => {
                      dispatch({
                        type: 'global/setVideo',
                        payload: { ...record, frames: _res?.frames_info, editable: 0 },
                      });
                      setloading(false);
                      setvisible(true);
                    });
                  } else {
                    setloading(false);
                  }
                });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a>检测</a>
            </Popconfirm>

            <a
              onClick={() => {
                // console.log("record", record);
                setloading(true);
                request(`/video`, {
                  method: 'delete',
                  data: { ids: [record.id] },
                }).then((res) => {
                  dispatch({
                    type: 'fileList/getAllVideo',
                  }).then(() => {
                    setloading(false);
                  });
                  if (res) {
                    // console.log("indexof", res["无权限删除文件id："]?.indexOf(record.id))
                    if (res['无权限删除文件id：']?.indexOf(record.id) !== -1) {
                      message.warning('无权限删除此文件！');
                    } else {
                      message.success('删除视频文件成功！');
                    }
                  } else {
                    message.error('删除视频文件失败！');
                  }
                });
              }}
            >
              删除
            </a>
          </Space>
        ),
      },
    ];

    const onSelectChange = (selectedRowKeys_) => {
      setselectedRowKeys(selectedRowKeys_);
      // console.log(`selectedRowKeys: ${selectedRowKeys_}`);
    };

    const rowSelection = {
      onChange: onSelectChange,
      type: 'checkbox',
    };

    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, float: 'left', width: '100%' }}
      >
        <div style={{ float: 'left' }}>
          <DatePicker
            placeholder="选择日期"
            onChange={(date) => {
              setloading(true);
              if (date) {
                request(`/video/search_date/${date.format('YYYY-MM-DD')}`, {
                  method: 'get',
                }).then((res) => {
                  setvideodata(res);
                  setloading(false);
                });
              } else {
                request(`/video/all`, {
                  method: 'get',
                }).then((res) => {
                  setvideodata(res);
                  setloading(false);
                });
              }
            }}
          />
        </div>
        <div style={{ marginLeft: '76%' }}>
          <Search placeholder="输入关键字" allowClear enterButton="搜索" onSearch={onSearch} />
        </div>
        <div style={{ float: 'left' }}>
          <Popconfirm
            title="已检测的视频再次检测会覆盖原先结果，确定检测吗？"
            onConfirm={() => {
              setloading(true);
              // console.log("selectedRowKeys", selectedRowKeys)
              request('/video/checkAll', {
                method: 'POST',
                data: { id: selectedRowKeys },
              }).then((res) => {
                if (res) {
                  if (res['无权限检测文件id：']?.length > 0) {
                    message.success('一键检测成功，点击对应文件标注查看检测结果！');
                    message.warning('部分不是由您上传的文件无权限检测！');
                  } else {
                    message.success('一键检测成功，点击对应文件标注查看检测结果！');
                  }
                } else {
                  message.error('一键检测视频文件失败！');
                }
                dispatch({
                  type: 'fileList/getAllVideo',
                });
                setloading(false);
              });
            }}
          >
            <Button type="primary" style={{ marginTop: 10 }}>
              一键检测
            </Button>
          </Popconfirm>

          <Button
            style={{ marginTop: 10, marginLeft: '1rem' }}
            type="primary"
            onClick={() => {
              // console.log("record", record);
              setloading(true);
              request(`/video`, {
                method: 'delete',
                data: { ids: selectedRowKeys },
              }).then((res) => {
                dispatch({
                  type: 'fileList/getAllVideo',
                }).then(() => {
                  setloading(false);
                });
                if (res) {
                  if (res['无权限删除文件id：']?.length > 0) {
                    message.success('删除视频文件成功！');
                    message.warning('不是由您上传的部分文件无权限删除！');
                  } else {
                    message.success('删除视频文件成功！');
                  }
                } else {
                  message.error('删除视频文件失败！');
                }
              });
            }}
          >
            批量删除
          </Button>
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
          loading={loading || videoLoading}
          // onRow={(record) => ({})}
        />
      </div>
    );
  };

  const PicPage = () => {
    // const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [picdata, setpicdata] = useState(undefined);
    const [loading, setloading] = useState(false);

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
        render: (text) =>
          text === 1 ? (
            <Tag key={1} color={'green'}>
              已检测
            </Tag>
          ) : (
            <Tag key={0} color={'volcano'}>
              未检测
            </Tag>
          ),
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
            <a
              onClick={() => {
                // console.log(record);
                setloading(true);
                request(`/picture/${record.id}`, {
                  method: 'GET',
                }).then((res) => {
                  // console.log("pic info: ", res)
                  if (res) {
                    dispatch({
                      type: 'global/setPics',
                      payload: res,
                    }).then(() => {
                      setloading(false);
                    });
                    history.push('/imgRegionTool');
                  } else {
                    setloading(false);
                  }
                });
              }}
            >
              查看
            </a>
            <a
              onClick={() => {
                // console.log(record);
                setloading(true);
                request(`/picture/${record.id}`, {
                  method: 'GET',
                }).then((res) => {
                  // console.log("pic info: ", res);
                  if (res) {
                    if (res.editable === 1) {
                      dispatch({
                        type: 'global/setPics',
                        payload: res,
                      }).then(() => {
                        setloading(false);
                      });
                      history.push('/imgRegionTool');
                    } else {
                      setloading(false);
                      notification.error({
                        message: '无权限对此文件进行操作！',
                      });
                    }
                  } else {
                    setloading(false);
                  }
                });
              }}
            >
              标注
            </a>
            <a>检测</a>
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

    // const onSelectedRowKeysChange = (selectedRowKeys_) => {
    //   setselectedRowKeys({ selectedRowKeys_ });
    //   console.log(selectedRowKeys_);
    // };

    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: onSelectedRowKeysChange,
    // };

    return (
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, float: 'left', width: '100%' }}
      >
        <div style={{ float: 'left' }}>
          <DatePicker
            placeholder="选择日期"
            onChange={(date) => {
              setloading(true);
              if (date) {
                request(`/picture/search_date/${date.format('YYYY-MM-DD')}`, {
                  method: 'get',
                }).then((res) => {
                  setpicdata(res);
                  setloading(false);
                });
              } else {
                request(`/picture/all`, {
                  method: 'get',
                }).then((res) => {
                  setpicdata(res);
                  setloading(false);
                });
              }
            }}
          />
        </div>
        <div style={{ marginLeft: '76%' }}>
          <Search placeholder="输入关键字" allowClear enterButton="搜索" onSearch={onSearch} />
        </div>
        <Table
          columns={columns}
          dataSource={picdata}
          style={{ marginTop: 20 }}
          pagination={paginationProps}
          rowSelection={{}}
          loading={picLoading || loading}
          // onRow={(record) => ({})}
        />
      </div>
    );
  };

  function callback(key) {
    settabkey(key);
  }

  const Pages = () => (
    <Tabs onChange={callback} activeKey={tab_key}>
      <TabPane tab="图像" key="1">
        <PicPage />
      </TabPane>
      <TabPane tab="视频" key="2">
        <VideoPage />
      </TabPane>
    </Tabs>
  );

  return (
    <div style={{ width: '100%' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>活体检测</Breadcrumb.Item>
        <Breadcrumb.Item>检测列表</Breadcrumb.Item>
      </Breadcrumb>
      <Alert
        message="在本页面中查看所有上传的文件并对自己上传的进行操作。查看：查看对应文件信息但无法对其修改保存；标注：查看并对图片或视频中的微生物进行标注；检测：由系统对图片或视频进行微生物识别。"
        type="info"
      />
      <Pages />
      <SuccessDrawer />
    </div>
  );
};

const mapStateToProps = ({ fileList, loading }) => {
  // console.log('fileList', fileList);
  return {
    videos: fileList.videos,
    pics: fileList.pics,
    picLoading: loading.effects['fileList/getAllPic'],
    videoLoading: loading.effects['fileList/getAllVideo'],
  };
};

export default connect(mapStateToProps)(PageTag);
