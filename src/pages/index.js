import React from 'react';
import { Link } from 'umi';
import 'antd/dist/antd.css';
import './index.css';
import titlepic from './static/cat.jpg';
import { Tabs } from 'antd';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Axios from 'axios';
import { history } from 'umi';

import { server_url } from '@/pages/Main/request.js';

const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

const Login = () => {
  class NormalLoginForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        nickname: 'gank',
        account: '',
        secret: '',
        type: '100',
      };
      this.UserLogin = this.UserLogin.bind(this);
    }

    getAccount = (e) => {
      this.setState(
        {
          account: e.target.value,
        },
        () => {
          console.log(this.state.account);
        },
      );
    };

    getSecret = (e) => {
      this.setState(
        {
          secret: e.target.value,
        },
        () => {
          console.log(this.state.secret);
        },
      );
    };

    UserLogin() {
      console.log('login');
      // console.log(this.state)
      let postdata = {
        account: this.state.account,
        password: this.state.secret,
        type: 100,
      };

      let _postdata = JSON.stringify(postdata);

      console.log(_postdata);

      axios({
        url: `${server_url}/token`,
        // url: "http://49.235.54.84:3000/mock/18/v1/token",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: postdata,
      }).then((res) => {
        // alert(res.data.msg);

        if (res.data.code === 200) {
          localStorage.token = res.data.token;
          console.log(window.btoa(localStorage.token));
          history.push('/main');
        } else {
          console.log(res);
          let error_str = '';
          // eslint-disable-next-line guard-for-in
          for (const object in res.data.msg) {
            error_str += object.toString();
            if (Array.isArray(res.data.msg[object])) {
              error_str += `:${res.data.msg[object][0]}`;
            }
          }
          message.error(error_str);
        }
      });
      // $.ajax({
      //     type: "POST",
      //     url: "http://223.4.179.3:83/v1/token",
      //     data: _postdata,
      //     contentType: "application/json",
      //     success: function(data) {
      //         console.log(data)
      //     },
      //     dataType: "json"
      // })
    }

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
            <div className="text">
              <font className="projectName" size="3" color="#0099ff">
                账号密码登录
              </font>
            </div>
            <br /> <br />
            <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入你的用户名！' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                  onChange={this.getAccount}
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入你的密码！' }]}>
                <Input
                  prefix={<LockOutlined className="site-form-aitem-icon" />}
                  type="password"
                  placeholder="密码"
                  onChange={this.getSecret}
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
                  登录
                  {/* <Link to='main'>登录</Link> */}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
  }
  return <NormalLoginForm />;
};

export default Login;
