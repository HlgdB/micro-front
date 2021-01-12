import 'antd/dist/antd.css';
import { Link } from 'umi';
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import style from './style.less';
import titlepic from '@/assets/cat.jpg';
import { DesktopOutlined, TeamOutlined, FolderOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayouts = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={style.logo} />
        <Menu
          theme="dark"
          defaultSelectedKeys={['0']}
          mode="inline"
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        >
          <Menu.Item key="0">
            <Link to="/main">首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<FolderOutlined />} title="数据搜集">
            <Menu.Item key="1">
              <Link to="/main/MainPage_Upload">文件上传</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<FolderOutlined />} title="活体检测">
            <Menu.Item key="2">
              <Link to="/main/MainPage_Tag">检测列表</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/main/MianPage_showResult">检测结果</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/main/MainPage_SourceTag">数据标注</Link>
            </Menu.Item>

            <Menu.Item key="test_01">
              <Link to="/main/MainPage_PhotoTool">图片工具</Link>
            </Menu.Item>

            <Menu.Item key="test_02">
              <Link to="/main/MainPage_ImgRegionTool">图片工具v2</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<TeamOutlined />} title="标签管理">
            <Menu.Item key="5">
              <Link to="/main/MainPrivateTag">标签列表-个人</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/main/MainPublicTagList">标签列表-公共</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className={style.site_layout}>
        <Header className={style.site_layout_background} style={{ padding: 0 }}>
          <div className="id">
            <Link to="../">
              <img className={style.titlepic} src={titlepic} alt="" />
            </Link>
            用户名
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayouts;
