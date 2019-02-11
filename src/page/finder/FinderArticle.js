import React, { Component } from 'react';

class FinderArticle extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {articleList,handleGotoList} = this.props;
        return (
            <div className="finder-article">
            {
                articleList.subclass.map(items=>{
                    return <div className="sec-list" key={items.gc_id}>
                        <div onClick={()=>{
                            handleGotoList(items.gc_id);
                        }}>
                            <i className="iconfont icon-dian"></i>
                            <span>{items.gc_name}</span>
                            <i className="iconfont icon-right-line"></i>
                        </div>
                        <ul>
                        {
                            items.subclass ?
                            items.subclass.map(item=>{
                                return <li key={item.gc_id} onClick={()=>{
                                    handleGotoList(item.gc_id);
                                }}>
                                    {item.gc_name}
                                </li>
                            }) : null
                        }
                        </ul>
                    </div>
                })
            }
            </div>
        )
    }
}
export default FinderArticle;