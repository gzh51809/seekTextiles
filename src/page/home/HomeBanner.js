import React,{Component} from 'react';
import { Carousel } from 'antd-mobile';

class HomeBanner extends Component{
    constructor(){
        super();
        this.state = {
            imgHeight:280
        }
    }
    render(){
        let {banners,handleToPage} = this.props;
        return (
            <div className="home-banner">
                <Carousel
                selectedIndex={0}
                autoplay={true}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                    {banners.map(item => (
                        <a
                        key={item.imgUrl}
                        href="javascript:;"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        onClick={()=>handleToPage(item.href)}
                        >
                            <img
                                src={item.imgUrl}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
            </div>
        )
    }
}
export default HomeBanner;