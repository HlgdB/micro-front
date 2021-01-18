import React, { useState, useEffect } from 'react';

import { Button, List, Input, InputNumber, Space, Select } from 'antd';

import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ImgRegionToolDataType } from './data';

import knightImg from '@/assets/knight.jpg';
import RomaImg from '@/assets/Eastern_roman_empire_flag.png';
import thrImg from '@/assets/13.jpg';

import Canvas from './Canvas';

const { Option } = Select;
const imgList = [knightImg, RomaImg, thrImg];

interface ImgRegionToolProps {
  dispatch: Dispatch;
  imgRegionTool?: ImgRegionToolDataType;
  tags?: any;
  picsUrl?: any;
}

const ImgRegionToolDemo: React.FC<ImgRegionToolProps> = (props) => {
  const { imgRegionTool, dispatch, tags, picsUrl } = props;

  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    console.log(tags, picsUrl);
  }, [tags, picsUrl]);

  const childRef: any = React.useRef();

  return (
    <div
      style={{ marginTop: 20, marginLeft: 20, width: 680, backgroundColor: 'white', padding: 20 }}
    >
      <Button
        onClick={() => {
          setImgIndex((imgIndex + 1) % picsUrl.length);
        }}
      >
        切换图片
      </Button>
      <div
        id="header-nav"
        style={{ padding: 12, width: 640, border: '1px solid #d9d9d9', marginBottom: 10 }}
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
          选区粗细
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
          选区字体大小
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
      <div id="main_window" style={{ display: 'block' }}>
        <div id="right-panel" style={{ width: 640, marginLeft: 0 }}>
          <Canvas
            ref={childRef}
            imgUrl={picsUrl[imgIndex]}
            stageAttribute={{ width: 640, height: 480 }}
          />
        </div>

        <div id="Left-panel" style={{ width: 640, marginTop: 8 }}>
          <List
            header={<div>选区</div>}
            bordered
            dataSource={imgRegionTool?.regions}
            renderItem={(region: any, index: number) => (
              <List.Item>
                <span style={{ width: 40 }}>{region.id}</span>
                {/* <Input
                  value={region.name}
                  onChange={(e) => {
                    console.log('e', e);
                    if (imgRegionTool) {
                      region.name = e.target.value;
                      imgRegionTool.regions[index] = region;
                      dispatch({
                        type: 'imgRegionTool/setImgRegionTool',
                        payload: { regions: imgRegionTool.regions },
                      });
                    }
                  }}
                /> */}
                <Select
                  style={{ width: 350 }}
                  placeholder="选择微生物"
                  onChange={(e) => {
                    console.log(e);
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
    picsUrl: global.pics,
  };
};

export default connect(mapStateToProps)(ImgRegionToolDemo);
