import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';

let HomeHeader = props=>{
    return (
        <div className="home-header">
            <div>
                <a href="javascript:;" id="btnQRCode"><i className="iconfont icon-erweima"></i></a>
            </div>
            <div>
                <NavLink to={props.match.path + "/find"} activeClassName="active">发现</NavLink>
                <NavLink to={props.match.path + "/focus"} activeClassName="active">关注</NavLink>
            </div>
            <div>
                <a href="javascript:;" id="btnCamera"><i className="iconfont icon-paizhao"></i></a><a href="javascript:;" id="btnPhone"><i className="iconfont icon-dianhua"></i></a>
            </div>
        </div>
    )
}
HomeHeader = withRouter(HomeHeader);
export default HomeHeader;