/*
 * @Descripttion: 创建一个画布
 * @Author: linkenzone
 * @Date: 2021-01-11 10:08:24
 */
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { connect, Dispatch } from 'umi';
import { StateType } from './model';
import { ImgRegionToolDataType } from './data';
import { Stage } from 'react-konva';

import BaseImage from './BaseImage';
import Regions from './Regions';

interface CanvasProps {
  dispatch: Dispatch;
  imgRegionTool?: ImgRegionToolDataType;
  imgUrl: string;
  stageAttribute: { width: number; height: number };
}

const Canvas: React.FC<CanvasProps> = (props, ref) => {
  const { imgRegionTool, dispatch, imgUrl, stageAttribute } = props;

  // 获取node
  const stageRef: any = React.useRef();

  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });

  const [isDrawing, setIsDrawing] = useState(false);

  const getRelativePointerPosition = (node: any) => {
    // 该函数将返回相对于所传递节点的指针位置;
    const transform = node.getAbsoluteTransform().copy();
    // 为了检测相对位置，我们需要进行逆变换
    transform.invert();
    // 获取指针(鼠标或触摸)位置
    const pos = node.getStage().getPointerPosition();
    // 现在我们求相对点
    return transform.point(pos);
  };

  /**
   * @description: 限制变量的范围
   * @param {any} stage
   * @param {any} newAttrs
   */
  const limitAttributes = (stage: any, newAttrs: any) => {
    const box = stage.findOne('Image').getClientRect();
    const minX = -box.width + stage.width() / 2;
    const maxX = stage.width() / 2;

    const x = Math.max(minX, Math.min(newAttrs.x, maxX));

    const minY = -box.height + stage.height() / 2;
    const maxY = stage.height() / 2;

    const y = Math.max(minY, Math.min(newAttrs.y, maxY));

    const scale = Math.max(0.05, newAttrs.scale);

    return { x, y, scale };
  };

  /**
   * @description: 将图片移动到中心
   * @param {any} param1
   */
  const ImgToCenter = ({ imageWidth, imageHeight, StageWidht, StageHeight }: any) => {
    return { x: (StageWidht - imageWidth) / 2, y: (StageHeight - imageHeight) / 2 };
  };

  /**
   * @description: 将坐标转换到图片的相对位置
   * @param {any} param1
   */
  const ToImgRelativePosition = ({ x, y }: any) => {
    const ImgRef = stageRef.current.findOne('Image');
    return { x: x - ImgRef.x(), y: y - ImgRef.y() };
  };

  /**
   * @description: 重置图片位置
   */
  const resetImg = () => {
    const imgRef = stageRef.current.findOne('Image');

    const imgWidth = imgRef.width();
    const imgHeight = imgRef.height();

    const stageWidth = stageRef.current.width();
    const stageHeight = stageRef.current.height();

    if (imgRegionTool) {
      let scale = 1;
      if (imgWidth > 640 || imgHeight > 480) {
        scale = Math.min(stageWidth / imgWidth, stageHeight / imgHeight);
      }

      const { x, y } = ImgToCenter({
        imageWidth: imgWidth,
        imageHeight: imgHeight,
        StageWidht: stageWidth / scale,
        StageHeight: stageHeight / scale,
      });

      // 重置图片的位置
      imgRef.setAttrs({ x, y });
      setImgPos({ x, y });

      stageRef.current.x(0);
      stageRef.current.y(0);
      stageRef.current.scaleX(scale);
      stageRef.current.scaleY(scale);

      stageRef.current.batchDraw();
    }
  };

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    resetImg: () => {
      resetImg();
    },
  }));

  /**
   * @description: 放大stage
   * @param {any} stage
   * @param {any} scaleBy
   * @param {number} duration
   */
  const zoomStage = (stage: any, scaleBy: any, duration: number) => {
    const oldScale = stage.scaleX();

    // 获取中点
    const midPos = {
      x: stage.width() / 2,
      y: stage.height() / 2,
    };
    const mousePointTo = {
      x: midPos.x / oldScale - stage.x() / oldScale,
      y: midPos.y / oldScale - stage.y() / oldScale,
    };
    const newScale = Math.max(0.05, oldScale * scaleBy);

    const newPos = {
      x: -(mousePointTo.x - midPos.x / newScale) * newScale,
      y: -(mousePointTo.y - midPos.y / newScale) * newScale,
    };

    // 限制变量的范围
    const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

    stage.to({
      x: newAttrs.x,
      y: newAttrs.y,
      scaleX: newAttrs.scale,
      scaleY: newAttrs.scale,
      duration,
    });

    // 更新 stage
    stage.batchDraw();
  };

  // 重置图片位置
  useEffect(() => {
    console.log('初次渲染');
    resetImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('变更图片地址');
    // 画布位置复原
    stageRef.current.x(0);
    stageRef.current.y(0);

    dispatch({
      type: 'imgRegionTool/setImgRegionTool',
      payload: {
        regions: [],
        maxId: 0,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl]);

  useEffect(() => {
    // const container = document.querySelector('.right-panel');
    console.log('imgRegionTool', imgRegionTool);
  }, [imgRegionTool]);

  return (
    <>
      <Stage
        ref={stageRef}
        draggable={imgRegionTool?.toolState === 'default'}
        width={stageAttribute.width}
        height={stageAttribute.height}
        style={{ boxShadow: '0 0 5px grey' }}
        onMouseDown={(e) => {
          if (imgRegionTool?.toolState !== 'region') {
            return;
          }
          setIsDrawing(true);
          // 获取相对坐标
          let point = getRelativePointerPosition(e.target.getStage());
          // 获取相对于图片的坐标
          point = ToImgRelativePosition(point);
          const region = {
            id: imgRegionTool.maxId + 1,
            name: `New Region${imgRegionTool.maxId + 1}`,
            points: [point],
          };

          dispatch({
            type: 'imgRegionTool/setImgRegionTool',
            payload: { regions: imgRegionTool?.regions.concat([region]) },
          });
        }}
        onMouseMove={(e) => {
          if (!isDrawing || imgRegionTool?.toolState !== 'region') {
            return;
          }
          if (imgRegionTool) {
            const lastRegion = { ...imgRegionTool.regions[imgRegionTool.regions.length - 1] };
            // 获取相对坐标
            let point = getRelativePointerPosition(e.target.getStage());
            // 获取相对于图片的坐标
            point = ToImgRelativePosition(point);
            lastRegion.points = lastRegion.points.concat([point]);
            // 删除最后一个区域
            imgRegionTool.regions.splice(imgRegionTool.regions.length - 1, 1);
            dispatch({
              type: 'imgRegionTool/setImgRegionTool',
              payload: { regions: imgRegionTool.regions.concat([lastRegion]) },
            });
          }
        }}
        onMouseUp={() => {
          if (!isDrawing || imgRegionTool?.toolState !== 'region') {
            return;
          }
          if (imgRegionTool) {
            const lastRegion = imgRegionTool.regions[imgRegionTool.regions.length - 1];
            setIsDrawing(false);
            // 如果不足3个点，则删除
            if (lastRegion.points.length < 3) {
              imgRegionTool.regions.splice(imgRegionTool.regions.length - 1, 1);
              dispatch({
                type: 'imgRegionTool/setImgRegionTool',
                payload: { regions: imgRegionTool.regions },
              });
            } else {
              // 每10个点进行采样
              let points = [lastRegion.points[0]];
              for (let i = 10; i < lastRegion.points.length; i += 10) {
                points = points.concat(lastRegion.points[i]);
              }
              const newlastRegion = { ...imgRegionTool.regions[imgRegionTool.regions.length - 1] };
              newlastRegion.points = points;
              // 删除最后一个区域
              imgRegionTool.regions.splice(imgRegionTool.regions.length - 1, 1);
              dispatch({
                type: 'imgRegionTool/setImgRegionTool',
                payload: {
                  regions: imgRegionTool.regions.concat([newlastRegion]),
                  maxId: imgRegionTool.maxId + 1,
                },
              });
            }
          }
        }}
        onWheel={(e: any) => {
          e.evt.preventDefault();
          if (e.evt.deltaY > 0) {
            zoomStage(stageRef.current, 0.8, 0.1);
          } else {
            zoomStage(stageRef.current, 1.2, 0.1);
          }
        }}
        onMouseEnter={(e: any) => {
          const container = e.target.getStage().container();
          if (imgRegionTool?.toolState === 'default') {
            container.style.cursor = 'move';
          } else {
            container.style.cursor = 'crosshair';
          }
        }}
        onMouseLeave={(e: any) => {
          const container = e.target.getStage().container();
          container.style.cursor = 'default';
        }}
      >
        <BaseImage
          imgUrl={imgUrl}
          ImgToCenter={ImgToCenter}
          stageRef={stageRef}
          setImgPos={({ x, y }) => setImgPos({ x, y })}
        />

        <Regions
          regions={imgRegionTool?.regions}
          imagePos={{ x: imgPos.x, y: imgPos.y }}
          regionAttribute={{
            strokeWidth: imgRegionTool ? imgRegionTool.regionsStrokeWidth : 8,
            fontSize: imgRegionTool ? imgRegionTool.regionsFontSize : 42,
          }}
        />
      </Stage>
      {/* <div className="zoom-container">
        <button
          onClick={() => {
            zoomStage(stageRef.current, 1.2, 0.1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            zoomStage(stageRef.current, 0.8, 0.1);
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            resetImg();
          }}
        >
          reset
        </button>
      </div> */}
    </>
  );
};

const mapStateToProps = ({ imgRegionTool }: { imgRegionTool: StateType }) => {
  return {
    imgRegionTool: imgRegionTool.imgRegionTool,
  };
};

export default connect(mapStateToProps, null, null, { forwardRef: true })(forwardRef(Canvas));
