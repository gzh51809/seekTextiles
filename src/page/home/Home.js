import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import '@/sass/home.scss';

import BottomBar from '@com/BottomBar';
import HomeHeader from './HomeHeader';
import HomeFind from './HomeFind';
import HomeFocus from './HomeFocus';

class Home extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return (
            <div className="page home">
                <HomeHeader/>
                <div className="main">
                        {/* <Route path={this.props.match.url + '/find'} children={props => {
                            return <HomeFind {...props} />
                        }}/>
                        <Route path={this.props.match.url + '/focus'} children={props => {
                            return <HomeFocus {...props} />
                        }}/>
                        <Redirect from={this.props.match.url} to={this.props.match.url + '/find'} exact children={props => {
                            return <HomeFind {...props} />
                        }}/> */}
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

export default Home;