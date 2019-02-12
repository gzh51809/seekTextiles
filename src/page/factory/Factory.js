import React,{Component} from 'react';
import axios from 'axios';
import '@/sass/factory.scss';

import BottomBar from '@com/BottomBar';
import FactoryHeader from './FactoryHeader';
import FactoryMainTop from './FactoryMainTop';

import storeRequestData from '@/mock/storeRequestData.json';


class Factory extends Component {
    constructor() {
        super();
        this.state = {
            storeList:[],
            scrollRef:null,
            currentPage:1,
            loading:false,
            reqDataIndex:0,
            layout:true,
            loadAll:false,
            selectedType:'total'
        }

        this.updateStorelist = this.updateStorelist.bind(this);
        this.changeReqDataIndex = this.changeReqDataIndex.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.gotoList = this.gotoList.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    // 滚动加载数据
    onScrollHandle = () => {
        const scrollTop = this.scrollRef.scrollTop;
        const clientHeight = this.scrollRef.clientHeight;
        const scrollHeight = this.scrollRef.scrollHeight;
        const isBottom = scrollTop + clientHeight + 200 >= scrollHeight;
        if (isBottom && scrollTop) {
            this.updateStorelist();
        }
    };

    // 更改列表类型排序
    changeReqDataIndex(){
        let idx = !this.state.reqDataIndex*1;
        this.setState({
            currentPage:1,
            reqDataIndex:idx
        },()=>this.updateStorelist())
    }

    // 根据现有的state请求数据
    updateStorelist(){
        let {currentPage,loading,reqDataIndex,storeList,selectedType} = this.state;
        let _list = storeRequestData[selectedType].list[reqDataIndex];
        if(!loading){
            let page = currentPage;
            if(page > _list.length){
                this.setState({
                    loadAll:true
                })
                return
            }
            this.setState({
                loadAll:false
            })
            let params = _list[page-1];
            page++;
            this.setState({
                loading:true,
                currentPage:page
            })
            axios({
                method:'get',
                url:`http://api.zhaojiafang.com/v1/store/shoplist`,
                params
            }).then(res=>{
                let _storeList = storeList;
                let data = res.data.datas.contents;
                if(page>2){
                    _storeList = _storeList.concat(data);
                }else{
                    _storeList = data;
                }
                this.setState({
                    storeList:_storeList,
                    loading:false
                })
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            console.log('loading')
        }
    }

    // 改变布局
    changeLayout(){
        let layout = !this.state.layout;
        this.setState({
            layout
        })
    }

    // 跳转列表页
    gotoList(gid){
        this.props.history.push('/list/' + gid);
    }

    // 选择商店类别
    handleSelect(name){
        this.setState({
            currentPage:1,
            selectedType:name
        },()=>this.updateStorelist())
    }

    componentWillMount(){
        this.updateStorelist();
    }

    render() {
        let {layout,storeList,loading,loadAll,selectedType} = this.state;
        return (
            <div className="page factory">
                <FactoryHeader layout={layout} handleChangeLayout={this.changeLayout}/>
                <div className="factory-main">
                    <div className="main-box">
                        <FactoryMainTop layout={layout} handleChangeReq={this.changeReqDataIndex}/>
                        {
                            layout ?
                            (<div className="main-body fac-body-grid">
                                <ul className="type-list">
                                    {
                                        storeRequestData.typelist.map(items=>{
                                            return <li key={items.type} className={"type-class" + (items.type==selectedType ? " active" : "")} onClick={()=>this.handleSelect(items.type)}>
                                                {items.name}
                                            </li>
                                        })
                                    }
                                </ul>
                                <div
                                ref={c => {this.scrollRef = c;}}
                                onScrollCapture={() =>this.onScrollHandle()}
                                >
                                    <ul>
                                    {
                                        storeList.map(item=>{
                                            return <li 
                                            key={item.store_id}
                                            onClick={()=>this.gotoList(item.store_id)}
                                            >
                                                <img src={item.store_avatarurl} alt=""/>
                                                <p>{item.store_name}</p>
                                                <span>关注</span>
                                            </li>
                                        })
                                    }
                                    </ul>
                                    {
                                        loading ?
                                        <div className="list-loading"><img src={require("../home/img/home-loading.gif")}/></div> :
                                        null
                                    }
                                    {
                                        loadAll ? <p className="list-all">没有更多数据了</p> : null
                                    }
                                </div>
                            </div>) :
                            (<div 
                                className="main-body fac-body-list"
                                ref={c => {this.scrollRef = c;}}
                                onScrollCapture={() =>this.onScrollHandle()}
                            >
                                <ul>
                                {
                                    storeList.map(items=>{
                                        return <li key={items.store_id} onClick={()=>this.gotoList(items.store_id)}>
                                            <div>
                                                <img src={items.store_avatarurl} alt=""/>
                                                <em>{items.store_name}</em>
                                                <span>关注</span>
                                            </div>
                                            <div>
                                            {
                                                items.store_infos.map((item,idx)=><p key={idx}>{item}</p>)
                                            }
                                            </div>
                                            <div>
                                                <span>{items.store_otherinfo}</span>
                                                <span>
                                                    <i className="iconfont icon-qq"></i>
                                                    <i className="iconfont icon-dianhua"></i>
                                                </span>
                                            </div>
                                        </li>
                                    })
                                }
                                </ul>
                                {
                                    loading ?
                                    <div className="list-loading"><img src={require("../home/img/home-loading.gif")}/></div> :
                                    null
                                }
                                {
                                    loadAll ? <p className="list-all">没有更多数据了</p> : null
                                }
                            </div>)
                        }
                    </div>
                </div>
                <footer>
                    <BottomBar/>
                </footer>
            </div>
        )
    }
}
export default Factory;