import React, { Component } from 'react';

class FactoryMainTop extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {layout,handleChangeReq} = this.props;
        return (
            <div className="factory-main-top" onClick={handleChangeReq}>
                {
                    layout ?
                    (<div className="fac-top-grid"><span>排序</span><span>区域</span></div>) :
                    (<div className="fac-top-list"><span>分类</span><span>排序</span><span>区域</span></div>)
                }
            </div>
        )
    }
}
export default FactoryMainTop;