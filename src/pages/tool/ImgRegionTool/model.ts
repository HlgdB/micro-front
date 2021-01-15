/*
 * @Descripttion: 图片区域选择器的数据模型
 * @Author: linkenzone
 * @Date: 2021-01-11 14:30:12
 */

import { EffectCoverflow } from 'swiper';
import { Effect, Reducer, Subscription } from 'umi';
import { getPrivateTag, getPublicTag } from '../../tagList/service';
import { ImgRegionToolDataType } from './data';

export interface StateType {
  imgRegionTool: ImgRegionToolDataType;
  tags: any;
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
  effects: {
    getPrivateTag: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    setImgRegionTool: Reducer<StateType>;
  };
  subscriptions: { setup: Subscription };
}

const Model: ModelType = {
  namespace: 'imgRegionTool',

  state: {
    imgRegionTool: init_data,
    tags: undefined,
  },

  effects: {
    *getPrivateTag(action, { put, call }) {
      const data = yield call(getPrivateTag);
      // console.log(data);
      yield put({
        type: 'save',
        payload: { tags: data },
      });
    },
  },

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

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/imgRegionTool') {
          dispatch({
            type: 'getPrivateTag',
          });
        }
      });
    },
  },
};

export default Model;
