import React from 'react';
import { Link, history, connect } from 'umi';
import 'antd/dist/antd.css';
import './Login.css';
import titlepic from '@/assets/cat.jpg';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const NormalLoginForm = (props) => {
  const { dispatch } = props;

  const onFinish = (values) => {
    dispatch({
      type: 'login/login',
      payload: values,
    }).then((res) => {
      // console.log(res);
      if (res) {
        history.push('/');
      } else {
        message.error('登录失败！');
      }
    });
  };

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
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="account"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
              {
                pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                message: '用户名格式错误！',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
              id="account"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                message: '密码至少包含数字和英文，长度6-20!',
              },
            ]}
          >
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
            <span className="login-form-forgot">
              <Link to="">忘记密码</Link>
            </span>
            <span className="login-form-forgot">&nbsp;&nbsp;</span>
            <span className="login-form-forgot">
              <Link to="/user/post">注册账户</Link>
            </span>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              {/* <Link to='main'>登录</Link>  */}
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(NormalLoginForm);
