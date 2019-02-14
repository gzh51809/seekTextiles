import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';
import '@/sass/cart.scss';
import {connect} from 'react-redux';
import cartAction from '@/redux/actions/cartAction';

import CartList from './CartList';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            isAllChecked:0,
            totalNum:0,
            totalPrice:'0.00'
        }

        this.selecteItem = this.selecteItem.bind(this);
        this.selecteStore = this.selecteStore.bind(this);
        this.selecteAll = this.selecteAll.bind(this);
        this.computeNum = this.computeNum.bind(this);
        this.inputNum = this.inputNum.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    // 选择单个商品
    selecteItem(index,idx){
        let obj = {index,idx};
        this.props.selecteItemInCart(obj);
    }

    // 选择单个店铺
    selecteStore(index){
        this.props.selecteStoreInCart(index);
    }

    // 点击全选
    selecteAll(e){
        if(e.target.className.endsWith('icon-weixuanzhong')){
            this.props.selecteAllInCart(1);
        }else{
            this.props.selecteAllInCart(0);
        }
    }

    // 输入数量
    inputNum(qty,index,idx){
        let obj = {qty,index,idx}
        this.props.changeNumInCart(obj);
    }

    // 计算加减数量
    computeNum(type,index,idx){
        let qty = this.props.customerCartList[index].goods_list[idx].goods_num;
        if(type == 'add'){
            if(qty<=98){
                qty++;
                let obj = {qty,index,idx}
                this.props.changeNumInCart(obj)
            }
        }else{
            if(qty>1){
                qty--;
                let obj = {qty,index,idx}
                this.props.changeNumInCart(obj)
            }
        }
    }

    // 删除商品
    deleteItem(index,idx){
        let obj = {index,idx}
        this.props.deleteItemInCart(obj);
    }

    render(){
        let {isAllChecked,totalNum,totalPrice} = this.state;
        return (
            <div className="page cart">
                <div className="cart-body">
                    <header>购物车({
                        this.props.customerCartList.reduce(function(prev,cur){
                            let goodsNum = cur.goods_list.reduce(function(pre,cu){
                                let num = cu.goods_num;
                                return pre + num;
                            },0)
                            return prev + goodsNum;
                        },0)
                    })</header>
                    <div className="cart-main">
                        {
                            this.props.customerCartList.length>0 ?
                            <CartList 
                                cart_list={this.props.customerCartList} 
                                handleSelecteItem={this.selecteItem} 
                                handleSelecteStore={this.selecteStore}
                                handleComputeNum = {this.computeNum}
                                handleInputNum = {this.inputNum}
                                handleDeleteItem = {this.deleteItem}
                            /> : null
                        }
                    </div>
                    <div className="cart-btn">
                        <label>
                            {
                                this.props.customerCartList.length>0 ?
                                <i className={"check_all iconfont " + (this.props.customerCartList.every(item=>item.allchecked) ? 'active icon-2weixuanzhong' : 'icon-weixuanzhong')} onClick={this.selecteAll}></i> :
                                <i className={"check_all iconfont icon-weixuanzhong"}></i>
                            }
                            全选
                        </label>
                        <em>共计{
                            this.props.customerCartList.reduce(function(prev,cur){
                                let goodsNum = cur.goods_list.reduce(function(pre,cu){
                                    let num = 0;
                                    if(cu.ischecked){
                                        num = cu.goods_num;
                                    }
                                    return pre + num;
                                },0)
                                return prev + goodsNum;
                            },0)
                        }件商品</em>
                        <span>
                            合计
                            <strong>￥{
                                this.props.customerCartList.reduce(function(prev,cur){
                                    let goodsPrice = cur.goods_list.reduce(function(pre,cu){
                                        let price = 0;
                                        if(cu.ischecked){
                                            price = cu.goods_num*cu.goods_price.slice(1)
                                        }
                                        return pre + price;
                                    },0)
                                    return prev + goodsPrice;
                                },0)
                            }</strong>
                        </span>
                        <a href="javascript:;">结算</a>
                    </div>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}

const mapStateToProps = state=>{
    return {
        customerCartList:state.cart.customerCartList
    }
}
const mapDispatchToProps = dispatch=>{
    return {
        selecteItemInCart(data){
            dispatch(cartAction.selecteItemInCart(data));
        },
        selecteStoreInCart(data){
            dispatch(cartAction.selecteStoreInCart(data));
        },
        selecteAllInCart(data){
            dispatch(cartAction.selecteAllInCart(data));
        },
        changeNumInCart(data){
            dispatch(cartAction.changeNumInCart(data));
        },
        deleteItemInCart(data){
            dispatch(cartAction.deleteItemInCart(data));
        },
    }
}
Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default Cart;