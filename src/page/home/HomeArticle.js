import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

class HomeArticle extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    componentWillMount(){

    }
    render() {
        return (
            <div className="home-article">
                
                <Carousel className="art-carousel"
                    vertical
                    dots={false}
                    dragging={false}
                    swiping={false}
                    autoplay={this.props.isok}
                    infinite
                    autoplayInterval={1500}
                >
                    {this.props.articles.list.map(item=>{
                        return (
                            <div className="art-item" key={item.article_id}>{item.article_title}</div>
                        )
                    })}
                </Carousel>
            </div>
        )
    }
}
export default HomeArticle;