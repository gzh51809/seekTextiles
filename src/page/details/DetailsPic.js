import React, { Component } from 'react';

class DetailsPic extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let {goods_body} = this.props;
        let reg = /></g;
        let pic_list = goods_body.split('<body>')[1].split('</body>')[0].replace(reg,'>,<').split(',');
        return (
            <div className="con-pic">
                <h3>图文详情</h3>
                {
                    pic_list.map((item,idx)=><p key={idx} dangerouslySetInnerHTML={{__html:item}}></p>)
                }
            </div>
        )
    }
}
export default DetailsPic;