import BasicLayouts from './BasicLayout';
import React from 'react';

const index = (props) => {
  const { location } = props;
  const { pathname } = location;
  // console.log(pathname);
  if (pathname.search('/user') === -1) {
    return <BasicLayouts {...props} />;
  }
  if (pathname.search('/user') !== -1) {
    return props.children;
  }
};

export default index;
