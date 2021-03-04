import { message } from 'antd';
import { Effect, Reducer } from 'umi';
import { setVideoMark } from './service';

export interface IndexModelType {
  namespace: 'videoTool';
  state: any;
  effects: {
    setScreenshots: Effect;
    setVideoMark: Effect;
    setVideoMark_2: Effect;
  };
  reducers: {
    save: Reducer;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'videoTool',
  state: {
    screenShots: [],
  },
  effects: {
    *setScreenshots({ payload }, { put }) {
      // console.log(payload)
      yield put({
        type: 'save',
        payload: { screenShots: payload.slice() },
      });
    },
    *setVideoMark({ payload }, { call }) {
      const data = yield call(setVideoMark, payload);
      if (data) {
        message.success('保存标注成功！');
      } else {
        message.error('保存标注失败！');
      }
    },
    *setVideoMark_2({ payload }, { call }) {
      const data = yield call(setVideoMark, payload);
      if (data) {
        message.success('抽帧成功！');
      } else {
        message.error('抽帧失败！');
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      // console.log({ ...state, ...payload})
      return { ...state, ...payload };
    },
  },
};

export default IndexModel;
