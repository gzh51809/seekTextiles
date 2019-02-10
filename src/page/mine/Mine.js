import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';
import {Button} from 'antd-mobile';
import {connect} from 'react-redux';
import loginAction from '@/redux/actions/loginAction';

class Mine extends Component{

    render(){
        let {removeToken,token} = this.props;
        return (
            <div className="page mine">
                <div className="main">
                    <h1>Mine</h1>
                    <p style={{marginBottom:'300px'}}>您好，亲爱的{token.split('&')[0]}</p>
                    <Button type="warning" onClick={removeToken}>退出登录</Button>
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