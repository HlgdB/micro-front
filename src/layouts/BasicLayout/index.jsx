import 'antd/dist/antd.css';
import { Link } from 'umi';
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import style from './style.less';
import titlepic from '@/assets/cat.jpg';
import { TagOutlined, BulbOutlined, FolderOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayouts = (props) => {
  const { location } = props;
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log('location', location);
    return () => {};
  }, [location]);

  const onCollapse = (collapsed_) => {
    console.log(collapsed_);
    setCollapsed(collapsed_);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={style.logo} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        >
          <Menu.Item key="/">
            <Link to="/">首页</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<FolderOutlined />} title="数据搜集">
            <Menu.Item key="/upload">
              <Link to="/upload">文件上传</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<BulbOutlined />} title="活体检测">
            <Menu.Item key="/fileList">
              <Link to="/fileList">检测列表</Link>
            </Menu.Item>

            <Menu.Item key="/imgRegionTool">
              <Link to="/imgRegionTool">图片标注</Link>
            </Menu.Item>

            <Menu.Item key="/showResult" disabled>
              <Link to="/showResult">×检测结果</Link>
            </Menu.Item>

            {/* <Menu.Item key="/photoTool">
              <Link to="/photoTool">图片工具</Link>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub3" icon={<TagOutlined />} title="标签管理">
            <Menu.Item key="/tagList">
              <Link to="/tagList">标签列表</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className={style.site_layout}>
        <Header className={style.site_layout_background} style={{ padding: 0 }}>
          <div className="id" style={{ width: '100%' }}>
            <Link to="/user/login">
              <img className={style.titlepic} src={titlepic} alt="" />
            </Link>
            用户名
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>Micro-front web HUST-wanlin by hlgdb</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayouts;
