import React, { Component } from 'react';

import LayoutBtn from '@com/LayoutBtn';

class ListHeader extends Component {
    constructor() {
        super();
        this.state = {
            rank:false
        }
        this.changeRank = this.changeRank.bind(this);
    }

    changeRank(){
        let rank = !this.state.rank;
        this.setState({
            rank
        });
        let priceRank = '';
        if(rank){
            priceRank = 'price_up';
        }else{
            priceRank = 'price_down';
        }
        this.props.handleChangeListType(priceRank);
    }

    render() {
        let {handleChangeLayout,layout,handleChangeListType,handleBack,listType} = this.props;
        return (
            <div className="list-header">
                <div>
                    <i className="iconfont icon-zuo" onClick={handleBack}></i>
                    <span>
                        <input type="text" placeholder="搜索商品、商家" autoFocus/>
                        <i className="iconfont icon-iconset0157"></i>
                    </span>
                    <LayoutBtn layout={layout} handleChangeLayout={handleChangeLayout}/>
                </div>
                <div>
                    <strong>有筛选</strong>
                    <span>
                        <a href="javascript:;" className={listType==='synthesis'?'active':''} onClick={handleChangeListType.bind(this,"synthesis")}>综合</a>
                        <a href="javascript:;" className={listType==='sales'?'active':''} onClick={handleChangeListType.bind(this,"sales")}>销量</a>
                        <a href="javascript:;" className={listType==='new'?'active':''} onClick={handleChangeListType.bind(this,"new")}>新品</a>
                        <a href="javascript:;" 
                            className={listType==='price_up'?'up':(listType==='price_down')?'down':''} 
                            onClick={this.changeRank}
                        >价格</a>
                    </span>
                </div>
            </div>
        )
    }
}
export default ListHeader;