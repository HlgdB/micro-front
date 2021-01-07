/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/*
 * @Descripttion: 图片处理的组件
 * @Author: linkenzone
 * @Date: 2021-01-07 15:59:08
 */

import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';

interface PhotoToolProps {
  dispatch: Dispatch;
}

const PhotoTool: React.FC<PhotoToolProps> = (props) => {
  const { dispatch } = props;

  return (
    <div>
      <h1>图片处理工具</h1>
      <nav id="PhotoTool-header-nav"></nav>
      <div>
        <nav id="PhotoTool-header-nav"></nav>
        <div>图片</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('state', state);
  return {};
};

export default connect(mapStateToProps)(PhotoTool);
