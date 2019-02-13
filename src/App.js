import React, { Component } from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import './App.scss';
import {connect} from 'react-redux';
import loginAction from '@/redux/actions/loginAction';
import cartAction from '@/redux/actions/cartAction';

import Routers from './router';
import Home from '@/page/home/Home';

class App extends Component {
  componentWillMount(){
    if(localStorage.token){
      let username = localStorage.token;
      let obj = {token:username};
      this.props.addToken(obj);
      // 根据用户信息获取购物车
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
  }
  render() {
    let token = this.props.token;
    return (
      <div className="App">
        <Switch>
          {Routers.map((item, index) => {
            return <Route key={index} path={item.path} exact render={props =>(!item.auth ? (<item.component {...props} />) : (token ? <item.component {...props} /> : <Redirect to={{pathname: '/login',state: { from: props.location }}} />))} />
          })}

          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" exact/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
      token:state.login.token,
      cartData:state.cart.cartData,
  }
}
const mapDispatchToProps = dispatch=>{
  return {
    addToken(data){
        dispatch(loginAction.addToken(data));
    },
    initCartList(data){
      dispatch(cartAction.initCustomerCartList(data));
    }
  }
}
App = connect(mapStateToProps,mapDispatchToProps)(App);
App = withRouter(App);

export default App;