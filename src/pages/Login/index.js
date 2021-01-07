import React from 'react';
import { Link } from 'umi';
import 'antd/dist/antd.css';
import './Login.css';
import titlepic from '../static/cat.jpg';
import { Tabs } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { axios } from 'axios';
import { Avatar } from 'antd';
import { server_url } from '@/pages/Main/request.js';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}
class NormalLoginForm extends React.Component {
  UserLogin = () => {
    alert(1);
    console.log(document.getElementById('account').value);
    axios({
      url: `${server_url}/v1/token`,
      method: 'post',
      data: {
        account: document.getElementById('account').value,
        secret: document.getElementById('secret').value,
        type: 100,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="background">
        <div className="title">
          <img className="pic" src={titlepic} alt="" />

          <font className="projectName" size="5">
            {'     '.replace(/ /g, '\u00a0')}微生物活镜检测系统
          </font>
        </div>

        <div className="center-in-center">
          {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
          {/* <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Tab 1" key="1">
                </TabPane>
                <TabPane tab="Tab 1" key="2">
                </TabPane>
                <TabPane tab="Tab 1" key="3">
                </TabPane>
                </Tabs> */}
          <div className="text">
            <font className="projectName" size="3" color="#0099ff">
              账号密码登录
            </font>
          </div>
          <br /> <br />
          <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入你的用户名！' }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                id="account"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码！' }]}>
              <Input
                prefix={<LockOutlined className="site-form-aitem-icon" />}
                type="password"
                placeholder="密码"
                id="secret"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>自动登录</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              <a className="login-form-forgot">{'    '.replace(/ /g, '\u00a0')}</a>
              <a className="login-form-forgot">
                <Link to="post">注册账户</Link>
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.UserLogin}
              >
                {/* <Link to='main'>登录</Link>  */}
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default NormalLoginForm;
