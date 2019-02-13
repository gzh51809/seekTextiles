// 引入action的type常量
import {
    ADD_TO_CUSTOMERCARTLIST,
    INIT_CUSTOMERCARTLIST,
    SELECTE_ITEM_IN_CUSTOMERCARTLIST
} from '@/redux/actions/cartAction';

let defaultState = {
    cartData:[
        {
            customer:'lzw',
            isAllChecked: 0,
            cart_list:[
                {
                    store_id: 2585,
                    store_name: "薏思家纺",
                    allchecked: 0,
                    goods_list:[
                        {
                            cart_id: 1024501,
                            goods_id: 4632317,
                            goods_image_url: "http://imgniu.zhaojiafang.com/store/goods/2585/2585_06001702497126226.jpg?",
                            goods_name: "2019新款13372活性轻奢文艺风四件套 1.8m（6英尺）床 柠檬兔",
                            goods_num: 1,
                            goods_price: "¥135.00",
                            goods_subname: "商品副标题",
                            ischecked: 0
                        },
                    ]
                },
                {
                    store_id: 1683,
                    store_name: "艾晶美家纺",
                    allchecked: 0,
                    goods_list:[
                        {
                            cart_id: 1024519,
                            goods_id: 3900595,
                            goods_image_url: "http://imgniu.zhaojiafang.com/store/goods/1683/1683_05877560155126686.jpg",
                            goods_name: "2018冬款大版花四件套 1.5m（5英尺）床 山水牡丹",
                            goods_num: 1,
                            goods_price: "¥70.00",
                            goods_subname: "商品副标题",
                            ischecked: 0
                        },
                    ]
                },
            ]
        }
    ],
    customerCartList:[]
};
let reducer = function(state=defaultState,action){
    // state=defaultState为设置默认值
    // action的格式：{type:xxx,payload}
    // 实现设定的修改逻辑
    switch(action.type){
        // 添加购物车
        case ADD_TO_CUSTOMERCARTLIST:
            // 传入cartData数据的datas
            return {
                ...state,
                customerCartList:state.customerCartList.concat(action.payload)
            }
        case INIT_CUSTOMERCARTLIST:
            // 传入cartData数据的datas
            return {
                ...state,
                customerCartList:action.payload
            }
        case SELECTE_ITEM_IN_CUSTOMERCARTLIST:
            // 传入cartData数据的datas
            
                // let {index,idx} = action.payload;
                // let list = state.customerCartList;
                // let _checked = !list[index].goods_list[idx].ischecked*1;
                // list[index].goods_list[idx].ischecked = _checked;
                
            
            return {
                ...state,
                // customerCartList:list
                customerCartList:state.customerCartList.map((items,index)=>{
                    if(index==action.payload.index){
                        items.goods_list.map((item,idx)=>{
                            if(idx==action.payload.idx){
                                item.ischecked = !item.ischecked*1;
                            }
                            return item;
                        })
                    }
                    return items;
                })
                
            }
        default:
            return state;
    }
}
export default reducer;