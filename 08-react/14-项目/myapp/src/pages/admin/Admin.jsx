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

import { Layout } from 'antd';
const { Footer, Content } = Layout;

export default class Admin extends Component {
    _toggle(){

    }
    render() {
        return (
            <Layout className="admin-pane">
                {/* 左边的NAV */}
                <LeftNav></LeftNav>
                {/* 右边内容 */}
                <Layout>
                    {/* 右边上面的Header */}
                    <RightHeader collapsed={true} toggle={ this._toggle } />
                    {/* 主面板 */}
                    <Content className="admin-content">
                        <Switch>
                            <Redirect path="/" exact to="/home" />
                            <Route path="/home" component={Home} />
                            <Route path="/resource" component={Resource} />
                            <Route path="/lifejob" component={Lifejob} />
                            <Route path="/activities" component={Activities} />
                            <Route path="/live" component={Lives} />
                            <Route path="/setting" component={Setting} />
                            <Route path="*" component={NotFount} />
                        </Switch>
                    </Content>
                    <Footer className="admin-footer">我是网站的底部</Footer>
                </Layout>
            </Layout>
        )
    }
}
