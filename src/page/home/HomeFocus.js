import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import homeAction from '@/redux/actions/homeAction';

import HomeStore from './HomeStore';

class HomeFocus extends Component{
    componentWillMount(){
        let {initStore} = this.props;
        // 请求首页初始化数据
        axios({
            method:'get',
            url:`http://api.zhaojiafang.com/v1/index/attention`,
            params:{
                AppVersion: '3.11',
                Format: 'json',
                SystemName: 'H5',
                key: '',
                storeid: 1,
                timestamp: 1549114217175,
                Sign: 'fc35474217299fb683239f7ee1bc5afd'
            }
        }).then(res=>{
            let data = res.data.datas;
            initStore(data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    render(){
        let {storeData} = this.props;
        return (
            <div className="home-focus">
                {
                    storeData.hots ?
                    <HomeStore hots={storeData.hots}/> :
                    null
                }
            </div>
        )
    }
}

// 映射home-reducer.js中的state到 this.props.storeData 中
const mapStateToProps = state=>{
    return {
        storeData:state.home.storeData
    }
}
// 映射各状态更新提交方法如 remove() 到 this.props 中
const mapDispatchToProps = (dispatch,ownProps)=>{
    //ownProps为未连接Redux前的props，一般用不到
    return {
        initStore(data){
            dispatch(homeAction.initStore(data));
        }
    }
}
// 调用 connect 方法连接 Redux 的 store
HomeFocus = connect(mapStateToProps,mapDispatchToProps)(HomeFocus);

export default HomeFocus;