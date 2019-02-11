import React, { Component } from 'react';

class ListHeader extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {handleChangeLayout,layout,handleChangeListType,handleBack} = this.props;
        return (
            <div className="list-header">
                <div>
                    <i className="iconfont icon-zuo" onClick={handleBack}></i>
                    <span className="finder-header">
                        <input type="text" placeholder="搜索商品、商家" autoFocus/>
                        <i className="iconfont icon-iconset0157"></i>
                    </span>
                    <i className={layout ? "iconfont icon-tubiao_liebiaopailie" : "iconfont icon-tubiao_kuaizhuangpailie"} onClick={handleChangeLayout}></i>
                </div>
                <div>
                    <strong>有筛选</strong>
                    <span>
                        <a href="javascript:;" onClick={handleChangeListType.bind(this,"synthesis")}>综合</a>
                        <a href="javascript:;" onClick={handleChangeListType.bind(this,"sales")}>销量</a>
                        <a href="javascript:;" onClick={handleChangeListType.bind(this,"new")}>新品</a>
                        <a href="javascript:;" onClick={handleChangeListType.bind(this,"price_up")}>价格</a>
                    </span>
                </div>
            </div>
        )
    }
}
export default ListHeader;