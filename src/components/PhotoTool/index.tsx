/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/*
 * @Descripttion: 图片处理的组件,已经弃用
 * @Author: linkenzone
 * @Date: 2021-01-07 15:59:08
 */

import { Button, Divider } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './style.less';
import pic1 from '@/pages/static/pic1.png';

interface PhotoToolProps {
  dispatch: Dispatch;
}

// 坐标点的数据结构
interface Point {
  x: number;
  y: number;
}

const PhotoTool: React.FC<PhotoToolProps> = (props) => {
  const { dispatch } = props;

  const test_p1: Point = { x: 10, y: 20 };

  // 画布
  const canvasRef: any = useRef(null);
  const contextRef: any = useRef(null);
  const drawingBoardRef: any = useRef(null);
  const picRef: any = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [canvansSize, setCanvansSize] = useState({ width: 0, height: 0 });

  const [cursor, setCursor] = useState('default');

  const [tool, setTool] = useState<number | null>(null);

  const [p_list, setP_list] = useState<Point[]>([]);

  const [scale, setScale] = React.useState({ x: 1, y: 1 });

  // #region canvas帮助函数

  /**
   * @description: 绘制图片
   * @Param:
   * @param {any} image
   * @param {number} x
   * @param {number} y
   */
  const drawPic = (image: any, x: number, y: number) => {
    const imageObj = new Image();
    imageObj.src = 'https://i.pinimg.com/236x/d7/b3/cf/d7b3cfe04c2dc44400547ea6ef94ba35.jpg';
    contextRef.current.drawImage(imageObj, x, y);
  };

  /**
   * @description: 清除选区和画布
   * @Param:
   */
  const clear_selection = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    );

    // 清除所有的坐标点
    setP_list([]);
  };

  /**
   * @description: 通过坐标绘制点
   * @Param:
   * @param {Point} p
   */
  const drawPoint = (p: Point) => {
    contextRef.current.beginPath();
    // 圆的坐标 x , y ,圆的半径， 圆的起始角度和结束角度
    contextRef.current.arc(p.x, p.y, 4, 0, Math.PI * 2);
    contextRef.current.fill();
    contextRef.current.closePath();
  };

  /**
   * @description: 通过一系列坐标点，绘制点
   * @Param:
   * @param {Point} _p_list
   */
  const drawPointsLineByList = (_p_list: Point[]) => {
    if (_p_list.length > 0) {
      for (let i = 0; i < _p_list.length; ++i) {
        contextRef.current.beginPath();
        contextRef.current.arc(_p_list[i].x, _p_list[i].y, 4, 0, Math.PI * 2);
        contextRef.current.fill();
      }
    }

    contextRef.current.closePath();
  };

  /**
   * @description: 通过一系列坐标点，绘制直线
   * @Param:
   * @param {Point} _p_list
   */
  const drawStraightLineByList = (_p_list: Point[]) => {
    contextRef.current.beginPath();

    if (_p_list.length > 0) {
      contextRef.current.lineWidth = 0.6;
      contextRef.current.strokeStyle = '#111';
      contextRef.current.moveTo(_p_list[0].x, _p_list[0].y);
      for (let i = 1; i < _p_list.length; ++i) {
        contextRef.current.lineTo(_p_list[i].x, _p_list[i].y);
      }

      contextRef.current.stroke();
    }

    contextRef.current.closePath();
  };

  /**
   * @description: 通过一系列坐标点，绘制平滑曲线
   * @Param:
   * @param {Point} _p_list
   */
  const drawSmoothLineByList = (_p_list: Point[]) => {
    contextRef.current.beginPath();
    console.log('p_list', _p_list);

    if (_p_list.length > 0) {
      contextRef.current.lineWidth = 3;
      contextRef.current.strokeStyle = '#eee';
      contextRef.current.moveTo(_p_list[0].x, _p_list[0].y);

      let { x } = _p_list[0];
      let { y } = _p_list[0];

      for (let i = 0; i < _p_list.length; ++i) {
        const x2 = _p_list[i].x;
        const y2 = _p_list[i].y;

        const mx = (x + x2) / 2;
        const my = (y + y2) / 2;

        // 创建二次贝塞尔曲线
        contextRef.current.quadraticCurveTo(x, y, mx, my);

        x = x2;
        y = y2;
      }
    }
    contextRef.current.lineTo(_p_list[_p_list.length - 1].x, _p_list[_p_list.length - 1].y);
    contextRef.current.stroke();
    contextRef.current.closePath();
  };

  /**
   * @description: 通过2个坐标点，绘制直线
   * @Param:
   * @param {Point} a
   * @param {Point} b
   */
  const drawStraightLineByPoint = (a: Point, b: Point) => {
    contextRef.current.beginPath();

    if (a && b) {
      contextRef.current.lineWidth = 0.6;
      contextRef.current.strokeStyle = '#111';

      contextRef.current.moveTo(a.x, a.y);
      contextRef.current.lineTo(b.x, b.y);

      contextRef.current.stroke();
    }

    contextRef.current.closePath();
  };
  // #endregion

  // const startDrawing = ({ nativeEvent }: any) => {
  //   const { offsetX, offsetY } = nativeEvent;
  //   contextRef.current.beginPath();
  //   contextRef.current.moveTo(offsetX, offsetY);
  //   setIsDrawing(true);
  // };

  // const finishDrawing = () => {
  //   contextRef.current.closePath();
  //   setIsDrawing(false);
  // };

  // const draw = ({ nativeEvent }: any) => {
  //   if (isDrawing) {
  //     const { offsetX, offsetY } = nativeEvent;
  //     contextRef.current.lineTo(offsetX, offsetY);
  //     contextRef.current.stroke();
  //   }
  // };

  // 初始化函数
  useEffect(() => {
    const canvas: any = canvasRef.current;

    let context;
    if (canvas) {
      canvas.width = picRef.current.clientWidth;
      canvas.height = picRef.current.clientHeight;

      canvas.style.top = -picRef.current.clientHeight;

      context = canvas.getContext('2d');

      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 5;

      contextRef.current = context;
    } else {
      console.log('未找到canvasRef');
    }
  }, []);

  // #region 画布事件
  const canvas_onMouseDown = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    const p: Point = { x: offsetX, y: offsetY };

    drawPoint(p);

    if (p_list.length > 0) {
      const dis = Math.sqrt(
        (p_list[0].x - p.x) * (p_list[0].x - p.x) + (p_list[0].y - p.y) * (p_list[0].y - p.y),
      );
      console.log('dis', dis);
      if (dis < 10) {
        p_list.push(p_list[0]);
      } else {
        p_list.push(p);
      }
    } else {
      p_list.push(p);
    }

    setP_list(p_list);
    // if (p_list.length > 0) {
    //   drawStraightLineByPoint(p_list[p_list.length - 2], p);
    // }

    if (p_list.length > 0) {
      // 到起始点的距离

      // 清空画布
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      drawStraightLineByList(p_list);

      drawSmoothLineByList(p_list);

      drawPointsLineByList(p_list);
    }
  };

  const canvas_onMouseUp = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    const p: Point = { x: offsetX, y: offsetY };
  };

  const canvas_onMouseMove = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log('坐标', offsetX, offsetY);
    const p: Point = { x: offsetX, y: offsetY };
    if (p_list.length > 0) {
      const dis = Math.sqrt(
        (p_list[0].x - p.x) * (p_list[0].x - p.x) + (p_list[0].y - p.y) * (p_list[0].y - p.y),
      );
      console.log('与第一个点的距离', dis);
      if (dis < 10) {
        setCursor('pointer');
      } else {
        setCursor('default');
      }
    }
    console.log('坐标', offsetX, offsetY);
  };

  const canvas_onMouseOut = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    const p: Point = { x: offsetX, y: offsetY };
  };
  // #endregion

  return (
    <div style={{ width: '1000px' }}>
      {/* <h1>图片处理工具</h1> */}
      <nav id="PhotoTool-header-nav" className={styles.PhotoTool_header_nav}>
        <h1>图片处理工具</h1>
        <p>当前图片:</p>
        <Divider plain></Divider>
        <Button type="primary" onClick={clear_selection}>
          清除当前选区
        </Button>
      </nav>
      <div style={{ display: 'flex', minHeight: '600px' }}>
        <nav id="PhotoTool-left-nav" className={styles.PhotoTool_left_nav}>
          <Divider plain>选择工具</Divider>
          <Button type={tool === 1 ? 'primary' : 'default'} onClick={() => setTool(1)}>
            矩形选择工具
          </Button>
          <Button type={tool === 2 ? 'primary' : 'default'} onClick={() => setTool(2)}>
            圆形选择工具
          </Button>
          <Button type={tool === 3 ? 'primary' : 'default'} onClick={() => setTool(3)}>
            椭圆选择工具
          </Button>
          <Button type={tool === 4 ? 'primary' : 'default'} onClick={() => setTool(4)}>
            多边形选择工具
          </Button>
          <Button type={tool === 5 ? 'primary' : 'default'} onClick={() => setTool(5)}>
            多边形套索工具
          </Button>
        </nav>
        <div className={styles.PhotoTool_photo_content} ref={drawingBoardRef}>
          <div
            style={{
              width: '80%',
              margin: 'auto',
            }}
          >
            <img src={pic1} alt="pic" ref={picRef} className={styles.PhotoTool_pic} />

            <canvas
              id="PhotoTool-Canvas"
              ref={canvasRef}
              className={styles.PhotoTool_Canvas}
              onMouseDown={canvas_onMouseDown}
              onMouseUp={canvas_onMouseUp}
              onMouseMove={canvas_onMouseMove}
              onMouseOut={canvas_onMouseOut}
              style={{ cursor }}
            ></canvas>
          </div>

          {/* 绘制起始点 */}
          {/* {p_list.length > 0 ? (
            <div id="start-point" className={styles.PhotoTool_start_point}></div>
          ) : null} */}
        </div>
        <nav id="PhotoTool-right-nav" className={styles.PhotoTool_right_nav}>
          <Divider plain>选区属性</Divider>
        </nav>
      </div>
      <div id="PhotoTool-Console"></div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('state', state);
  return {};
};

export default connect(mapStateToProps)(PhotoTool);
