import React,{Component} from 'react';

class HomeNav extends Component{
    constructor(){
        super();
        this.state = {
            iconNavTabs:[
                {
                    iconPic:require('./img/icon_nav1.png'),
                    name:'床品套件'
                },
                {
                    iconPic:require('./img/icon_nav2.png'),
                    name:'被子被芯'
                },
                {
                    iconPic:require('./img/icon_nav3.png'),
                    name:'枕头枕芯'
                },
                {
                    iconPic:require('./img/icon_nav4.png'),
                    name:'床垫褥子'
                },
                {
                    iconPic:'http://api.zhaojiafang.com/public/image/icons/index/icon_nav_mianliao.png',
                    name:'面料商城'
                },
                {
                    iconPic:require('./img/icon_nav6.png'),
                    name:'毛毯毯子'
                },
                {
                    iconPic:require('./img/icon_nav7.png'),
                    name:'夏凉用品'
                },
                {
                    iconPic:require('./img/icon_nav8.png'),
                    name:'家具布艺'
                },
                {
                    iconPic:'http://api.zhaojiafang.com/public/image/icons/index/icon_nav_gymaojing.jpg',
                    name:'高阳毛巾'
                },
            ],
        }
    }
    render(){
        return (
            <ul className="home-nav">
                {
                    this.state.iconNavTabs.map(item=>{
                        return (
                        <li key={item.name}>
                            <img src={item.iconPic} />
                            <span>{item.name}</span>
                        </li>
                        )
                    })
                }
            </ul>
        )
    }
}
export default HomeNav;