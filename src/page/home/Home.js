import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';


class Home extends Component{
    constructor(){
        super();
        this.state = {

        }
    }
    render(){
        return (
            <div className="page home">
                <h1>home1</h1>
                <ul>
                    <li>sdf</li>
                </ul>
                <BottomBar/>
            </div>
            
        )
    }
}

export default Home;