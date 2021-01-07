import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Statistic, Row, Col } from 'antd';
import './main.css';
import titlepic from '../static/cat.jpg'
import { Card, Avatar, List } from 'antd';
import { connect } from 'umi';
const { Meta } = Card;


const MainList = (mainlist) => {

  class Mainpage extends React.Component {
    state = {
      collapsed: false,
      file_num: 0,
      checked_num: 0,
      updata_num: 0,
      data: []
    };

    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };

    test = (e) => {
      console.log(e)
    }

    componentDidMount() {
      // console.log(mainlist)
      if (mainlist.mainlist != undefined) {
        this.setState({
          data: mainlist.mainlist.data
        })
      };
    }

    render() {
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
                  <p className="projectName">用户名：喵喵喵</p>
                  <p className="projectName">邮箱：yingying@yy.com</p>
                </div>
                <Col className="data" span={2}>
                  <Statistic title="文件数" value={this.state.file_num} />
                </Col>
                <Col className="data" span={2}>
                  <Statistic title="已检测" value={this.state.checked_num} />
                </Col>
                <Col className="data" span={2}>
                  <Statistic title="自己上传" value={this.state.updata_num} />
                </Col>
              </Row>
            </div>
            <br />
            <br />
            <div className="site_card_wrapper">
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={this.state.data}
                renderItem={item => (
                  <List.Item>
                    <Card
                      style={{ width: 350 }}
                      actions={[
                        // <SettingOutlined key="setting" />,
                        // <EditOutlined key="edit" />,
                        <p onClick={this.test}>编辑</p>,
                        <p>删除</p>
                      ]}
                    >
                      <Meta className="Cardtitle"
                        avatar={<Avatar src={titlepic} />}
                        title={item.file_name}
                        description={item.file_pure_label[0]}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
            <br />
            <br />
          </div>

        </div>
      );
    }
  }
  return (
    <div>
      <Mainpage />
    </div>
  )
}

const mapStateToProps = ({ mainlist }) => {
  console.log(mainlist)
  return {
    mainlist
  };
}

export default connect(mapStateToProps)(MainList)