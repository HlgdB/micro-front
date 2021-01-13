import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { Breadcrumb, Modal } from 'antd';
import './PageTag.css';
import pic1 from '@/assets/pic1.png';
import { Space, Button } from 'antd';
import { List, Tag, Table } from 'antd';

const Picdata = ['文件名称：阿巴阿巴阿巴', '创建时间：2020.2.30', '类型：图片'];

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '描述',
    dataIndex: 'describe',
    key: 'describe',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>操作 {record.key}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [];
for (let i = 1; i <= 30; i += 1) {
  data.push({
    key: i,
    name: `名称${i}`,
    describe: `第${i}个图片描述`,
  });
}

const ShowPic = () => {
  useEffect(() => {
    // for (let i = 1; i <= 10; i++) {
    //     var $div = $("<div></div>");
    //     $div.attr('class', 'swiper-slide');
    //     $div.attr('style', "background-image:url(http://112.124.18.109/M_test_images/nature-" + i + ".jpg)");
    //     $('#galleryTop').append($div);
    //     var $div2 = $("<div></div>");
    //     $div2.attr('class', 'swiper-slide');
    //     $div2.attr('style', "background-image:url(http://112.124.18.109/M_test_images/nature-" + i + ".jpg)");
    //     $('#galleryThumbs').append($div2);
    // }
    // var galleryThumbs = new Swiper('.gallery-thumbs', {
    //     spaceBetween: 10,
    //     slidesPerView: 4,
    //     loop: true,
    //     freeMode: true,
    //     loopedSlides: 5, //looped slides should be the same
    //     watchSlidesVisibility: true,
    //     watchSlidesProgress: true,
    // });
    // var galleryTop = new Swiper('.gallery-top', {
    //     spaceBetween: 10,
    //     loop: true,
    //     loopedSlides: 5, //looped slides should be the same
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    //     thumbs: {
    //         swiper: galleryThumbs,
    //     },
    // });
  }, [1]);

  return (
    <div className="root">
      <div className="swiper-container gallery-top">
        <div className="swiper-wrapper" id="galleryTop"></div>
        <div className="swiper-button-next swiper-button-white"></div>
        <div className="swiper-button-prev swiper-button-white"></div>
      </div>
      <div className="swiper-container gallery-thumbs">
        <div className="swiper-wrapper" id="galleryThumbs"></div>
      </div>
    </div>
  );
};

const AddLabel = () => {
  const [visible, setvisible] = useState(false);

  const showModal = () => {
    setvisible(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setvisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setvisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加标签
      </Button>
      <Modal title="添加标签" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ marginBottom: 10 }}>
          <img src={pic1} />
        </div>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
      </Modal>
    </div>
  );
};

class PageTag extends React.Component {
  state = {
    collapsed: false,
    bordered: false,
    loading: false,
    size: 'default',
    title: undefined,
    // rowSelection: {},
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomRight',
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { xScroll, yScroll, ...state } = this.state;
    const tableColumns = columns.map((item) => ({ ...item, ellipsis: state.ellipsis }));
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>活体检测</Breadcrumb.Item>
          <Breadcrumb.Item>数据标注</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ padding: 24, minHeight: 360 }}>
          {/* <img className="picture" src={pic1} /> */}
          <div className="picture">
            <ShowPic />
          </div>

          <div className="List_ifo_1">
            <List
              // className='List_ifo'
              size="small"
              style={{ width: 300 }}
              bordered
              dataSource={Picdata}
              renderItem={(item) => (
                <List.Item>
                  <h1>{item}</h1>
                </List.Item>
              )}
            />
          </div>
          <div className="Tags_1">
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="lime">lime</Tag>
            <AddLabel />
          </div>

          <div style={{ marginTop: 550 }}>
            <Table {...this.state} className="SourceData" columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default PageTag;
