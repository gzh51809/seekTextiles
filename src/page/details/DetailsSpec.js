import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import DetailsNav from './DetailsNav';
import DetailsArticle from './DetailsArticle';
import DetailsChoice from './DetailsChoice';
import DetailsTips from './DetailsTips';
import DetailsStore from './DetailsStore';
import DetailsText from './DetailsText';
import DetailsRecommend from './DetailsRecommend';

class DetailsSpec extends Component {
    constructor(){
        super();
        this.state = {
            carouselRef:null
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    handleMouseMove = () => {
            // 试图阻止Carousel组件冒泡失败
            console.log('lala:',this.carouselRef);
            this.carouselRef.getElementsByClassName('slider-frame')[0].ontouchstart = (e)=>{
                console.log('slider-frame ontouchmove:',e);
                // e.stopPropagation();
            }
            this.carouselRef.ontouchstart = (e)=>{
                console.log('div ontouchmove:',e);
                e.stopPropagation();
            }
    };
    componentDidMount(){
        // this.handleMouseMove();
    }
    render() {
        let {goodsData,handleUpdate,handleToDetail,qty,handleComputeNum,handleInputNum,handleAddToCart} = this.props;
        return (
            <div className="det-spec">
                <div ref={c => {this.carouselRef = c;}}>
                    <Carousel
                    selectedIndex={0}
                    infinite
                    // beforeChange={(from, to) => {
                    //     console.log(`slide from ${from} to ${to}`);
                    // }}
                    // afterChange={index => console.log('slide to', index)}
                    >
                        {goodsData.goods_oriimage.map((item,idx) =>{
                            return (
                                <img
                                    key={idx}
                                    src={item}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            )
                        } 
                        )}
                    </Carousel>
                </div>
                <DetailsNav goods_functions={goodsData.goods_functions}/>
                <DetailsArticle goodsData={goodsData}/>
                <DetailsChoice 
                    goodsData={goodsData} 
                    handleUpdate={handleUpdate} 
                    qty={qty} 
                    handleComputeNum={handleComputeNum} 
                    handleInputNum={handleInputNum} 
                    handleAddToCart={handleAddToCart}
                />
                <DetailsTips activitys={goodsData.activitys}/>
                <DetailsStore store_info={goodsData.store_info}/>
                <DetailsText mobile_body={goodsData.mobile_body}/>
                <DetailsRecommend store_recommend={goodsData.store_recommend} handleToDetail={handleToDetail}/>
            </div>
        )
    }
}
export default DetailsSpec;