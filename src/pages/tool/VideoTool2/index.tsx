import { Breadcrumb, Button, Input, List } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'umi';

const url = 'http://vjs.zencdn.net/v/oceans.mp4';
const scale = 0.3;

const Index = (props: any) => {
  const { videoTool, dispatch } = props;

  useEffect(() => {
    console.log(videoTool);
    return () => {};
  }, [videoTool]);

  const captureImage = () => {
    const video = document.getElementById('video');

    const canvas = document.createElement('canvas');
    canvas.width = 640 * scale;
    canvas.height = 300 * scale;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const shotsArr = videoTool.screenShots;
    shotsArr.push(canvas.toDataURL('image/png'));

    dispatch({
      type: 'videoTool/setScreenshots',
      payload: shotsArr,
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
        <Button type="primary" onClick={captureImage}>
          截图
        </Button>
      </div>
      <div style={{ width: 640, height: 300 }}>
        <video id="video" controls={true} crossOrigin="anonymous" width="100%">
          <source src={url} />
        </video>
      </div>

      <div id="output"></div>
      <div style={{ width: 700 }}>
        <List
          bordered
          split
          header={<span>全部截图</span>}
          dataSource={videoTool?.screenShots}
          // pagination={{pageSize: 3}}
          renderItem={(record: any, index: any) => (
            <List.Item>
              <div>{index + 1}</div>
              <img src={record} height={300 * scale} width={640 * scale} />
              <Input style={{ width: 300 }}></Input>
              <Button
                type="primary"
                onClick={() => {
                  console.log('index', index);
                  const arr = videoTool.screenShots.filter(
                    (item: any) => item !== videoTool.screenShots[index],
                  );
                  dispatch({
                    type: 'videoTool/setScreenshots',
                    payload: arr,
                  });
                }}
              >
                删除
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ videoTool }: { videoTool: any }) => {
  return {
    videoTool,
  };
};

export default connect(mapStateToProps)(Index);
