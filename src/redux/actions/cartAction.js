// 定义action中的type常量，方便后期统一管理
export const ADD_TO_CUSTOMERCARTLIST = 'ADD_TO_CUSTOMERCARTLIST';
export const INIT_CUSTOMERCARTLIST = 'INIT_CUSTOMERCARTLIST';
export const SELECTE_ITEM_IN_CUSTOMERCARTLIST = 'SELECTE_ITEM_IN_CUSTOMERCARTLIST';
export const SELECTE_STORE_IN_CUSTOMERCARTLIST = 'SELECTE_STORE_IN_CUSTOMERCARTLIST';
export const SELECTE_ALL_IN_CUSTOMERCARTLIST = 'SELECTE_ALL_IN_CUSTOMERCARTLIST';
export const CHANGE_NUM_IN_CUSTOMERCARTLIST = 'CHANGE_NUM_IN_CUSTOMERCARTLIST';
export const DELETE_ITEM_IN_CUSTOMERCARTLIST = 'DELETE_ITEM_IN_CUSTOMERCARTLIST';

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
// 选中单个商品
export function selecteItemInCart(data){
    return {
        type:SELECTE_ITEM_IN_CUSTOMERCARTLIST,
        payload:data
    }
}
// 选中单个店铺
export function selecteStoreInCart(data){
    return {
        type:SELECTE_STORE_IN_CUSTOMERCARTLIST,
        payload:data
    }
}
// 选中单个店铺
export function selecteAllInCart(data){
    return {
        type:SELECTE_ALL_IN_CUSTOMERCARTLIST,
        payload:data
    }
}
// 修改商品数量
export function changeNumInCart(data){
    return {
        type:CHANGE_NUM_IN_CUSTOMERCARTLIST,
        payload:data
    }
}
// 删除商品
export function deleteItemInCart(data){
    return {
        type:DELETE_ITEM_IN_CUSTOMERCARTLIST,
        payload:data
    }
}


// 统一导出，在组件中统一引入为 HOMEAction
// 调用状态更新提交 this.props.dispatch(homeAction.remove(id));
export default {
    addCustomerCartList,
    initCustomerCartList,
    selecteItemInCart,
    selecteStoreInCart,
    selecteAllInCart,
    changeNumInCart,
    deleteItemInCart
}