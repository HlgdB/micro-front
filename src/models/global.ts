import { Effect, Reducer, Subscription } from 'umi';

export interface IndexModelType {
  namespace: 'global';
  state: any;
  effects: {
    setPics: Effect;
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
  },
  effects: {
    *setPics({ payload }, { put, call }) {
      // console.log(payload);
      const arr = [];
      arr.push(payload);
      console.log('pics array: ', arr);
      yield put({
        type: 'save',
        payload: { pics: arr },
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
      //       return history.listen(({ pathname }) => {
      //         if (pathname === '/fileList') {
      //           dispatch({
      //             type: 'getAllVideo',
      //           });
      //           dispatch({
      //             type: 'getAllPic',
      //           });
      //         }
      //       });
    },
  },
};
export default IndexModel;
