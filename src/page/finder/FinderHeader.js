import React, { Component } from 'react';

class FinderHeader extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="finder-header">
                <a href="javascript:;">
                    <i className="iconfont icon-iconset0157"></i>
                    搜索商品
                </a>
            </div>
        )
    }
}
export default FinderHeader;