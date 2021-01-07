import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import {getRemoveList, getDefaultList} from './service';
export interface IndexModelState {
    name: string;
}
export interface IndexModelType {
    namespace: 'mainlist';
    state: IndexModelState;
    effects: {
        query: Effect;
        getRemove: Effect;
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
        name: '',
    },
    effects: {
        *query({ payload }, { call, put }) {
        },
        *getRemove(action,{put,call}) {
            const data = yield call(getRemoveList);
            // console.log(data)
            yield put({
                type:'save',
                payload:data
            })        
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
                if (pathname === '/main') {
                    dispatch({
                        type: 'getRemove',
                    })
                }
                // else if(pathname === '/main/MainPage_Tag'){
                //     dispatch({
                //         type: 'getDefaultList',
                //     })
                // }
            });
        }
    }
};
export default IndexModel;