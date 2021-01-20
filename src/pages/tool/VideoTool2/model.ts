import { Effect, Reducer } from 'umi';

export interface IndexModelType {
  namespace: 'videoTool';
  state: any;
  effects: {
    setScreenshots: Effect;
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
      yield put({
        type: 'save',
        payload: { screenShots: payload },
      });
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
