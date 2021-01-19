import { Effect, Reducer, Subscription } from 'umi';
import { getRemoveList, getSelfList, getUserInfo } from './service';

export interface IndexModelType {
  namespace: 'mainlist';
  state: any;
  effects: {
    // query: Effect;
    getRemoveList: Effect;
    getSelfList: Effect;
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
  namespace: 'mainlist',
  state: {
    allList: undefined,
    selfList: undefined,
    userInfo: undefined,
  },
  effects: {
    // *query({ payload }, { call, put }) {},
    *getRemoveList(action, { put, call }) {
      const data = yield call(getRemoveList);
      yield put({
        type: 'save',
        payload: { allList: data },
      });
    },
    *getSelfList(action, { put, call }) {
      const data = yield call(getSelfList);
      yield put({
        type: 'save',
        payload: { selfList: data },
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
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'getRemoveList',
          });
          dispatch({
            type: 'getUserInfo',
          });
        }
      });
    },
  },
};
export default IndexModel;
