/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Image, Layer } from 'react-konva';
import { ImgRegionToolDataType } from './data';
import useImage from 'use-image';

interface BaseImageProps {
  ImgToCenter: (data: any) => any;
  setImgPos: (data: any) => any;
  stageRef: any;
  imgUrl: string;
}

const BaseImage: React.FC<BaseImageProps> = (props) => {
  const { ImgToCenter, stageRef, imgUrl, setImgPos } = props;

  const [image] = useImage(imgUrl);

  const imgRef: any = React.useRef(null);

  useEffect(() => {
    console.log('加载图片...');
    // 判断加载图片是否成功
    if (!image) {
      return;
    }
    const stageWidth = stageRef.current.width();
    const stageHeight = stageRef.current.height();

    let scale = 1;
    if (image.width > 640 || image.height > 480) {
      scale = Math.min(stageWidth / image.width, stageHeight / image.height);
    }

    // 图片的宽高比
    // const ratio = image.width / image.height;

    const { x, y } = ImgToCenter({
      imageWidth: image.width,
      imageHeight: image.height,
      StageWidht: stageWidth / scale,
      StageHeight: stageHeight / scale,
    });

    // 切换画布的缩放
    stageRef.current.scaleX(scale);
    stageRef.current.scaleY(scale);
    // 设置图片的位置
    imgRef.current.setAttrs({ x, y });
    setImgPos({ x, y });

    // 重新渲染画布
    stageRef.current.batchDraw();
  }, [image]);

  return (
    <Layer>
      <Image image={image} ref={imgRef} />
    </Layer>
  );
};

export default BaseImage;
