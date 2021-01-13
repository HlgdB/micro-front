/*
 * @Descripttion: 图片区域选择器的数据模型
 * @Author: linkenzone
 * @Date: 2021-01-11 14:30:12
 */

import { Effect, Reducer } from 'umi';

import { ImgRegionToolDataType } from './data';

export interface StateType {
  imgRegionTool: ImgRegionToolDataType;
}

// 初始信息
const init_data = {
  regions: [],
  maxId: 0,
  toolState: 'default',
  regionsStrokeWidth: 8,
  regionsFontSize: 42,
};

export interface ModelType {
  namespace: string;
  state: StateType;
  // eslint-disable-next-line @typescript-eslint/ban-types
  effects: {};
  reducers: {
    save: Reducer<StateType>;
    setImgRegionTool: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'imgRegionTool',

  state: {
    imgRegionTool: init_data,
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    setImgRegionTool(state, { payload }) {
      if (state) {
        return { ...state, imgRegionTool: { ...state.imgRegionTool, ...payload } };
      }
      return { imgRegionTool: init_data };
    },
  },
};

export default Model;
