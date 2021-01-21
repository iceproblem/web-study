import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import PubSub from "pubsub-js"
import "./LeftNav.css"
import "./fonts/iconfont.css"
import logo from "./images/logo.png"
import { getUser } from "../../../../api/adminApi"

import menus from "./config/menuConfig.json"

import { Menu } from 'antd'
import { Layout } from 'antd';
const {  Sider } = Layout;
const { SubMenu,Item  } = Menu;

class LeftNav extends Component {
    constructor(){
        super()

        this.state = {
            menuList:menus,
            account_name:getUser().account_name,
            account_icon:getUser().account_icon
        }
    }
    // 渲染菜单
    _renderMenu(menuList){
        // 根据数据渲染出菜单
        return menuList.map(item=>{
            if(!item.children){
                // 渲染Item
                return (
                        <Item key={item._key}>
                            <Link to={item._key}>
                                <span className={item.icon}></span>
                                <span>{item.title}</span>
                            </Link>
                        </Item>
                )
            }else{
                // 渲染SubMenu
                return(
                    <SubMenu key={item._key} title={
                        <span>
                            <span className={item.icon}></span>
                            <span>{item.title}</span>
                        </span>
                    }>
                       { this._renderMenu(item.children) }
                    </SubMenu>
                )
            }
        })
    }
    // 查找要让哪个Submenu展开
    _getOpenKeys (menuList,path) {
        for(let i=0; i<menuList.length; i++){
            let item = menuList[i]
            if(item.children && item.children.find(c_item=>c_item._key === path)){
                return item._key
            }
        }
    }
    render() {
        let {account_name,account_icon,menuList} = this.state;
        let path = this.props.location.pathname; // 获取当前的路由
        let ppath = path.substr(0,path.indexOf("/",2)) ? path.substr(0,path.indexOf("/",2)) : path;
        let itemKeys = this._getOpenKeys(menuList,path)
        return (
            <Sider>
                <div className="logo">
                    <div className="avatar">
                        <img src={ account_icon ? account_icon : logo} alt=""/>
                    </div>
                    <h4>{ account_name ? account_name : "管理员" }</h4>
                </div>
                <Menu
                    defaultSelectedKeys={[path]}
                    selectedKeys={[path,ppath]}
                    defaultOpenKeys={itemKeys}
                    mode="inline"
                    theme="dark"
                >
                    { this._renderMenu(this.state.menuList) }
                </Menu>
            </Sider>
        )
    }
    componentDidMount() {
        PubSub.subscribe("changeAdminMsg",()=>{
            this.setState({
                account_name:getUser().account_name,
                account_icon:getUser().account_icon
            })
        })
    }
}


export default withRouter(LeftNav)
