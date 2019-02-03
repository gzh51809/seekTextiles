import React, { Component } from 'react';
import '@/sass/details.scss';
import { Tabs } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios';

import DetailsSpec from './DetailsSpec';

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) =>{
            return (<div style={style} className="detail-tab">
                <span>
                    <i className="iconfont icon-zuo"></i>
                </span>
                <Tabs.DefaultTabBar {...props} />
                <span>
                    <i className="iconfont icon-7"></i>
                    <i className="iconfont icon-gengduo"></i>
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
            goodsData:{}
        }
    }
    componentWillMount() {
        console.log(this.props.match.params);
        let {gid} = this.props.match.params;
        // 请求详情页数据
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
            console.log(data);
            this.setState({
                goodsData:data
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div className="details">
                <StickyContainer className="det-body">
                    <Tabs tabs={this.state.detailTabs}
                        tabBarInactiveTextColor='#999'
                        tabBarActiveTextColor='#000'
                        renderTabBar={renderTabBar}
                    >
                        <div className="det-content">
                        {
                            this.state.goodsData.goods_oriimage ?
                            <DetailsSpec goodsData={this.state.goodsData}/> :
                            null
                        }
                        </div>
                        <div className="det-content">
                            Content of second tab
                        </div>
                        <div className="det-content">
                            Content of third tab
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
                        <a href="javascript:;">
                            <i className="iconfont icon-gouwuche"></i>
                            <span>购物车</span>
                        </a>
                    </div>
                    <div className="btn-right">
                        <a href="javascript:;">加入购物车</a>
                        <a href="javascript:;">立即购买</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details;