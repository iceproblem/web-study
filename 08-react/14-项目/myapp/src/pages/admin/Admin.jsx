import React, { Component } from 'react'
import { Switch,Route,Redirect } from "react-router-dom"
import LeftNav from "./components/left-nav/LeftNav"
import RightHeader from "./components/right-header/RightHeader"

import "./admin.css"

// 引入二级组件
import Home from "../home/Home"
import Resource from "../resource/Resource"
import Lifejob from "../lifejob/Lifejob"
import Activities from "../activities/Activities"
import Lives from "../lives/Lives"
import Setting from "../setting/Setting"
import NotFount from '../notFount/NotFount'

import {isLogin} from "../../api/adminApi"

import { Layout } from 'antd';
const { Footer, Content } = Layout;

export default class Admin extends Component {
    state = {
        collapsed:true
    }
    _toggle(){
        this.setState({
         collapsed: !this.state.collapsed,
        });
    }
    render() {
        // isLogin()如果是false表示没有登录
        // if(!isLogin()){
        // 没有登录
        //    return <Redirect to="/login"></Redirect>
        // }
        // 代表登录了
        return (
            <Layout className="admin-pane">
                {/* 左边的NAV */}
                <LeftNav collapsed={this.state.collapsed}></LeftNav>
                {/* 右边内容 */}
                <Layout>
                    {/* 右边上面的Header */}
                    <RightHeader collapsed={this.state.collapsed} toggle={ this._toggle.bind(this) }></RightHeader>
                    {/* 主面板 */}
                    <Content className="admin-content">
                        <Switch>
                            <Redirect path="/" exact to="/home"></Redirect>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/resource" component={Resource}></Route>
                            <Route path="/lifejob" component={Lifejob}></Route>
                            <Route path="/activities" component={Activities}></Route>
                            <Route path="/live" component={Lives}></Route>
                            <Route path="/setting" component={Setting}></Route>
                            <Route path="*" component={NotFount}></Route>
                        </Switch>
                    </Content>
                    <Footer className="admin-footer">我是网站的底部</Footer>
                </Layout>
            </Layout>
        )
    }
}
