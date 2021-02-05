import { Breadcrumb, Button, Row, Col, Table, List, Select, Space, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import Canvas from './Canvas';
import { connect } from 'umi';
import request from '@/utils/request';

// const url = 'http://vjs.zencdn.net/v/oceans.mp4';
const scale = 0.3;
let time: any = 0;
let video_id: any = -1;

const { Option } = Select;

const Index = (props: any) => {
  const { videoTool, imgRegionTool, tags, dispatch, videoInfo } = props;
  const [img, setImg] = useState(undefined);

  useEffect(() => {
    if (videoInfo?.frames) {
      console.log('videoInfo', videoInfo);
      video_id = videoInfo.id;
      dispatch({
        type: 'videoTool/setScreenshots',
        payload: videoInfo.frames,
      });
    }
    return () => {};
  }, [videoInfo]);

  const childRef: any = React.useRef();

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>,
    },
    {
      title: '截图',
      dataIndex: 'pic',
      key: 'pic',
      render: (text: any, record: any) => (
        <img src={record?.frame_url || record?.pic} height={300 * scale} width={640 * scale} />
      ),
    },
    {
      title: '时间(s)',
      dataIndex: 'time',
      key: 'time',
      render: (text: any, record: any) => (
        <span>{parseFloat(record?.time_str) || record?.time}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              setImg(record.frame_url || record?.pic);
              // console.log("record", record);
              time = parseFloat(record?.time_str);
              video_id = record?.video_id;
              setTimeout(() => {
                if (imgRegionTool) {
                  dispatch({
                    type: 'imgRegionTool/setImgRegionTool',
                    payload: {
                      maxId: record?.frame_labels.length,
                      regions: record?.frame_labels.map((item: any, _index: number) => {
                        return { ...item, id: _index + 1 };
                      }),
                    },
                  });
                }
              }, 100);
            }}
          >
            标注
          </a>
          <a
            onClick={() => {
              // const arr = videoTool.screenShots.filter(
              //   (item: any) => item !== videoTool.screenShots[index],
              // );
              // // dispatch({
              // //   type: 'videoTool/setScreenshots',
              // //   payload: arr.slice()
              // // });
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  const captureImage = () => {
    const video = document.getElementById('video');

    const canvas = document.createElement('canvas');

    video?.pause();

    canvas.width = 640 * scale;
    canvas.height = 300 * scale;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

    dispatch({
      type: 'videoTool/setVideoMark',
      payload: {
        video_id,
        time: video?.currentTime,
        frame_labels: imgRegionTool.regions,
      },
    }).then(() => {
      request(`/video/mark/${video_id}`, {
        method: 'get',
      }).then((save_res: any) => {
        // console.log(save_res);
        dispatch({
          type: 'global/setVideo',
          payload: { ...videoInfo, frames: save_res?.frames_info },
        });
      });
    });
  };

  return (
    <div style={{ width: '100%', padding: 20 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>活体检测</Breadcrumb.Item>
        <Breadcrumb.Item>视频工具</Breadcrumb.Item>
      </Breadcrumb>
      <div
        id="header-nav"
        style={{
          padding: 12,
          // width: 800,
          border: '1px solid #d9d9d9',
          marginBottom: 10,
          backgroundColor: 'white',
        }}
      >
        <Space>
          <Button type="primary" onClick={captureImage}>
            截图
          </Button>
        </Space>
      </div>
      <Row gutter={16} style={{ backgroundColor: 'white' }}>
        <Col span={12} style={{ marginTop: 16, marginBottom: 16 }}>
          <div style={{ height: 300 }}>
            <video id="video" controls={true} crossOrigin="anonymous" height="100%" width="100%">
              <source src={videoInfo?.video_url} />
            </video>
          </div>
        </Col>
        <Col span={12} style={{ marginTop: 16, marginBottom: 16 }}>
          <div style={{ height: 300, overflowY: 'auto', borderBottom: '1px solid #d9d9d9' }}>
            <Table
              columns={columns}
              dataSource={videoTool?.screenShots}
              pagination={false}
              bordered
            />
          </div>
        </Col>
      </Row>

      <div
        style={{
          padding: 12,
          // width: 800,
          border: '1px solid #d9d9d9',
          marginTop: 16,
          marginBottom: 10,
          backgroundColor: 'white',
        }}
      >
        <Space>
          <Button
            type="primary"
            onClick={() => {
              childRef.current.resetImg();
            }}
          >
            重置
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'imgRegionTool/setImgRegionTool',
                payload: {
                  toolState: 'default',
                },
              });
            }}
          >
            移动
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'imgRegionTool/setImgRegionTool',
                payload: {
                  toolState: 'region',
                },
              });
            }}
          >
            选区
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'videoTool/setVideoMark',
                payload: {
                  video_id,
                  time,
                  frame_labels: imgRegionTool.regions,
                },
              }).then(() => {
                request(`/video/mark/${video_id}`, {
                  method: 'get',
                }).then((save_res: any) => {
                  // console.log(save_res);
                  dispatch({
                    type: 'global/setVideo',
                    payload: { ...videoInfo, frames: save_res?.frames_info },
                  });
                });
              });
            }}
          >
            保存
          </Button>
          选区粗细:
          <InputNumber
            value={imgRegionTool?.regionsStrokeWidth}
            onChange={(e) => {
              console.log('e', e);
              if (imgRegionTool) {
                dispatch({
                  type: 'imgRegionTool/setImgRegionTool',
                  payload: { regionsStrokeWidth: e },
                });
              }
            }}
          />
          选区字体大小:
          <InputNumber
            value={imgRegionTool?.regionsFontSize}
            onChange={(e) => {
              console.log('e', e);
              if (imgRegionTool) {
                dispatch({
                  type: 'imgRegionTool/setImgRegionTool',
                  payload: { regionsFontSize: e },
                });
              }
            }}
          />
        </Space>
      </div>

      <Row gutter={16} style={{ height: 520, backgroundColor: 'white', marginTop: 16 }}>
        <Col span={12.5} style={{ marginTop: 20 }}>
          <Canvas ref={childRef} imgUrl={img} stageAttribute={{ width: 640, height: 480 }} />
        </Col>

        <Col
          span={11}
          style={{
            height: 480,
            overflowX: 'hidden',
            overflowY: 'auto',
            marginTop: 20,
          }}
        >
          <List
            header={<div>选区</div>}
            bordered
            dataSource={imgRegionTool?.regions}
            // style={{height: 480}}
            renderItem={(region: any, index: number) => (
              <List.Item>
                <span style={{ width: 40 }}>{index + 1}</span>
                <Select
                  style={{ width: 350 }}
                  placeholder="选择微生物"
                  value={region.name}
                  onChange={(e) => {
                    // console.log(e);
                    if (imgRegionTool) {
                      region.name = e;
                      imgRegionTool.regions[index] = region;
                      dispatch({
                        type: 'imgRegionTool/setImgRegionTool',
                        payload: { regions: imgRegionTool.regions },
                      });
                    }
                  }}
                >
                  {tags?.map((item: any) => {
                    return <Option value={item.name}>{item.name}</Option>;
                  })}
                </Select>
                <Button
                  onClick={() => {
                    if (imgRegionTool) {
                      imgRegionTool.regions.splice(index, 1);
                      dispatch({
                        type: 'imgRegionTool/setImgRegionTool',
                        payload: { regions: imgRegionTool.regions, maxId: imgRegionTool.maxId - 1 },
                      });
                    }
                  }}
                  style={{ marginLeft: 10 }}
                  type="primary"
                  danger
                >
                  删除
                </Button>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({
  videoTool,
  imgRegionTool,
  global,
}: {
  videoTool: any;
  imgRegionTool: any;
  global: any;
}) => {
  // console.log("videoTool", videoTool)
  return {
    videoTool,
    imgRegionTool: imgRegionTool.imgRegionTool,
    tags: imgRegionTool.tags,
    picsInfo: global.pics,
    videoInfo: global.video,
  };
};

export default connect(mapStateToProps)(Index);
