import React, { Component } from 'react';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import './App.scss';
import {connect} from 'react-redux';
import loginAction from '@/redux/actions/loginAction';

import Routers from './router';
import Home from '@/page/home/Home';
// import Factory from '@/page/factory/Factory';
// import Finder from '@/page/finder/Finder';
// import Cart from '@/page/cart/Cart';
// import Mine from '@/page/mine/Mine';
// import Details from '@/page/details/Details';

class App extends Component {
  componentWillMount(){
    if(localStorage.token){
      let obj = {token:localStorage.token};
      this.props.addToken(obj);
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
          {/* <Route path="/factory" component={Factory} />
          <Route path="/finder" component={Finder} />
          <Route path="/cart" component={Cart} />
          <Route path="/mine" component={Mine} />
          <Route path="/details/:gid" component={Details} /> */}
          <Redirect from="/" to="/home" exact/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return {
      token:state.login.token
  }
}
const mapDispatchToProps = dispatch=>{
  return {
      addToken(data){
          dispatch(loginAction.addToken(data));
      }
  }
}
App = connect(mapStateToProps,mapDispatchToProps)(App);
App = withRouter(App);

export default App;