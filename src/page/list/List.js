import React, { Component } from 'react';
import axios from 'axios';
import '@/sass/list.scss';

import listRequestData from '@/mock/listRequestData.json';

import ListHeader from './ListHeader';
import ListGrid from './ListGrid';

class List extends Component {
    constructor() {
        super();
        this.state = {
            goodsList:[],
            listType:'init',
            scrollRef:null,
            currentPage:1,
            loading:false,
            reqDataIndex:0,
            layout:true,
            loadAll:false
        }

        this.updateGoodslist = this.updateGoodslist.bind(this);
        this.changeListType = this.changeListType.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.gotoDetail = this.gotoDetail.bind(this);
        this.backPage = this.backPage.bind(this);
    }

    // 滚动加载recommend数据
    onScrollHandle = () => {
        const scrollTop = this.scrollRef.scrollTop;
        const clientHeight = this.scrollRef.clientHeight;
        const scrollHeight = this.scrollRef.scrollHeight;
        const isBottom = scrollTop + clientHeight + 200 >= scrollHeight;
        if (isBottom && scrollTop) {
            this.updateGoodslist();
        }
    };

    // 更改列表类型排序
    changeListType(listType){
        this.setState({
            currentPage:1,
            listType
        },()=>this.updateGoodslist())
    }

    // 根据现有的state请求数据
    updateGoodslist(){
        let {currentPage,loading,reqDataIndex,listType,goodsList} = this.state;
        let _list = listRequestData[reqDataIndex][listType];
        if(!loading){
            let page = currentPage;
            if(page > _list.length){
                this.setState({
                    loadAll:true
                })
                return
            }
            let params = _list[page-1];
            page++;
            this.setState({
                loading:true,
                currentPage:page
            })
            axios({
                method:'get',
                url:`http://api.zhaojiafang.com/v1/goods/goodslist`,
                params
            }).then(res=>{
                let _goodsList = goodsList;
                let data = res.data.datas;
                if(page>2){
                    _goodsList = _goodsList.concat(data);
                }else{
                    _goodsList = data;
                }
                this.setState({
                    goodsList:_goodsList,
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

    // 跳转详情页
    gotoDetail(gid){
        this.props.history.push('/details/' + gid);
    }

    backPage(){
        this.props.history.goBack();
    }

    componentWillMount(){
        let {gcid} = this.props.match.params;
        // 用请求数据数组长度计算获取哪个产品请求数据
        let _reqDataIndex = gcid%listRequestData.length;
        this.setState({
            reqDataIndex:_reqDataIndex
        },()=>this.updateGoodslist())
    }

    render() {
        let {layout,goodsList,loading,loadAll} = this.state;
        return (
            <div className="list">
                <ListHeader layout={layout} handleChangeLayout={this.changeLayout} handleChangeListType={this.changeListType} handleBack={this.backPage}/>
                <div 
                    className="list-main"
                    ref={c => {this.scrollRef = c;}}
                    onScrollCapture={() =>this.onScrollHandle()}
                >
                {
                    goodsList.length > 0 ?
                    <ListGrid goodsList={goodsList} layout={layout} handleToDetail={this.gotoDetail}/> : null
                }
                {
                    loading ?
                    <div className="list-loading"><img src={require("../home/img/home-loading.gif")}/></div> :
                    null
                }
                {
                    loadAll ? <p className="list-all">没有更多数据了</p> : null
                }
                </div>
            </div>
        )
    }
}
export default List;