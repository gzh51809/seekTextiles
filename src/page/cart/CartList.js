import React, { Component } from 'react';

class CartList extends Component {
    constructor() {
        super();
        this.state = {
            qty:1
        }

        this.handleInputNum = this.handleInputNum.bind(this);
        this.handleComputeNum = this.handleComputeNum.bind(this);
    }

    handleInputNum(e){
        if(!isNaN(e.target.value) && (e.target.value>=1) && (e.target.value<=99)){
            this.setState({
                qty:e.target.value
            })
        }
    }

    handleComputeNum(e){
        let qty = this.state.qty;
        if(e.target.className == 'add'){
            if(qty<=98){
                qty++;
                this.setState({
                    qty
                })
            }else{
                this.setState({
                    qty:99
                })
            }
        }else{
            if(qty>1){
                qty--;
                this.setState({
                    qty
                })
            }else{
                this.setState({
                    qty:1
                })
            }
        }
    }


    render() {
        let {cart_list} = this.props;
        return (
            <div className="cart-list">
            {
                cart_list.map((items,index)=>{
                    return (
                    <div className="list-store" key={items.store_id}>
                        <div className="store-header">
                            <i className={"check_store iconfont " + (items.allchecked ? 'active icon-2weixuanzhong' : 'icon-weixuanzhong')}></i>
                            <div>
                                <em className="iconfont icon-dianpu"></em>
                                <span>{items.store_name}</span>
                            </div>
                        </div>
                        <ul className="store-box">
                        {
                            items.goods_list.map(item=>{
                                return <li key={item.goods_id}>
                                    <i className={"check_store iconfont " + (items.ischecked ? 'active icon-2weixuanzhong' : 'icon-weixuanzhong')}></i>
                                    <img src={item.goods_image_url} alt=""/>
                                    <div>
                                        <p>{item.goods_name}</p>
                                        <span>{item.goods_subname}</span>
                                        <div>
                                            <strong>{item.goods_price}</strong>
                                            <div>
                                                <a href="javascript:;" className="sub" onClick={this.handleComputeNum}>-</a>
                                                <input type="text" value={this.state.qty} onChange={this.handleInputNum}/>
                                                <a href="javascript:;" className="add" onClick={this.handleComputeNum}>+</a>
                                            </div>
                                            <em className="iconfont icon-del"></em>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                        </ul>
                    </div>
                    )
                })
            }
            </div>
        )
    }
}
export default CartList;