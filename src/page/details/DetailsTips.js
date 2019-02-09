import React, { Component } from 'react';

class DetailsTips extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {activitys} = this.props;
        return (
            <div className="con-tips">
                <label>{activitys.title}</label>
                <span>{activitys.description}</span>
                <i className="iconfont icon-right-line"></i>
            </div>
        )
    }
}
export default DetailsTips;