import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import './App.scss';

import Home from '@/page/home/Home';
import Factory from '@/page/factory/Factory';
import Finder from '@/page/finder/Finder';
import Cart from '@/page/cart/Cart';
import Mine from '@/page/mine/Mine';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/factory" component={Factory} />
          <Route path="/finder" component={Finder} />
          <Route path="/cart" component={Cart} />
          <Route path="/mine" component={Mine} />
          <Redirect from="/" to="/home" exact/>
        </Switch>
      </div>
    );
  }
}

export default App;
