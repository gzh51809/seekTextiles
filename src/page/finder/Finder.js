import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';


class Finder extends Component{
    render(){
        return (
            <div className="page finder">
                <div className="main">
                    <h1>Finder</h1>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}

export default Finder;