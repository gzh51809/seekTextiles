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
            totalPrice:'0.00',
            cartList:[]
        }
    }
    componentWillMount(){
        let username = localStorage.token;
        let {cartData,initCartList} = this.props;
        let list = []
        if(cartData){
            list = cartData.filter(item=>item.customer===username);
            if(list.length>0){
                initCartList(list[0].cart_list);
            }else{
                initCartList([]);
            }
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({cartList:nextProps.customerCartList});
    }
    render(){
        let {isAllChecked,totalNum,totalPrice} = this.state;
        return (
            <div className="page cart">
                <div className="cart-body">
                    <header>购物车(0)</header>
                    <div className="cart-main">
                        {
                            this.props.customerCartList.length>0 ?
                            <CartList cart_list={this.props.customerCartList}/> :
                            null
                        }
                    </div>
                    <div className="cart-btn">
                        <label>
                            <i className={"check_all iconfont " + (isAllChecked ? 'active icon-2weixuanzhong' : 'icon-weixuanzhong')}></i>
                            全选
                        </label>
                        <em>共计{totalNum}件商品</em>
                        <span>
                            合计
                            <strong>￥{totalPrice}</strong>
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
        cartData:state.cart.cartData,
        customerCartList:state.cart.customerCartList
    }
}
const mapDispatchToProps = dispatch=>{
    //ownProps为未连接Redux前的props，一般用不到
    return {
        initCartList(data){
            dispatch(cartAction.initCustomerCartList(data));
        },
    }
}
Cart = connect(mapStateToProps,mapDispatchToProps)(Cart);

export default Cart;