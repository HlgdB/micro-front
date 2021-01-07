/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/*
 * @Descripttion: 图片处理的组件
 * @Author: linkenzone
 * @Date: 2021-01-07 15:59:08
 */

import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './style.less';

interface PhotoToolProps {
  dispatch: Dispatch;
}

const PhotoTool: React.FC<PhotoToolProps> = (props) => {
  const { dispatch } = props;

  return (
    <div>
      {/* <h1>图片处理工具</h1> */}
      <nav id="PhotoTool-header-nav" className={styles.PhotoTool_header_nav}></nav>
      <div style={{ display: 'flex' }}>
        <nav id="PhotoTool-left-nav" className={styles.PhotoTool_left_nav}></nav>
        <div className={styles.PhotoTool_photo_content}></div>
        <nav id="PhotoTool-right-nav" className={styles.PhotoTool_right_nav}></nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('state', state);
  return {};
};

export default connect(mapStateToProps)(PhotoTool);
