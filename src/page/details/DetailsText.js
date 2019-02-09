import React, { Component } from 'react';

class DetailsText extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {mobile_body} = this.props;
        return (
            <div className="con-text">
                <span>{mobile_body}</span>
            </div>
        )
    }
}
export default DetailsText;