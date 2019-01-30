import React,{Component} from 'react';
import BottomBar from '@com/BottomBar';


class Cart extends Component{
    render(){
        return (
            <div className="page cart">
                <div className="main">
                    <h1>Cart</h1>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}

export default Cart;