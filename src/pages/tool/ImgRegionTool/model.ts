/*
 * @Descripttion: 图片区域选择器的数据模型
 * @Author: linkenzone
 * @Date: 2021-01-11 14:30:12
 */

// import { EffectCoverflow } from 'swiper';
import { setPicMark } from './service';
import { Effect, Reducer, Subscription } from 'umi';
import { getTag } from '../../tagList/service';
import { ImgRegionToolDataType } from './data';
import { message } from 'antd';

export interface StateType {
  imgRegionTool: ImgRegionToolDataType;
  tags: any;
  pics: any;
}

// 初始信息
const init_data = {
  regions: [],
  maxId: 0,
  toolState: 'default',
  regionsStrokeWidth: 3, // 选区线宽
  regionsFontSize: 21, // 选区字体大小
};

export interface ModelType {
  namespace: string;
  state: StateType;
  // eslint-disable-next-line @typescript-eslint/ban-types
  effects: {
    getTag: Effect;
    setPics: Effect;
    setPicMark: Effect;
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
    pics: [],
  },

  effects: {
    *getTag(action, { put, call }) {
      const data = yield call(getTag);
      // console.log(data);
      yield put({
        type: 'save',
        payload: { tags: data },
      });
    },
    *setPics({ payload }, { put }) {
      // console.log(payload);
      const arr = [];
      arr.push(payload);
      yield put({
        type: 'save',
        payload: { pics: arr },
      });
    },
    *setPicMark({ payload }, { call }) {
      const data = yield call(setPicMark, payload);
      if (data) {
        message.success('保存图片标注成功！');
      } else {
        message.error('保存图片标注失败！');
      }
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
            type: 'getTag',
          });
        }
      });
    },
  },
};

export default Model;
