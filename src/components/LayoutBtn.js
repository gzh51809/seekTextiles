import React, { Component } from 'react';

class LayoutBtn extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {layout,handleChangeLayout} = this.props;
        return (
            <i className={layout ? "iconfont icon-tubiao_liebiaopailie" : "iconfont icon-tubiao_kuaizhuangpailie"} onClick={handleChangeLayout}></i>
        )
    }
}
export default LayoutBtn;