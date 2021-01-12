import React, { useState, useEffect } from 'react';
import { Image, Layer } from 'react-konva';
import { ImgRegionToolDataType } from './data';
import useImage from 'use-image';

interface BaseImageProps {
  setImgRegionTool: (payload: any) => void;
  ImgToCenter: (data: any) => any;
  imgRegionTool?: ImgRegionToolDataType;
  stageRef: any;
  imgUrl: string;
}

const BaseImage: React.FC<BaseImageProps> = (props) => {
  const { imgRegionTool, setImgRegionTool, ImgToCenter, stageRef, imgUrl } = props;

  const [image] = useImage(imgUrl);

  const imgRef: any = React.useRef(null);

  useEffect(() => {
    console.log('加载图片...');
    // 判断加载图片是否成功
    if (!image) {
      return;
    }
    if (imgRegionTool) {
      let scale = 1;
      if (image.width > 640 || image.height > 480) {
        scale = Math.min(
          imgRegionTool.StageWidht / image.width,
          imgRegionTool.StageHeight / image.height,
        );
      }

      // 图片的宽高比
      // const ratio = image.width / image.height;

      const { x, y } = ImgToCenter({
        imageWidth: image.width,
        imageHeight: image.height,
        StageWidht: imgRegionTool.StageWidht / scale,
        StageHeight: imgRegionTool.StageHeight / scale,
      });

      setImgRegionTool({
        StageScale: scale,
        imageWidth: image.width,
        imageHeight: image.height,
        imageX: x,
        imageY: y,
      });

      stageRef.current.scaleX(scale);
      stageRef.current.scaleY(scale);

      imgRef.current.setAttrs({ x, y });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <Layer>
      <Image image={image} ref={imgRef} />
    </Layer>
  );
};

export default BaseImage;
