import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import homeAction from '@/redux/actions/homeAction';

import HomeBanner from './HomeBanner';
import HomeNav from './HomeNav';
import HomeArticle from './HomeArticle';
import HomeRank from './HomeRank';
import HomeSpecials from './HomeSpecials';
import HomeRecommend from './HomeRecommend';

class HomeFind extends Component{
    constructor(){
        super();
        this.state = {
            isok:false
        }
    }
    componentWillMount(){
        let {inithome,addRecommend,clearRecommend} = this.props;
        // 请求首页初始化数据
        axios({
            method:'get',
            url:`http://api.zhaojiafang.com/v1/index/default`,
            params:{
                AppVersion: '3.11',
                Format: 'json',
                SystemName: 'H5',
                event: '首页default',
                key: '',
                storeid: 1,
                timestamp: 1548916288973,
                Sign: 'a143696c955b2722551236ed3190e8d1'
            }
        }).then(res=>{
            let data = res.data.datas;
            inithome(data);
            this.setState({
                isok:true
            })
        }).catch((err)=>{
            console.log(err);
        });
        // 请求Recommend数据
        axios({
            method:'get',
            url:`http://api.zhaojiafang.com/v1/index/likegoods`,
            params:{
                AppVersion: '3.11',
                Format: 'json',
                SystemName: 'H5',
                curpage: 1,
                key: '',
                page: 10,
                storeid: 1,
                timestamp: 1549026718915,
                Sign: '000576df0b52ee9d9af7b50d058d02e0'
            }
        }).then(res=>{
            let data = res.data.datas;
            clearRecommend();
            addRecommend(data);
        }).catch((err)=>{
            console.log(err);
        });

    }
    render(){
        let {mainDatas,recomDatas} = this.props;
        console.log('数据：',recomDatas);
        return (
            <div className="home-find">
                <div className="search">
                    <a href="javascript:;">
                        <i className="iconfont icon-iconset0157"></i>
                        搜索商品或商家
                    </a>
                </div>
                <HomeBanner banners={mainDatas.banners} isok={this.state.isok}/>
                <HomeNav/>
                <HomeArticle articles={mainDatas.articles} isok={this.state.isok}/>
                <HomeRank rankList={mainDatas.ranking.list} isok={this.state.isok} />
                <HomeSpecials specials={mainDatas.specials} />
                <HomeRecommend recomDatas={recomDatas}/>
            </div>
        )
    }
}

// 映射home-reducer.js中的state到 this.props.goodslist 中
const mapStateToProps = state=>{
    return {
        mainDatas:state.home.mainDatas,
        recomDatas:state.home.recomDatas
    }
}
// 映射各状态更新提交方法如 remove() 到 this.props 中
const mapDispatchToProps = (dispatch,ownProps)=>{
    //ownProps为未连接Redux前的props，一般用不到
    return {
        inithome(data){
            dispatch(homeAction.init(data));
        },
        addRecommend(data){
            dispatch(homeAction.addRecommend(data));
        },
        clearRecommend(){
            dispatch(homeAction.clearRecommend());
        },
    }
}
// 调用 connect 方法连接 Redux 的 store
HomeFind = connect(mapStateToProps,mapDispatchToProps)(HomeFind);

export default HomeFind;