import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

import DetailsNav from './DetailsNav';

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
        let {goodsData} = this.props;
        return (
            <div className="det-content">
                <div ref={c => {this.carouselRef = c;}}>
                    <Carousel
                    selectedIndex={0}
                    infinite
                    beforeChange={(from, to) => {
                        console.log(`slide from ${from} to ${to}`);
                    }}
                    afterChange={index => console.log('slide to', index)}
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
            </div>
        )
    }
}
export default DetailsSpec;