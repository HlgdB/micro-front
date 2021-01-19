import React, { useState, useEffect } from 'react';

import { Button, List, InputNumber, Space, Select, Breadcrumb } from 'antd';

import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ImgRegionToolDataType } from './data';

// import knightImg from '@/assets/knight.jpg';
// import RomaImg from '@/assets/Eastern_roman_empire_flag.png';
// import thrImg from '@/assets/13.jpg';

import Canvas from './Canvas';

const { Option } = Select;
// const imgList = [knightImg, RomaImg, thrImg];

interface ImgRegionToolProps {
  dispatch: Dispatch;
  imgRegionTool?: ImgRegionToolDataType;
  tags?: any;
  picsInfo?: any;
}

const ImgRegionToolDemo: React.FC<ImgRegionToolProps> = (props) => {
  const { imgRegionTool, dispatch, tags, picsInfo } = props;

  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    // console.log("picsInfo：", picsInfo);
    if (picsInfo && picsInfo.length > 0) {
      // console.log("photo_labels：", JSON.parse(picsInfo[imgIndex].photo_labels));
      dispatch({
        type: 'imgRegionTool/setImgRegionTool',
        payload: {
          regions: JSON.parse(picsInfo[imgIndex].photo_labels),
        },
      });
    }
  }, [picsInfo, imgIndex, dispatch]);

  const childRef: any = React.useRef();

  return (
    <div style={{ width: '100%', padding: 20 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>活体检测</Breadcrumb.Item>
        <Breadcrumb.Item>图片标注</Breadcrumb.Item>
      </Breadcrumb>
      <div
        id="header-nav"
        style={{
          padding: 12,
          width: 800,
          border: '1px solid #d9d9d9',
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
            onClick={() => {
              setImgIndex((imgIndex + 1) % picsInfo.length);
            }}
            disabled={!(picsInfo > 1)}
          >
            切换图片
          </Button>
          <Button
            type="primary"
            onClick={() => {
              dispatch({
                type: 'imgRegionTool/setPicMark',
                payload: {
                  photo_id: picsInfo[imgIndex]?.id,
                  photo_labels: JSON.stringify(imgRegionTool?.regions),
                },
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
      <div id="main_window" style={{ display: 'block', height: 520, backgroundColor: 'white' }}>
        <div
          id="right-panel"
          style={{ width: 640, marginRight: 20, marginLeft: 10, marginTop: 20, float: 'left' }}
        >
          <Canvas
            ref={childRef}
            imgUrl={picsInfo[imgIndex]?.photo_url}
            stageAttribute={{ width: 640, height: 480 }}
          />
        </div>

        <div
          id="Left-panel"
          style={{
            width: '45%',
            float: 'left',
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
                <span style={{ width: 40 }}>{region.id}</span>
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
                        payload: { regions: imgRegionTool.regions },
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ imgRegionTool, global }: { imgRegionTool: StateType; global: any }) => {
  // console.log(imgRegionTool)
  return {
    imgRegionTool: imgRegionTool.imgRegionTool,
    tags: imgRegionTool.tags,
    picsInfo: global.pics,
  };
};

export default connect(mapStateToProps)(ImgRegionToolDemo);
