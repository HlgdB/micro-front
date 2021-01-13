import { Effect, Reducer, Subscription } from 'umi';
import { getRemoveList, getSelfList } from './service';

export interface IndexModelType {
  namespace: 'mainlist';
  state: any;
  effects: {
    query: Effect;
    getRemoveList: Effect;
    getSelfList: Effect;
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
  namespace: 'mainlist',
  state: {
    allVideo: undefined,
    selfList: undefined,
  },
  effects: {
    *query({ payload }, { call, put }) {},
    *getRemoveList(action, { put, call }) {
      const data = yield call(getRemoveList);
      console.log(data);
      yield put({
        type: 'save',
        payload: { allVideo: data },
      });
    },
    *getSelfList(action, { put, call }) {
      const data = yield call(getSelfList);
      console.log(data);
      yield put({
        type: 'save',
        payload: { selfList: data },
      });
    },
    // *getDefaultList(action,{put,call}) {
    //     const data = yield call(getDefaultList);
    //     // console.log(data)
    //     yield put({
    //         type:'save',
    //         payload:data
    //     })
    // }
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
            type: 'getSelfList',
          });
        }
        // else if(pathname === '/main/MainPage_Tag'){
        //     dispatch({
        //         type: 'getDefaultList',
        //     })
        // }
      });
    },
  },
};
export default IndexModel;
