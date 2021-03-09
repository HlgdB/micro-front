import { Effect, Reducer, Subscription } from 'umi';
import { getTag, searchTag, modifyTag, addTag } from './service';
import { message } from 'antd';

export interface IndexModelType {
  namespace: 'tagList';
  state: any;
  effects: {
    getTag: Effect;
    searchTag: Effect;
    modifyTag: Effect;
    addTag: Effect;
  };
  reducers: {
    save: Reducer;
  };
  subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
  namespace: 'tagList',
  state: {
    tags: undefined,
  },
  effects: {
    *getTag(action, { put, call }) {
      const data = yield call(getTag);
      yield put({
        type: 'save',
        payload: { tags: data },
      });
    },
    *searchTag({ payload }, { put, call }) {
      const data = yield call(searchTag, payload);
      yield put({
        type: 'save',
        payload: { tags: data },
      });
    },
    *modifyTag({ payload }, { put, call }) {
      const data = yield call(modifyTag, payload);
      if (data) {
        console.log(data);
        yield put({
          type: 'getTag',
        });
        message.success('修改成功！');
      } else {
        message.error('修改失败！');
      }
    },
    *addTag({ payload }, { put, call }) {
      const data = yield call(addTag, payload);
      if (data) {
        console.log(data);
        yield put({
          type: 'getTag',
        });
        message.success('新增标签成功！');
      } else {
        message.error('新增标签失败！');
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
            type: 'getTag',
          });
        }
      });
    },
  },
};
export default IndexModel;
