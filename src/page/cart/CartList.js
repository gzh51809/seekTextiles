import React, { Component } from 'react';

class CartList extends Component {
    constructor() {
        super();
        this.state = {
            
        }

        this.handleInputNum = this.handleInputNum.bind(this);
        this.handleComputeNum = this.handleComputeNum.bind(this);
    }

    // 输入数量
    handleInputNum(e,index,idx){
        if(!isNaN(e.target.value) && (e.target.value>=1) && (e.target.value<=99)){
            this.props.handleInputNum(e.target.value,index,idx);
        }
    }

    // 加减数量
    handleComputeNum(e,index,idx){
        this.props.handleComputeNum(e.target.className,index,idx);
    }


    render() {
        let {cart_list,handleSelecteItem,handleSelecteStore,handleDeleteItem} = this.props;
        return (
            <div className="cart-list">
            {
                cart_list.map((items,index)=>{
                    return (
                    <div className="list-store" key={items.store_id}>
                        <div className="store-header">
                            <i 
                                className={"check_store iconfont " + (items.allchecked ? 'active icon-2weixuanzhong' : 'icon-weixuanzhong')}
                                onClick={()=>handleSelecteStore(index)}
                            ></i>
                            <div>
                                <em className="iconfont icon-dianpu"></em>
                                <span>{items.store_name}</span>
                            </div>
                        </div>
                        <ul className="store-box">
                        {
                            items.goods_list.map((item,idx)=>{
                                return <li key={item.goods_id}>
                                    <i 
                                        className={"check_store iconfont " + (item.ischecked ? 'active icon-2weixuanzhong' : 'icon-weixuanzhong')} 
                                        onClick={()=>handleSelecteItem(index,idx)}
                                    ></i>
                                    <img src={item.goods_image_url} alt=""/>
                                    <div>
                                        <p>{item.goods_name}</p>
                                        <span>{item.goods_subname}</span>
                                        <div>
                                            <strong>{item.goods_price}</strong>
                                            <div>
                                                <a href="javascript:;" className="sub" onClick={(e)=>this.handleComputeNum(e,index,idx)}>-</a>
                                                <input type="text" value={item.goods_num} onChange={(e)=>this.handleInputNum(e,index,idx)}/>
                                                <a href="javascript:;" className="add" onClick={(e)=>this.handleComputeNum(e,index,idx)}>+</a>
                                            </div>
                                            <em className="iconfont icon-del" onClick={()=>handleDeleteItem(index,idx)}></em>
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