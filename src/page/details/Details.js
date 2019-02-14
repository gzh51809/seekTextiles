import React, { Component } from 'react';
import '@/sass/details.scss';
import { Tabs, Toast } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios';

import {connect} from 'react-redux';
import cartAction from '@/redux/actions/cartAction';

import DetailsSpec from './DetailsSpec';
import DetailsPic from './DetailsPic';
import DetailsMore from './DetailsMore';

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) =>{
            return (<div style={style} className="detail-tab">
                <span>
                    <i className="iconfont icon-zuo" onClick={()=>{
                        this.props.history.goBack();
                    }}></i>
                </span>
                <Tabs.DefaultTabBar {...props} />
                <span>
                    <i className="iconfont icon-7"></i>
                    <DetailsMore/>
                </span>
            </div>)
        }}

    </Sticky>);
}

class Details extends Component {
    constructor() {
        super();
        this.state = {
            detailTabs: [
                { title: '详情' },
                { title: '图文' },
                { title: '评论' },
            ],
            goodsData:{},
            qty:1
        }

        this.updateGoodsData = this.updateGoodsData.bind(this);
        this.getNewData = this.getNewData.bind(this);
        this.gotoDetail = this.gotoDetail.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.computeNum = this.computeNum.bind(this);
        this.inputNum = this.inputNum.bind(this);
    }

    getNewData(ids){
        let arr = [];
        let idKey = '';
        for(var key in ids){
            arr.push(ids[key]);
        }
        if(arr.length>1){
            idKey = arr.join('|');
        }else{
            idKey = arr[0];
        }
        let gid = this.state.goodsData.spec_list[idKey].split(':')[0];
        this.updateGoodsData(gid);
    }

    updateGoodsData(gid){
        axios({
            method:'get',
            url:`http://api.zhaojiafang.com/v1/goods/goodsdetail/${gid}`,
            params:{
                AppVersion: '3.11',
                Format: 'json',
                SystemName: 'H5',
                key: '',
                storeid: 1,
                timestamp: 1549200394961,
                Sign: '41665ddf556bc1c012a637a6b180dbc1'
            }
        }).then(res=>{
            let data = res.data.datas;
            this.setState({
                goodsData:data
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    gotoDetail(gid){
        this.props.history.push('/details/' + gid);
    }

    computeNum(type){
        let {qty} = this.state;
        if(type == 'add'){
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

    inputNum(qty){
        this.setState({
            qty
        })
    }

    addToCart(){
        let {store_info,goods_id,goods_oriimage,goods_name,goods_price,goods_subname} = this.state.goodsData;
        let data = {
            store_id:store_info.store_id,
            store_name:store_info.store_name,
            allchecked:0,
            goods_list:[
                {
                    goods_id,
                    goods_image_url:goods_oriimage[0],
                    goods_name,
                    goods_num:this.state.qty,
                    goods_price,
                    goods_subname,
                    ischecked:0
                }
            ]
        }
        this.props.addToCartList(data);
        Toast.info('添加成功', 1);
    }


    componentWillMount() {
        let {gid} = this.props.match.params;
        // 请求详情页数据
        this.updateGoodsData(gid);
    }
    componentWillReceiveProps(nextProps) {
        let {gid} = nextProps.match.params;
        // 请求详情页数据
        this.updateGoodsData(gid);
    }

    render() {
        return (
            <div className="details">
                <StickyContainer className="det-body">
                    <Tabs tabs={this.state.detailTabs}
                        tabBarInactiveTextColor='#999'
                        tabBarActiveTextColor='#000'
                        renderTabBar={renderTabBar.bind(this)}
                        swipeable={false}
                    >
                        <div className="det-content">
                        {
                            this.state.goodsData.goods_oriimage ?
                            <DetailsSpec 
                                goodsData={this.state.goodsData} 
                                handleUpdate={this.getNewData} 
                                handleToDetail={this.gotoDetail}
                                qty={this.state.qty}
                                handleComputeNum={this.computeNum}
                                handleInputNum={this.inputNum}
                                handleAddToCart={this.addToCart}
                            /> : null
                        }
                        </div>
                        <div className="det-content">
                        {
                            this.state.goodsData.goods_oriimage ?
                            <DetailsPic goods_body={this.state.goodsData.goods_body}/> :
                            null
                        }
                        </div>
                        <div className="det-content">
                            <div className="con-review">
                                <p>该商品暂无评价</p>
                            </div>
                        </div>
                    </Tabs>
                </StickyContainer>
                <div className="det-buttons">
                    <div className="btn-left">
                        <a href="javascript:;">
                            <i className="iconfont icon-shouye"></i>
                            <span>店铺</span>
                        </a>
                        <a href="javascript:;">
                            <i className="iconfont icon-qq"></i>
                            <span>平台客服</span>
                        </a>
                        <a href="javascript:;" onClick={()=>{
                            this.props.history.push('/cart');
                        }}>
                            <i className="iconfont icon-gouwuche"></i>
                            <span>购物车</span>
                        </a>
                    </div>
                    <div className="btn-right">
                        <a href="javascript:;" onClick={this.addToCart}>加入购物车</a>
                        <a href="javascript:;">立即购买</a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        // cartData:state.cart.cartData,
        customerCartList:state.cart.customerCartList
    }
}
const mapDispatchToProps = dispatch=>{
    return {
        addToCartList(data){
            dispatch(cartAction.addCustomerCartList(data));
        },
    }
}
Details = connect(mapStateToProps,mapDispatchToProps)(Details);
export default Details;