import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import ImgRegionTool from '@/pages/tool/ImgRegionTool';

const PhotoToolTestPage: React.FC<[]> = (props) => {
  // const { dispatch } = props;

  return (
    <div>
      <ImgRegionTool />
    </div>
  );
};

export default PhotoToolTestPage;
