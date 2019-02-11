import React, { Component } from 'react';

import FinderArticle from '@/page/finder/FinderArticle';

class FinderBody extends Component {
    constructor() {
        super();
        this.state = {
            selectedClassId:1813
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(id){
        this.setState({
            selectedClassId:id
        })
    }

    render() {
        let {selectedClassId} = this.state;
        let {gcData,handleGotoList} = this.props;
        let articleList = gcData.filter(item=>item.gc_id==selectedClassId)[0];
        return (
            <div className="finder-body">
                <ul className="first-list">
                    {
                        gcData.map(items=>{
                            return <li key={items.gc_id} className={"fir-class" + (items.gc_id==selectedClassId ? " active" : "")} onClick={()=>this.handleSelect(items.gc_id)}>
                                {items.gc_name}
                            </li>
                        })
                    }
                </ul>
                <FinderArticle articleList={articleList} handleGotoList={handleGotoList}/>
            </div>
        )
    }
}
export default FinderBody;