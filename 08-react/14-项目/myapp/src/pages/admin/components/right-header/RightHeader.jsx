import React, { Component } from 'react'
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import logo from "../left-nav/images/logo.png"
import "./right-header.css"

import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';

import { Layout,Button,Modal,message } from 'antd';
import { removeUser, checkLogOut} from "../../../../api/adminApi";
const { Header } = Layout;
const { confirm } = Modal

class RightHeader extends Component {
    static propTypes = {
        collapsed:PropTypes.bool.isRequired,
        toggle:PropTypes.func.isRequired,
    }
    _logout(e){
        confirm({
            title:"你确定要退出吗？",
            cancelText:"取消",
            okText:"确认",
            onOk:()=>{
                checkLogOut().then(result=>{
                    // console.log(result);
                    if(result && result.status === 1){
                        removeUser()
                        message.success(result.msg)

                        // 切换到登录页面
                        this.props.history.replace("/login")
                    }else{
                        message.error("网络可能出问题了，检查你的网站~")
                    }
                })
            }
        })
    }
    render() {
        return (
            <Header className="header" style={{padding:0}}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,{
                    className:"trigger",
                    onClick:this.props.toggle
                })}
                <div className="navbar-header">
                    <h3 className="navbar-brand">XXX管理系统</h3>
                    <div className="navbar-header-right">
                        <img width="50" src={logo} alt=""/>
                        <Button type="danger" className="exit-btn" onClick={ e=>this._logout(e) }>退出</Button>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader)
