import 'antd/dist/antd.css';
import { Link } from 'umi';
import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Statistic, Row, Col } from 'antd';
import './PageResult.css';
import '../main.css';
import { Card, Avatar } from 'antd';
import { DatePicker, Space, Button } from 'antd';
import { List, Typography, Divider, Tag, Table } from 'antd';

const { RangePicker } = DatePicker;


let detectRes = { result: [] }
if (localStorage['detect_res'] != undefined) {
    detectRes = JSON.parse(localStorage['detect_res']);
}

const Picdata = [
    '文件名称: ' + detectRes.file_name,
    '创建时间: ' + detectRes.create_time,
    '类型: ' + '视频',
];

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '描述',
        dataIndex: 'describe',
        key: 'describe',
    },
    {
        title: '标签',
        key: 'label',
        dataIndex: 'label',
        render: tags => (
            <Tag color={'geekblue'}>
                {tags}
            </Tag>
        ),
    },
];

const data = [];
console.log()
for (let i = 0; i < detectRes.result.length; i++) {
    data.push({
        key: i,
        name: '名称' + (i + 1),
        describe: `${detectRes.result[i].frame_label[0].description}`,
        label: `${detectRes.result[i].frame_label[0].label_name}`
    });

}


class ShowPic extends React.Component {
    componentDidMount() {
        // for (let i = 0; i < detectRes.result.length; i++) {
        //     var $div = $("<div></div>");
        //     $div.attr('class', 'swiper-slide');
        //     $div.attr('style', "background-image:url(http://223.4.179.3/uploads/gank/" + detectRes.result[i].frame_url.split('/')[6] + ")");
        //     $('#galleryTop').append($div);
        //     var $div2 = $("<div></div>");
        //     $div2.attr('class', 'swiper-slide');
        //     $div2.attr('style', "background-image:url(http://223.4.179.3/uploads/gank/" + detectRes.result[i].frame_url.split('/')[6] + ")");
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
    }

    render() {
        return (
            <div className="root">
                <div className="swiper-container gallery-top">
                    <div className="swiper-wrapper" id='galleryTop'>

                    </div>
                    <div className="swiper-button-next swiper-button-white"></div>
                    <div className="swiper-button-prev swiper-button-white"></div>
                </div>
                <div className="swiper-container gallery-thumbs">
                    <div className="swiper-wrapper" id="galleryThumbs">

                    </div>
                </div>
            </div>
        )
    }
}


class PageResult extends React.Component {
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

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { xScroll, yScroll, ...state } = this.state;
        const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>检测列表</Breadcrumb.Item>
                    <Breadcrumb.Item>检测结果</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content" style={{ padding: 24, minHeight: 360 }}>
                    <div className="picture">
                        <ShowPic />
                    </div>
                    <div className="List_ifo_1">
                        <List
                            // className='List_ifo'
                            size="large"
                            bordered
                            dataSource={Picdata}
                            renderItem={item => <List.Item><h1>{item}</h1></List.Item>}
                        />


                    </div>

                    <Table
                        {...this.state}
                        style={{ marginTop: 550 }}
                        className="SourceData"
                        columns={columns} dataSource={data}
                    />
                    <br /><br />

                    <Button className="btn" id="btn1" type="primary">保存</Button>
                    <Button className="btn" id="btn2" type="primary"><Link to='/main/MainPage_SourceTag'>数据标注</Link></Button>
                    <Button className="btn" id="btn3" type="primary">返回</Button>
                </div>

            </div>
        );
    }
}

export default PageResult