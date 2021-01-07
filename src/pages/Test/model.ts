import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getRemoveList} from './service';
export interface IndexModelState {
    name: string;
}
export interface IndexModelType {
    namespace: 'users';
    state: IndexModelState;
    effects: {
        query: Effect;
        getRemove: Effect;
    };
    reducers: {
        save: Reducer;
        // 启用 immer 之后
        // save: ImmerReducer<IndexModelState>;
    };
    subscriptions: { setup: Subscription };
}
const IndexModel: IndexModelType = {
    namespace: 'users',
    state: {
        name: '',
    },
    effects: {
        *query({ payload }, { call, put }) {
        },
        *getRemove(action,{put,call}) {
            const data = yield call(getRemoveList);
            console.log(data)
            yield put({
                type:'save',
                payload:data
            })
            
        }
    },
    reducers: {
        save(state, {payload}) {

            return payload;
        },
        // 启用 immer 之后
        // save(state, action) {
        //   state.name = action.payload;
        // },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/Test') {
                    dispatch({
                        type: 'getRemove',
                    })
                }
            });
        }
    }
};
export default IndexModel;