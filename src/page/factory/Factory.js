import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';


class Factory extends Component{
    render(){
        return (
            <div className="page factory">
                <div className="main">
                    <h1>Factory</h1>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}

export default Factory;