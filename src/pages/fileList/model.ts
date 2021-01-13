import { Effect, Reducer, Subscription } from 'umi';
import { getAllVideo, getSelfVideo, getOthersVideo, getAllPic } from './service';

export interface IndexModelType {
  namespace: 'fileList';
  state: any;
  effects: {
    getAllVideo: Effect;
    getSelfVideo: Effect;
    getOthersVideo: Effect;
    getAllPic: Effect;
    // getDefaultList: Effect;
  };
  reducers: {
    save: Reducer;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
  namespace: 'fileList',
  state: {
    videos: undefined,
    pics: undefined,
  },
  effects: {
    *getAllVideo(action, { put, call }) {
      const data = yield call(getAllVideo);
      console.log(data);
      yield put({
        type: 'save',
        payload: { videos: data },
      });
    },
    *getSelfVideo(action, { put, call }) {
      const data = yield call(getSelfVideo);
      console.log(data);
      yield put({
        type: 'save',
        payload: { videos: data },
      });
    },
    *getOthersVideo(action, { put, call }) {
      const data = yield call(getOthersVideo);
      console.log(data);
      yield put({
        type: 'save',
        payload: { videos: data },
      });
    },
    *getAllPic(action, { put, call }) {
      const data = yield call(getAllPic);
      console.log(data);
      yield put({
        type: 'save',
        payload: { pics: data },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/fileList') {
          dispatch({
            type: 'getAllVideo',
          });
          dispatch({
            type: 'getAllPic',
          });
        }
      });
    },
  },
};
export default IndexModel;
