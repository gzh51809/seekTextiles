// 定义action中的type常量，方便后期统一管理
export const ADD_TO_USERINFO = 'ADD_TO_USERINFO';
export const ADD_TO_TOKEN = 'ADD_TO_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

// 增加recommend数据
export function addUserinfo(data){
    return {
        type:ADD_TO_USERINFO,
        payload:data
    }
}

// 增加token
export function addToken(data){
    return {
        type:ADD_TO_TOKEN,
        payload:data
    }
}
// 删除token
export function removeToken(){
    return {
        type:REMOVE_TOKEN
    }
}

// 统一导出，在组件中统一引入为 HOMEAction
// 调用状态更新提交 this.props.dispatch(homeAction.remove(id));
export default {
    addUserinfo,
    addToken,
    removeToken
}