import React,{Component} from 'react';
import '@/sass/finder.scss';
import axios from 'axios';

import BottomBar from '@com/BottomBar';
import FinderHeader from '@/page/finder/FinderHeader';
import FinderBody from '@/page/finder/FinderBody';

class Finder extends Component{
    constructor(){
        super();
        this.state={
            goodsClassData:[]
        }

        this.gotoList = this.gotoList.bind(this);
    }

    gotoList(gcid){
        this.props.history.push('/list/'+gcid);
    }

    componentWillMount(){
        axios({
            method:'get',
            url:`http://api.zhaojiafang.com/v1/goods/goodsclass`,
            params:{
                AppVersion: '3.11',
                Format: 'json',
                SystemName: 'H5',
                deep: 3,
                key: '650667dca833b4596c95ada0b81afb34',
                storeid: 1,
                timestamp: 1549867773981,
                Sign: 'bd075bbbb75a45a5893425a038cb5fee'
            }
        }).then(res=>{
            let data = res.data.datas;
            this.setState({
                goodsClassData:data
            })
        }).catch((err)=>{
            console.log(err);
        });
    }
    render(){
        return (
            <div className="page finder">
                <div className="finder-main">
                    <FinderHeader/>
                    {
                        this.state.goodsClassData.length > 0 ?
                        <FinderBody gcData={this.state.goodsClassData} handleGotoList={this.gotoList}/> :
                        null
                    }
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
            
        )
    }
}

export default Finder;