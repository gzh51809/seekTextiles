import React, { Component } from 'react';

class DetailsArticle extends Component {
    render() {
        let {mobile_body,goods_subname,goods_price,goods_weight,goods_otherinfo} = this.props;
        return (
            <div className="con-article">
                <h4>{mobile_body}</h4>
                <p>{goods_subname}</p>
                <div>
                    <strong>{goods_price}</strong>
                    <span>({goods_weight}/件)</span>
                </div>
                <div>
                    <span>{goods_otherinfo[0]}</span>
                    <span>{goods_otherinfo[1]}</span>
                </div>
            </div>
        )
    }
}
export default DetailsArticle;