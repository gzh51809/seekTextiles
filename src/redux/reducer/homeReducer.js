// 引入action的type常量
import {
    INIT_MAINDATAS
} from '@/redux/actions/homeAction';

let defaultState = {
    mainDatas:{banners:[],articles:{list:[{article_id: 1871,article_title: "快递停运时间"}]}},
    likeDatas:{}
};
let reducer = function(state=defaultState,action){
    // state=defaultState为设置默认值
    // action的格式：{type:xxx,payload}
    // 实现设定的修改逻辑
    switch(action.type){
        // 添加商品到购物车
        case INIT_MAINDATAS:
            // action:{type:'xxx',payload:{id,name,price}}
            return {
                ...state,
                mainDatas:action.payload
            }
        default:
            return state;
    }
}
export default reducer;