// 定义action中的type常量，方便后期统一管理
export const INIT_MAINDATAS = 'INIT_MAINDATAS';

// 封装remove函数用于生成action对象{type:xxx,payload:{xxx:xx}}
export function init(data){
    return {
        type:INIT_MAINDATAS,
        payload:data
    }
}
// 统一导出，在组件中统一引入为 HOMEAction
// 调用状态更新提交 this.props.dispatch(homeAction.remove(id));
export default {
    init
}