import React, { Component } from 'react';

class DetailsRecommend extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {store_recommend,handleToDetail} = this.props;
        return (
            <div className="con-recommend">
                <div className="recommend-header">
                    <em></em>
                    <span><img src={require("@/page/details/img/recommend.png")}/>推荐</span>
                    <em></em>
                </div>
                <ul>
                    {
                        store_recommend.map(item=>{
                            return (
                            <li key={item.goods_id} onClick={()=>handleToDetail(item.goods_id)}>
                                <img src={item.goods_image_url} alt=""/>
                                <p>{item.goods_name}</p>
                                <div>
                                    <strong>{item.goods_price}</strong>
                                    <span>{item.otherinfo}</span>
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default DetailsRecommend;