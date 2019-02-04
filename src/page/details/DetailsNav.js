import React, { Component } from 'react';

class DetailsNav extends Component {
    render() {
        let {goods_functions} = this.props;
        return (
            <ul className="con-nav">
                {
                    goods_functions.map(item=>{
                        return (
                            <li key={item.func_name}>
                                <img src={item.func_icon} />
                                <span>{item.func_title}</span>
                            </li>

                        )
                    })
                }
            </ul>
        )
    }
}
export default DetailsNav;