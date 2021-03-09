import { Link, history } from 'umi';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './post.css';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import request from '@/utils/request';

class Post extends React.Component {
  render() {
    return (
      <div className="background">
        <div className="title">
          <img
            className="pic"
            src="https://assets-kxwv3nawl-blnbin.vercel.app/micro/cat.jpg"
            alt=""
          />

          <font className="projectName" size="5">
            {'     '.replace(/ /g, '\u00a0')}微生物活镜检测系统
          </font>
        </div>
        <div className="center-in-center">
          <font className="projectName" size="3" color="#0099ff">
            注册
          </font>
          <br />
          <br />
          <Form
            className="post-form"
            name="register"
            scrollToFirstError
            onFinish={(values) => {
              console.log('注册信息', { type: 100, ...values });
              request('/client/register', {
                method: 'POST',
                data: { type: 100, ...values },
              }).then((res) => {
                console.log('注册结果', res);
                if (res) {
                  message.success('注册成功！');
                  history.push('/user/login');
                } else {
                  message.error('注册失败，请检查用户名或邮箱是否重复！');
                }
              });
            }}
          >
            <Form.Item
              name="email"
              label=""
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
                {
                  type: 'email',
                  message: '邮箱格式错误',
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="注册邮箱" />
            </Form.Item>
            <Form.Item
              name="nickname"
              rules={[
                { required: true, message: '请输入你的用户名！' },
                {
                  pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                  message: '昵称包含4到16位(字母，数字,下划线,减号)',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="昵称" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入您的密码',
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}$/,
                  message: '密码至少包含1个大写字母，小写字母，数字和特殊字符!',
                },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="8到16位密码，区分大写小写" />
            </Form.Item>

            <Form.Item
              name="password2"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '确认密码',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('密码不一致！');
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
            </Form.Item>
            <div className="Btn">
              <Button className="PostBtn" type="primary" htmlType="submit">
                注册
              </Button>

              <Button className="PostBtn" type="link" block>
                <Link to="/user/login">使用已有账户登录</Link>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Post;
