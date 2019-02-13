import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';
import {Button,WingBlank,Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import loginAction from '@/redux/actions/loginAction';
import '@/sass/mine.scss';

// 定义antd的confirm对话框
const alert = Modal.alert;

class Mine extends Component{
    constructor(){
        super();
        this.state = {
            moneyList:[
                {
                    icon:'http://api.zhaojiafang.com/public/image/icons/usercenter/icon_deposit.png',
                    text:'预存款/提现'
                },
                {
                    icon:'http://api.zhaojiafang.com/public/image/icons/usercenter/icon_rechargeable.png',
                    text:'充值卡'
                },
                {
                    icon:'http://api.zhaojiafang.com/public/image/icons/usercenter/icon_red.png',
                    text:'我的红包'
                },
                {
                    icon:'http://api.zhaojiafang.com/public/image/icons/usercenter/icon_coupon_3.png',
                    text:'优惠券'
                },
            ],
            orderList:[
                {
                    icon:'iconfont icon-ziyuan',
                    text:'全部订单'
                },
                {
                    icon:'iconfont icon-daifukuan',
                    text:'待付款'
                },
                {
                    icon:'iconfont icon-daifahuo',
                    text:'代发货'
                },
                {
                    icon:'iconfont icon-yifahuo',
                    text:'已发货'
                },
                {
                    icon:'iconfont icon-yiwanchengdingdan',
                    text:'已完成'
                },
                {
                    icon:'iconfont icon-tuikuan',
                    text:'退货款'
                }
            ]
        }
    }
    render(){
        let {moneyList,orderList} = this.state;
        let {removeToken,token} = this.props;
        return (
            <div className="page mine">
                <div className="main">
                    <div className="mine-top">
                        <img src={require("./img/touxiang.jpeg")} alt=""/>
                        <div>
                            <p>账号：{token.split('&')[0]}</p>
                            <p>昵称：未设置昵称</p>
                        </div>
                        <i className="iconfont icon-iconfontzhizuobiaozhun023110"></i>
                        <i className="iconfont icon-set"></i>
                    </div>
                    <ul className="mine-money">
                    {
                        moneyList.map(item=><li key={item.text}><img src={item.icon}/><span>{item.text}</span></li>)
                    }
                    </ul>
                    <div className="mine-order">
                        <p>我的订单</p>
                        <ul>
                        {
                            orderList.map(item=>{
                                return <li key={item.text}><i className={item.icon}></i><span>{item.text}</span></li>
                            })
                        }
                        </ul>
                    </div>
                    <WingBlank>
                        <Button 
                            type="warning" 
                            onClick={() =>
                                alert('提示', '确认退出登录？', [
                                  { text: '取消', onPress: () => console.log('取消') },
                                  { text: '确定', onPress: () => removeToken() },
                                ])
                              }
                        >退出登录</Button>
                    </WingBlank>
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
        userInfo:state.login.userInfo,
        token:state.login.token
    }
}
const mapDispatchToProps = dispatch=>{
    //ownProps为未连接Redux前的props，一般用不到
    return {
        removeToken(data){
            localStorage.removeItem('token');
            dispatch(loginAction.removeToken(data));
        },
    }
}

Mine = connect(mapStateToProps,mapDispatchToProps)(Mine);
export default Mine;