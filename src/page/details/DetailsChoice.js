import React, { Component } from 'react';
import { Modal } from 'antd-mobile';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}


class DetailsChoice extends Component {
    constructor() {
        super();
        this.state = {
            modal1: false,
        }
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }


    render() {
        let { goods_spec_sel, goods_specs, spec_info } = this.props;
        return (
            <div className="con-choice">
                <div className="choice-box" onClick={this.showModal('modal1')}>
                    <label>已选</label>
                    <span>
                        <span className="cho-size">{goods_spec_sel[0]}</span>
                        <span>{goods_spec_sel[1]}</span>
                    </span>
                    <i className="iconfont icon-right-line"></i>
                    <div>
                        <ul>
                            {
                                spec_info.spec_images_top.map((item, idx) => {
                                    return (
                                        <li key={idx}>
                                            <img src={item} alt="" />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="cho-text">
                            共{spec_info.spec_size}种颜色可选
                        </div>
                    </div>
                </div>
                <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                popup
                animationType="slide-up"
                title="Title"
                footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                        scoll content...<br />
                    </div>
                </Modal>
                <div className="choice-box">
                    <label>参数</label>
                    <i className="iconfont icon-right-line"></i>
                </div>
            </div>
        )
    }
}
export default DetailsChoice;