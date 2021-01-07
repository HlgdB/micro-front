import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import PhotoTool from '@/components/PhotoTool';

const PhotoToolTestPage: React.FC<[]> = (props) => {
  // const { dispatch } = props;

  return (
    <div>
      <PhotoTool />
    </div>
  );
};

export default PhotoToolTestPage;
