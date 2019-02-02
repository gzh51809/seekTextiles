// 引入action的type常量
import {
    INIT_MAINDATAS,
    ADD_TO_RECOMDATAS,
    CLEAR_RECOMDATAS_LIST
} from '@/redux/actions/homeAction';

let defaultState = {
    mainDatas:{},
    recomDatas:{
        item_list:[],
        item_subtitle:"recommend",
        item_title:"秋冬·新品"
    },
    requestData:[
        {
            curpage: 1,
            timestamp: 1549092338039,
            Sign: 'cd501303c80457f728ee814e5b0ddd56'
        },
        {
            curpage: 2,
            timestamp: 1549092338039,
            Sign: 'ab25a337a6038d626a15c1ac76e63753'
        },
        {
            curpage: 3,
            timestamp: 1549092338039,
            Sign: '8297173d0b5400b25a51aceccd07a7f1'
        },
        {
            curpage: 4,
            timestamp: 1549092338039,
            Sign: '60ecb719cb7a0dcef73285d7f113e5f5'
        },
        {
            curpage: 5,
            timestamp: 1549092338039,
            Sign: '5670bdbca2227ff6480a370a7bd31ae0'
        },
        {
            curpage: 6,
            timestamp: 1549092338039,
            Sign: '9f08588ece1357d3a0515784f851f969'
        },
        {
            curpage: 7,
            timestamp: 1549092338039,
            Sign: '7921c31b13cd0152d339b506154c88a4'
        },
        {
            curpage: 8,
            timestamp: 1549092338039,
            Sign: '198c0f3206c5b4a5e05726a4f430f410'
        },
        {
            curpage: 9,
            timestamp: 1549092338039,
            Sign: '2973b5265ff017ac4fe2ba72b5d163f7'
        },
        {
            curpage: 10,
            timestamp: 1549092338039,
            Sign: '1bd536e07106f55bd9d17f805942c71e'
        },
    ]
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