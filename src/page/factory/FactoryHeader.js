import React, { Component } from 'react';

import LayoutBtn from '@com/LayoutBtn';

class FactoryHeader extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {layout,handleChangeLayout} = this.props;
        return (
            <div className="factory-header">
                <h3>
                    找商家
                    <LayoutBtn layout={layout} handleChangeLayout={handleChangeLayout}/>
                </h3>
                <div>
                    <input type="text" placeholder="搜索商品、商家" autoFocus/>
                    <i className="iconfont icon-iconset0157"></i>
                </div>
            </div>
        )
    }
}
export default FactoryHeader;