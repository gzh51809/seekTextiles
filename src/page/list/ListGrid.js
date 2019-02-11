import React, { Component } from 'react';

class ListGrid extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {goodsList,layout,handleToDetail} = this.props;
        return (
            <ul className={layout ? "list-grid" : "list-list"}>
            {
                goodsList.map(item=>{
                    return (
                    <li key={item.goods_id} onClick={()=>handleToDetail(item.goods_id)}>
                        <img src={item.goods_image_url} alt=""/>
                        <div>
                            <p>{item.goods_name}</p>
                            <span>{item.goods_subname}</span>
                            <div className="list-tag">
                                {
                                    item.tags.length > 0 ?
                                    (
                                    item.tags.map((tag,idx)=>{
                                        return <em key={idx} style={{color:'#'+tag.fontcolor,borderColor:'#'+tag.bordercolor}}>{tag.tagname}</em>
                                    })
                                    ) : null
                                }
                            </div>
                            <div>
                                <strong>{item.goods_price}</strong>
                                <span>{item.otherinfo}</span>
                            </div>
                        </div>
                    </li>
                    )
                })
            }
            </ul>
        )
    }
}
export default ListGrid;