import { Effect, Reducer, Subscription } from 'umi';
import { getUserInfo } from '../pages/service';

export interface IndexModelType {
  namespace: 'global';
  state: any;
  effects: {
    setPics: Effect;
    getUserInfo: Effect;
  };
  reducers: {
    save: Reducer;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
  namespace: 'global',
  state: {
    pics: [],
    userInfo: undefined,
  },
  effects: {
    *setPics({ payload }, { put }) {
      // console.log(payload);
      const arr = [];
      arr.push(payload);
      // console.log('pics array: ', arr);
      yield put({
        type: 'save',
        payload: { pics: arr },
      });
    },
    *getUserInfo(action, { put, call }) {
      const data = yield call(getUserInfo);
      yield put({
        type: 'save',
        payload: { userInfo: data },
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
      return history.listen(() => {
        dispatch({
          type: 'getUserInfo',
        });
      });
    },
  },
};
export default IndexModel;
