import React, { Component } from 'react'
import logo from "./images/logo.png"
import "./css/login.css"
import md5 from "blueimp-md5"

import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {checkLogin,saveUser} from "../../api/adminApi"
import config from "../../config/config";

export default class Login extends Component {
    render() {
        const onFinish = (values) => {
            // console.log('表单中填写的数据: ', values);
            let Md5Password = md5(values.password,config.KEY);
            // console.log(Md5Password)
            checkLogin(values.account, Md5Password).then(result=>{
                // console.log(result);
                if(result && result.status === 1){
                    message.success(result.msg)
                    // 把数据存储到本地
                    saveUser(result.data)
                    // 跳到后台首页面
                    this.props.history.replace("/")
                }else if(result && result.status === 0){
                    message.error(result.msg)
                }else{
                    message.error("网络可能出问题了，检查你的网站~")
                }
            }).catch(err=>{
                message.error("服务器内部错误~")
            })
        };
        return (
            <div className="login">
                <div className="login-wrap">
                    <div className="avatar">
                        <img src={logo} alt="" />
                    </div>
                    <div className="content">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true}}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="account"
                                rules={[{required: true,message: '账户名不能为空！'}]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不能为空！',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
