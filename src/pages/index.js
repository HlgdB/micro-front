import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Statistic, Row, Col, Spin } from 'antd';
import './main.css';
import titlepic from './static/cat.jpg';
import { Card, Avatar, List } from 'antd';
import { connect } from 'umi';

const { Meta } = Card;

const MainList = (props) => {
  const { mainlist, loading } = props;

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
              <Statistic title="自己上传" value={mainlist.selfList?.length} />
            </Col>
          </Row>
        </div>
        <br />
        <br />
        <div className="site_card_wrapper">
          <Spin spinning={loading}>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={mainlist.selfList}
              renderItem={(item) => (
                <List.Item>
                  <Card style={{ width: 350 }}>
                    <Meta
                      className="Cardtitle"
                      avatar={<Avatar src={titlepic} />}
                      title={item.creator_name}
                      description={item.name}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Spin>
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
    loading: loading.effects['mainlist/getRemoveList'],
  };
};

export default connect(mapStateToProps)(MainList);
