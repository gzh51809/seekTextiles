// 引入action的type常量
import {
    ADD_TO_CUSTOMERCARTLIST,
    INIT_CUSTOMERCARTLIST,
    SELECTE_ITEM_IN_CUSTOMERCARTLIST,
    SELECTE_STORE_IN_CUSTOMERCARTLIST,
    SELECTE_ALL_IN_CUSTOMERCARTLIST,
    CHANGE_NUM_IN_CUSTOMERCARTLIST,
    DELETE_ITEM_IN_CUSTOMERCARTLIST
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
        },
        {
            customer:'haha',
            isAllChecked: 0,
            cart_list:[]
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
                customerCartList:(function(){
                    let list = [...state.customerCartList];
                    let hasStore = false;
                    for(let i=0;i<list.length;i++){
                        if(list[i].store_id == action.payload.store_id){
                            hasStore = true;
                            let goodslist = [...list[i].goods_list];
                            let hasGoods = false;
                            for(let j=0;j<goodslist.length;j++){
                                // console.log(goodslist.goods_id,action.payload.goods_list[0].goods_id)
                                if(goodslist[j].goods_id==action.payload.goods_list[0].goods_id){
                                    hasGoods = true;
                                    goodslist[j].goods_num += action.payload.goods_list[0].goods_num;
                                }
                            }
                            if(!hasGoods){
                                goodslist.push(action.payload.goods_list[0]);
                            }
                            list[i].goods_list = goodslist;
                        }
                    }
                    if(!hasStore){
                        list.push(action.payload);
                    }
                    return list;
                }())
            }

        case INIT_CUSTOMERCARTLIST:
            // 传入cartData数据的datas
            return {
                ...state,
                customerCartList:action.payload
            }

        case SELECTE_ITEM_IN_CUSTOMERCARTLIST:
            // 传入需要修改的店铺index和商品idx
            return {
                ...state,
                customerCartList:(function(){
                    let {index,idx} = action.payload;
                    let list = [...state.customerCartList];
                    let _checked = !list[index].goods_list[idx].ischecked*1;
                    list[index].goods_list[idx].ischecked = _checked;
                    if(list[index].goods_list.every(item=>item.ischecked)){
                        list[index].allchecked = 1;
                    }else{
                        list[index].allchecked = 0;
                    }
                    return list;
                }())
            }

        case SELECTE_STORE_IN_CUSTOMERCARTLIST:
            // 传入需要修改的店铺index
            return {
                ...state,
                customerCartList:(function(){
                    let index = action.payload;
                    let list = [...state.customerCartList];
                    let _checked = !list[index].allchecked*1;
                    list[index].allchecked = _checked;
                    let newStore = list[index];
                    newStore.goods_list = newStore.goods_list.map(item=>{
                        item.ischecked=_checked;
                        return item
                    });
                    list.splice(index,1,newStore);
                    return list;
                }())
            }

        case SELECTE_ALL_IN_CUSTOMERCARTLIST:
            // 传入全选的checked
            return {
                ...state,
                customerCartList:(function(){
                    let _checked = action.payload;
                    let list = [...state.customerCartList.map(items=>{
                        items.allchecked = _checked;
                        items.goods_list = items.goods_list.map(item=>{
                            item.ischecked = _checked;
                            return item;
                        })
                        return items;
                    })]
                    return list;
                }())
            }

        case CHANGE_NUM_IN_CUSTOMERCARTLIST:
            // 传入需要修改的店铺index和商品idx
            return {
                ...state,
                customerCartList:(function(){
                    let {qty,index,idx} = action.payload;
                    let list = [...state.customerCartList];
                    list[index].goods_list[idx].goods_num = qty;
                    return list;
                }())
            }

            case DELETE_ITEM_IN_CUSTOMERCARTLIST:
            // 传入全选的checked
            return {
                ...state,
                customerCartList:(function(){
                    let {index,idx} = action.payload;
                    let list = [...state.customerCartList];
                    list[index].goods_list.splice(idx,1);
                    if(list[index].goods_list.length==0){
                        list.splice(index,1);
                    }
                    return list;
                }())
            }

        default:
            return state;
    }
}
export default reducer;