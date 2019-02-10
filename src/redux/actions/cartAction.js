// 定义action中的type常量，方便后期统一管理
export const ADD_TO_CUSTOMERCARTLIST = 'ADD_TO_CUSTOMERCARTLIST';
export const INIT_CUSTOMERCARTLIST = 'INIT_CUSTOMERCARTLIST';

// 增加购物车数据
export function addCustomerCartList(data){
    return {
        type:ADD_TO_CUSTOMERCARTLIST,
        payload:data
    }
}
// 初始化数据
export function initCustomerCartList(data){
    return {
        type:INIT_CUSTOMERCARTLIST,
        payload:data
    }
}


// 统一导出，在组件中统一引入为 HOMEAction
// 调用状态更新提交 this.props.dispatch(homeAction.remove(id));
export default {
    addCustomerCartList,
    initCustomerCartList
}