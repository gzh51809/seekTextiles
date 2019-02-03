import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import '@/sass/home.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import homeAction from '@/redux/actions/homeAction';

import BottomBar from '@com/BottomBar';
import HomeHeader from './HomeHeader';
import HomeFind from './HomeFind';
import HomeFocus from './HomeFocus';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            scrollRef:null,
            currentPage:1,
            loading:false
        }
        this.handleGetList = this.handleGetList.bind(this);
    }

    // 滚动加载recommend数据
    onScrollHandle = () => {
        const scrollTop = this.scrollRef.scrollTop;
        const clientHeight = this.scrollRef.clientHeight;
        const scrollHeight = this.scrollRef.scrollHeight;
        const isBottom = scrollTop + clientHeight + 200 >= scrollHeight;
        if (isBottom && scrollTop) {
            this.handleGetList();
        }
    };
    handleGetList(){
        if(!this.state.loading){
            let page = this.state.currentPage;
            if(page >= 10){
                console.log('that is all');
                return
            }
            page++;
            this.setState({
                loading:true,
                currentPage:page
            })
            let Sign = this.props.requestData[page-1].Sign;
            // 请求Recommend数据
            axios({
                method:'get',
                url:`http://api.zhaojiafang.com/v1/index/likegoods`,
                params:{
                    AppVersion: '3.11',
                    Format: 'json',
                    SystemName: 'H5',
                    curpage: page,
                    key: '',
                    page: 10,
                    storeid: 1,
                    timestamp: 1549092338039,
                    Sign
                }
            }).then(res=>{
                let data = res.data.datas;
                this.props.addRecommend(data);
                this.setState({
                    loading:false
                });
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            console.log('loading')
        }
    }
    render(){
        return (
            <div className="page home">
                <HomeHeader/>
                <div 
                    className="main" 
                    ref={c => {this.scrollRef = c;}}
                    onScrollCapture={() =>this.onScrollHandle()}
                >
                    <Switch>
                        <Route path={this.props.match.url + '/find'} component={HomeFind}/>
                        <Route path={this.props.match.url + '/focus'} component={HomeFocus}/>
                        <Redirect from={this.props.match.url} to={this.props.match.url + '/find'} exact/>
                    </Switch>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}
// 映射home-reducer.js中的state到 this.props.goodslist 中
const mapStateToProps = state=>{
    return {
        requestData:state.home.requestData
    }
}
// 映射各状态更新提交方法如 remove() 到 this.props 中
const mapDispatchToProps = (dispatch,ownProps)=>{
    //ownProps为未连接Redux前的props，一般用不到
    return {
        addRecommend(data){
            dispatch(homeAction.addRecommend(data));
        },
    }
}
// 调用 connect 方法连接 Redux 的 store
Home = connect(mapStateToProps,mapDispatchToProps)(Home);

export default Home;