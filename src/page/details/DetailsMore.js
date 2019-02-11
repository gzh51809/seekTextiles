import React, { Component } from 'react';
import { Popover, Switch } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

const Item = Popover.Item;


class DetailsMore extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            selected: '',
        }
    }

    onSelect = (opt) => {
        // console.log(opt.props.value);
        switch(opt.props.value){
            case 'home':
                this.props.history.push('/home');
                break;
            case 'mine':
                this.props.history.push('/mine');
                break;
            default:
                this.setState({
                    visible: false,
                    selected: opt.props.value,
                });
        }
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    render() {
        return (
            <Popover 
                className="detail-more"
                mask
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                visible={this.state.visible}
                overlay={[
                    (<Item key="4" value="msg" icon={<i className="iconfont icon-iconfontzhizuobiaozhun023110"></i>}>消息</Item>),
                    (<Item key="5" value="home" icon={<i className="iconfont icon-shouye"></i>} style={{ whiteSpace: 'nowrap' }}>首页</Item>),
                    (<Item key="6" value="mine" icon={<i className="iconfont icon-gerenzhongxin"></i>}>个人中心</Item>),
                    (<Item key="7" value="feedback" icon={<i className="iconfont icon-woyaofankui"></i>}>我要反馈</Item>),
                ]}
                align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [0, 10],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
            >
                
                <i className="iconfont icon-gengduo"></i>
            </Popover>
        )
    }
}

DetailsMore = withRouter(DetailsMore);
export default DetailsMore;