import { Effect, Reducer, Subscription } from 'umi';
import {
  getPrivateTag,
  searchPrivateTag,
  getPublicTag,
  modifyTag,
  addTag,
  searchPublicTag,
} from './service';

export interface IndexModelType {
  namespace: 'tagList';
  state: any;
  effects: {
    getPrivateTag: Effect;
    searchPrivateTag: Effect;
    getPublicTag: Effect;
    modifyTag: Effect;
    addTag: Effect;
    searchPublicTag: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
  namespace: 'tagList',
  state: {
    privateTag: undefined,
    publicTag: undefined,
  },
  effects: {
    *getPrivateTag(action, { put, call }) {
      const data = yield call(getPrivateTag);
      yield put({
        type: 'save',
        payload: { privateTag: data },
      });
    },
    *searchPrivateTag({ payload }, { put, call }) {
      const data = yield call(searchPrivateTag, payload);
      yield put({
        type: 'save',
        payload: { privateTag: data },
      });
    },
    *searchPublicTag({ payload }, { put, call }) {
      const data = yield call(searchPublicTag, payload);
      yield put({
        type: 'save',
        payload: { publicTag: data },
      });
    },
    *getPublicTag(action, { put, call }) {
      const data = yield call(getPublicTag);
      yield put({
        type: 'save',
        payload: { publicTag: data },
      });
    },
    *modifyTag({ payload }, { put, call }) {
      const data = yield call(modifyTag, payload);
      if (data) {
        console.log(data);
        yield put({
          type: 'getPrivateTag',
        });
        yield put({
          type: 'getPublicTag',
        });
      }
    },
    *addTag({ payload }, { put, call }) {
      const data = yield call(addTag, payload);
      if (data) {
        console.log(data);
        yield put({
          type: 'getPrivateTag',
        });
        yield put({
          type: 'getPublicTag',
        });
      }
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
        if (pathname === '/tagList') {
          dispatch({
            type: 'getPrivateTag',
          });
          dispatch({
            type: 'getPublicTag',
          });
        }
      });
    },
  },
};
export default IndexModel;
