import React,{Component} from 'react';

class HomeRecommend extends Component{
    render(){
        let {recomDatas} = this.props;
        return (
            <div className="home-recommend">
                <div>
                    <h3>{recomDatas.item_title}</h3>
                    <p>{recomDatas.item_subtitle}</p>
                </div>
                <ul>
                    {
                        recomDatas.item_list.map(item=>{
                            return (
                                <li key={item.goods_id}>
                                    <img src={item.goods_image_url}/>
                                    <p>{item.goods_name}</p>
                                    <span>{item.subtitle}</span>
                                    <strong>{item.goods_price}</strong>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default HomeRecommend;