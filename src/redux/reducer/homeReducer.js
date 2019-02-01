// 引入action的type常量
import {
    INIT_MAINDATAS,
    ADD_TO_RECOMDATAS,
    CLEAR_RECOMDATAS_LIST
} from '@/redux/actions/homeAction';

let defaultState = {
    mainDatas:{banners:[],articles:{list:[{article_id: 1871,article_title: "快递停运时间"}]},ranking:{list:[{item_title:'',item_list:[]}]},specials:[{specialitems:[{imageurl:''}]}]},
    recomDatas:{
        item_list:[{goods_id:4713149,goods_name:"2019新款北欧风小清新系列四件套-手机图 1.2m（4英尺）床 菠萝蜜",goods_price:"¥100.00",goods_image_url:"http://imgniu.zhaojiafang.com/store/goods/665/665_06021556354569824.jpg?imageView2/1/w/360/h/360/ignore-error/1/",subtitle:"红口鸭家纺",subtitle_background:"fee6e5",subtitle_fontcolor:"f5534c",href:"/common/goodsdetails/goodsdetail?zresource=n&param_goodsid=4713149"}],
        item_subtitle:"recommend",
        item_title:"秋冬·新品"
    }
};
let reducer = function(state=defaultState,action){
    // state=defaultState为设置默认值
    // action的格式：{type:xxx,payload}
    // 实现设定的修改逻辑
    switch(action.type){
        // 初始化mainDatas
        case INIT_MAINDATAS:
            // action:{type:'xxx',payload:{id,name,price}}
            return {
                ...state,
                mainDatas:action.payload
            }
        // 增加recommend数据
        case ADD_TO_RECOMDATAS:
            // 传入recommend数据的datas
            return {
                ...state,
                recomDatas:{
                    item_list:state.recomDatas.item_list.concat(action.payload.item_list),
                    item_title:action.payload.item_title,
                    item_subtitle:action.payload.item_subtitle
                }
            }
        // 清空recommend数据
        case CLEAR_RECOMDATAS_LIST:
            // 传入recommend数据的datas
            return {
                ...state,
                recomDatas:{
                    item_list:[],
                    item_title:"秋冬·新品",
                    item_subtitle:"recommend"
                }
            }
        default:
            return state;
    }
}
export default reducer;