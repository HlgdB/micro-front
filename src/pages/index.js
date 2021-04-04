import 'antd/dist/antd.css';
import { history } from 'umi';
import React, { useState } from 'react';
import { Breadcrumb, Statistic, Row, Col, Spin, Tabs } from 'antd';
import './main.css';
import { Card, Avatar, List } from 'antd';
import { VideoCameraOutlined, PictureOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import request from '@/utils/request';
import titlepic from '@/assets/cat.jpg';

const { Meta } = Card;
const { TabPane } = Tabs;

const MainList = (props) => {
  const { mainlist, videoLoading, dispatch } = props;
  const [vLoading, setvLoading] = useState(false);
  const [pLoading, setpLoading] = useState(false);

  return (
    <div style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>工作台</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="dataShow">
          <Row gutter={16}>
            <img className="Userpic" src={titlepic} alt="" />
            <div className="Usertext">
              <p className="projectName">{`用户名：${mainlist.userInfo?.nickname}`}</p>
              <p className="projectName">{`邮箱：${mainlist.userInfo?.email}`}</p>
            </div>
            <Col className="data" span={2}>
              <Statistic title="视频数" value={mainlist.allList?.length} />
            </Col>
            {/* <Col className="data" span={2}>
              <Statistic title="已检测" value={1} />
            </Col> */}
            <Col className="data" span={2}>
              <Statistic title="自己上传视频" value={mainlist.selfList?.length} />
            </Col>
            <Col className="data" span={2}>
              <Statistic title="图片数" value={mainlist.allPicList?.length} />
            </Col>
            <Col className="data" span={2}>
              <Statistic title="自己上传图片" value={mainlist.selfPicList?.length} />
            </Col>
          </Row>
        </div>
        <br />
        <br />
        <div className="site_card_wrapper">
          <Tabs defaultActiveKey="1" type="card">
            <TabPane
              tab={
                <span>
                  <VideoCameraOutlined />
                  视频
                </span>
              }
              key="1"
            >
              <Spin spinning={videoLoading || vLoading}>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={mainlist.selfList}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        style={{ width: 350 }}
                        actions={[
                          <a
                            onClick={() => {
                              setvLoading(true);
                              request(`/video/mark/${item.id}`, {
                                method: 'get',
                              }).then((res) => {
                                // console.log("mark res", res)
                                if (res) {
                                  dispatch({
                                    type: 'global/setVideo',
                                    payload: { ...item, frames: res?.frames_info, editable: 1 },
                                  });
                                  setvLoading(false);
                                  history.push('/videoTool');
                                } else {
                                  setvLoading(false);
                                  // message.warning("无权限对此文件操作！");
                                }
                              });
                            }}
                          >
                            标注
                          </a>,
                        ]}
                      >
                        <Meta
                          className="Cardtitle"
                          avatar={
                            <Avatar src="https://assets-kxwv3nawl-blnbin.vercel.app/micro/cat.jpg" />
                          }
                          title={item.creator_name}
                          description={item.name}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Spin>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <PictureOutlined />
                  图片
                </span>
              }
              key="2"
            >
              <Spin spinning={videoLoading || pLoading}>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={mainlist.selfPicList}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        style={{ width: 350 }}
                        actions={[
                          <a
                            onClick={() => {
                              setpLoading(true);
                              request(`/picture/${item.id}`, {
                                method: 'GET',
                              }).then((res) => {
                                // console.log("pic info: ", res)
                                dispatch({
                                  type: 'global/setPics',
                                  payload: res,
                                }).then(() => {
                                  setpLoading(false);
                                });
                                history.push('/imgRegionTool');
                              });
                            }}
                          >
                            标注
                          </a>,
                        ]}
                      >
                        <Meta
                          className="Cardtitle"
                          avatar={
                            <Avatar src="https://assets-kxwv3nawl-blnbin.vercel.app/micro/cat.jpg" />
                          }
                          title={item.creator_name}
                          description={item.name}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </Spin>
            </TabPane>
          </Tabs>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = ({ mainlist, loading }) => {
  // console.log(mainlist);
  return {
    mainlist,
    videoLoading: loading.effects['mainlist/getRemoveList'],
  };
};

export default connect(mapStateToProps)(MainList);
