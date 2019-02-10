// 引入action的type常量
import {
    ADD_TO_USERINFO,
    ADD_TO_TOKEN,
    REMOVE_TOKEN
} from '@/redux/actions/loginAction';

let defaultState = {
    userInfo:[
        {
            username:'lzw',
            psw:'a123456'
        },
        {
            username:'haha',
            psw:'a123456'
        },
    ],
    token:null
};
let reducer = function(state=defaultState,action){
    // state=defaultState为设置默认值
    // action的格式：{type:xxx,payload}
    // 实现设定的修改逻辑
    switch(action.type){
        // 增加userInfo数据
        case ADD_TO_USERINFO:
            // 传入新的用户信息到userInfo
            return {
                ...state,
                userInfo:state.userInfo.concat(action.payload)
            }
        case ADD_TO_TOKEN:
            // 传入token，格式为{token:'token'}
            return {
                ...state,
                token:action.payload.token
            }
        case REMOVE_TOKEN:
            // 传入token，格式为{token:'token'}
            return {
                ...state,
                token:null
            }
        default:
            return state;
    }
}
export default reducer;