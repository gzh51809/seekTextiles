import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';

class HomeRank extends Component {
    render() {
        let {rankList} = this.props;
        return (
            <div className="home-rank">
                <div className="rank-name">
                    <img src={require("./img/icon_rank_title.png")} />
                    <span>每周更新，敬请关注</span>
                </div>
                <Tabs tabs={this.props.rankList}
                    initialPage={1}
                    tabBarPosition="bottom"
                    tabBarUnderlineStyle="none"
                    swipeable={false}
                    tabBarBackgroundColor="transparent"
                    renderTab={tab => <span className="rank-btn">{tab.item_title}</span>}
                >
                {
                    this.props.rankList.map(part=>{
                        return (
                            <div className="rank-part" key={part.item_title}>
                                <div>
                                    <h3>{part.item_title}</h3>
                                    <span>{part.item_subtitle}</span>
                                </div>
                                <ul>
                                {
                                    part.item_list.map(item=>{
                                        return (
                                            <li key={item.goods_id}>
                                                <img src={item.goods_image_url}/>
                                                <p>{item.goods_name}</p>
                                                <strong>{item.goods_price}</strong>
                                            </li>
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        )
                    })
                }
                </Tabs>
            </div>
        )
    }
}
export default HomeRank;