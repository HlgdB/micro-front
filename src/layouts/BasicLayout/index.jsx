import 'antd/dist/antd.css';
import { Link, connect, history } from 'umi';
import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import style from './style.less';
import {
  TagOutlined,
  BulbOutlined,
  FolderOutlined,
  SlidersOutlined,
  HomeOutlined,
  BoxPlotOutlined,
  BookOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import CookieUtil from '@/utils/cookie.js';
import titlepic from '@/assets/cat.jpg';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayouts = (props) => {
  const { location, userInfo, dispatch } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed_) => {
    // console.log(collapsed_);
    setCollapsed(collapsed_);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            CookieUtil.unsetAll();
            history.push('/user/login');
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className={style.logo} />
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">首页</Link>
          </Menu.Item>

          <SubMenu key="sub1" icon={<FolderOutlined />} title="数据采集">
            <Menu.Item key="/upload">
              <Link to="/upload">文件上传</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<BulbOutlined />} title="检测与标注">
            <Menu.Item key="/fileList">
              <Link to="/fileList">文件列表</Link>
            </Menu.Item>
            {/* 
            <Menu.Item key="/imgRegionTool" disabled>
              <Link to="/imgRegionTool">图片标注</Link>
            </Menu.Item>

            <Menu.Item key="/videoTool" disabled>
              <Link to="/videoTool">视频标注</Link>
            </Menu.Item> */}

            {/* <Menu.Item key="/photoTool">
              <Link to="/photoTool">图片工具</Link>
            </Menu.Item> */}
          </SubMenu>
          <SubMenu key="sub3" icon={<TagOutlined />} title="标签管理">
            <Menu.Item key="/tagList">
              <Link to="/tagList">标签列表</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<SlidersOutlined />} title="性状分析"></SubMenu>
          <SubMenu key="sub5" icon={<BoxPlotOutlined />} title="指示作用"></SubMenu>
          <SubMenu key="sub6" icon={<BookOutlined />} title="微生物图谱"></SubMenu>
          <SubMenu key="sub7" icon={<OrderedListOutlined />} title="案例分析"></SubMenu>
          <SubMenu key="sub8" icon={<QuestionCircleOutlined />} title="使用帮助">
            <Menu.Item key="/help">
              <Link to="/help">流程说明</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className={style.site_layout}>
        <Header className={style.site_layout_background} style={{ padding: 0 }}>
          <div className="id" style={{ width: '100%' }}>
            <Dropdown overlay={menu} placement="bottomRight">
              <img className={style.titlepic} src={titlepic} alt="" />
            </Dropdown>
            <b style={{ marginRight: 16 }}>{userInfo?.nickname}</b>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>Micro-front web HUST-wanlin by hlgdb.</Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ global }) => {
  // console.log(mainlist);
  return {
    userInfo: global.userInfo,
  };
};

export default connect(mapStateToProps)(BasicLayouts);
