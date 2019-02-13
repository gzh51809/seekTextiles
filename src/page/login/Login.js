import React, { Component } from 'react';
import { List, InputItem,NavBar,Toast } from 'antd-mobile';
import '@/sass/login.scss';
import {connect} from 'react-redux';
import loginAction from '@/redux/actions/loginAction';
import cartAction from '@/redux/actions/cartAction';

function showToast(text) {
    Toast.info(text, 2);
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username:'',
            psw:''
        }

        this.handleVerdict = this.handleVerdict.bind(this);
        this.handleInitCart = this.handleInitCart.bind(this);
    }

    // 查找用户购物车数据
    handleInitCart(username){
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

    handleVerdict(){
        let {username,psw} = this.state;
        if(username.trim() && psw.trim()){
            if(psw.length>=6){
                let isok = false;
                this.props.userInfo.forEach(item=>{
                    if(item.username === username && item.psw === psw){
                        isok = true;
                        // 登录成功缓存用户购物车数据
                        this.handleInitCart(username);
                        if(this.props.location.state == undefined){
                            let _token = {token:username};
                            this.props.addToken(_token);
                            localStorage.setItem('token', username);
                            this.props.history.replace('/home');
                        }else{
                            let _path = this.props.location.state.from.pathname;
                            let _token = {token:username};
                            this.props.addToken(_token);
                            localStorage.setItem('token', username);
                            this.props.history.replace(_path);
                        }
                    }
                })
                if(!isok) showToast('账号或密码错误');
            }else{
                showToast('密码至少6位数');
            }
        }else{
            showToast('账号和密码不能为空');
        }
    }

    render() {
        return (
            <div className="login">
                <NavBar
                    mode="light"
                    icon={<i className="iconfont icon-zuo" />}
                    onLeftClick={() => this.props.history.goBack()}
                >登录找家纺</NavBar>
                <div className="login-main">
                    <List>
                        <InputItem
                            placeholder="手机号/邮箱/用户名"
                            clear
                            onChange={value=>this.setState({username:value})}
                        >
                            <i className="iconfont icon-gerenzhongxin"  />
                        </InputItem>
                        <InputItem
                            type="password"
                            placeholder="输入密码（至少6位数）"
                            clear
                            onChange={value=>this.setState({psw:value})}
                        >
                            <i className="iconfont icon-mima"  />
                        </InputItem>
                    </List>
                    <div className="login-reg">
                        <strong>立即注册</strong>
                        <span>找回密码</span>
                    </div>
                    <div className="login-btn">
                        <a href="javascript:;" onClick={this.handleVerdict}>登录</a>
                    </div>
                    <p>绑定后即为同意找家纺的<span>《使用协议》</span></p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        userInfo:state.login.userInfo,
        token:state.login.token,
        cartData:state.cart.cartData,
    }
}
const mapDispatchToProps = dispatch=>{
    //ownProps为未连接Redux前的props，一般用不到
    return {
        addToken(data){
            dispatch(loginAction.addToken(data));
        },
        initCartList(data){
            dispatch(cartAction.initCustomerCartList(data));
        },
    }
}

Login = connect(mapStateToProps,mapDispatchToProps)(Login);

export default Login;