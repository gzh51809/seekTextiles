import React, { Component } from 'react';

class DetailsStore extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {store_info} = this.props;
        return (
            <div className="con-store" sid={store_info.store_id}>
                <div className="store-header">
                    <img src={store_info.store_avatar} alt=""/>
                    <span>{store_info.store_name}</span>
                    <i className="iconfont icon-right-line"></i>
                </div>
                <ul>
                    {
                        store_info.othersinfo.map((item,idx)=>{
                            let arr = item.split(':');
                            return (
                            <li key={idx}>
                                <strong>{arr[0]}</strong>
                                <span>{arr[1]}</span>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default DetailsStore;