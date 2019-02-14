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
            modal2: false,
            ids:{},
            qty:1
        }

        this.showModal = this.showModal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onWrapTouchStart = this.onWrapTouchStart.bind(this);
        this.handleChangeIds = this.handleChangeIds.bind(this);
        this.handleInputNum = this.handleInputNum.bind(this);
        this.handleComputeNum = this.handleComputeNum.bind(this);
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

    handleChangeIds(obj){
        //传入需要修改id对象，键名为spec_id，键值为spec_valueid
        let newIds = this.state.ids;
        newIds = {...newIds,...obj};
        this.setState({
            ids:newIds
        },()=>{
            this.props.handleUpdate(this.state.ids);
        })
    }

    handleInputNum(e){
        if(!isNaN(e.target.value) && (e.target.value>=1) && (e.target.value<=99)){
            this.props.handleInputNum(e.target.value);
        }
    }

    handleComputeNum(e){
        this.props.handleComputeNum(e.target.className);
    }


    componentWillMount(){
        let initIds = {};
        this.props.goodsData.goods_specs.forEach(items => {
            initIds[items.spec_id] = items.spec_values.filter(item=>{
                return item.ischecked
            })[0].spec_valueid;
        });
        this.setState({
            ids:initIds
        })
    }

    render() {
        let {goodsData,qty,handleAddToCart} = this.props;
        let { goods_spec_sel, goods_specs, spec_info, goods_price, goods_weight, goods_attributes,goods_oriimage } = goodsData;
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
                className="choice-modal"
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                popup
                animationType="slide-up"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className="modal-color">
                        <div className="color-header">
                            <div>
                                <img src={goods_oriimage[0]} alt=""/>
                            </div>
                            <div>
                                <strong>{goods_price}</strong>
                                <i className="iconfont icon-guanbi" onClick={()=>{
                                    this.onClose('modal1')();
                                }}></i>
                                <p>
                                    <em>已选</em>
                                    <span>{}</span>
                                </p>
                                <p>
                                    <em>重量</em>
                                    <span>{goods_weight}</span>
                                </p>
                            </div>
                        </div>
                        <div className="color-main">
                            {
                                goods_specs.map(items=>{
                                    return (
                                    <div className="color-opt" key={items.spec_id}>
                                        <p>{items.spec_title}</p>
                                        <ul>
                                            {
                                                items.spec_values.map(item=>{
                                                    return (
                                                        <li 
                                                        key={item.spec_valueid}
                                                        className={item.spec_valueid === this.state.ids[items.spec_id]?'active':''}
                                                        onClick={()=>{
                                                            let obj = {};
                                                            obj[items.spec_id] = item.spec_valueid;
                                                            this.handleChangeIds(obj);
                                                        }}
                                                        >
                                                        {item.spec_value}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    )
                                })
                            }
                            <div className="color-num">
                                <span>数量</span>
                                <div>
                                    <a href="javascript:;" className="sub" onClick={this.handleComputeNum}>-</a>
                                    <input type="text" value={qty} onChange={this.handleInputNum}/>
                                    <a href="javascript:;" className="add" onClick={this.handleComputeNum}>+</a>
                                </div>
                            </div>
                        </div>
                        <div className="color-footer">
                            <a href="javascript:;" onClick={handleAddToCart}>加入购物车</a>
                            <a href="javascript:;">立即购买</a>
                        </div>
                    </div>
                </Modal>
                <div className="choice-box" onClick={this.showModal('modal2')}>
                    <label>参数</label>
                    <i className="iconfont icon-right-line"></i>
                </div>
                <Modal
                className="choice-modal"
                visible={this.state.modal2}
                transparent
                onClose={this.onClose('modal2')}
                popup
                animationType="slide-up"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className="modal-argument">
                        <div className="argument-header">
                            商品参数
                        </div>
                        <div className="argument-main">
                        {
                            goods_attributes.map((item,idx)=>{
                                let arr = item.split('|');
                                return (
                                <p key={idx}>
                                    <span>{arr[0]}</span>
                                    <span>{arr[1]}</span>
                                </p>
                                )
                            })
                        }
                        </div>
                        <div className="argument-btn" onClick={this.onClose('modal2')}>
                            知道了
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default DetailsChoice;