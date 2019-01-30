import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';


class Mine extends Component{
    render(){
        return (
            <div className="page mine">
                <div className="main">
                    <h1>Mine</h1>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}

export default Mine;