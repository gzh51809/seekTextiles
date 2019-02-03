import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

class DetailsSpec extends Component {
    constructor(){
        super();
        this.state = {
            carouselRef:null
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    handleMouseMove = () => {
        // if(a){
            //走马灯绑定事件，阻止冒泡
        //   $('.am-popover-mask').on('click touchstart touchmove', (e) => {
        //     e.stopPropagation()
        //   })
            console.log('lala:',this.carouselRef);
            this.carouselRef.getElementsByClassName('slider-frame')[0].addEventListener('touchmove',(e)=>{
                console.log('e:',e);
                e.stopPropagation();
            },false)
        // } else {
            // 注意解绑事件
            // $('.am-popover-mask').off('click touchstart', (e) => {
            //     e.stopPropagation()
            // })
        // }
    };
    componentDidMount(){
        this.handleMouseMove();
    }
    render() {
        console.log('spec:',this.props)
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
            </div>
        )
    }
}
export default DetailsSpec;