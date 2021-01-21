import React, { Component } from 'react'
import PubSub from "pubsub-js"
import { Card, Form, Input, Button, Upload, message } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import config from "../../../config/config"
import { getUser,changeAmdinMsg,saveUser } from "../../../api/adminApi"

import EditPassword from "./EditPassword"

export default class AccountSetting extends Component {
    constructor() {
        super();
        this.state = {
            // 控制密码修改框是否显示
            editPwdPanelShow : false,
            // 上传时的状态
            loading: false,
            // 头像
            account_icon: "",
            // 账户名
            account: "",
            // 昵称
            account_name: "",
            // 令牌
            token: "",
        }

        // 为表番form创建 ref
        this.formRef = React.createRef();
    }

    // 控制密码修改框的显示
    _showEditPwdPanel(){
        this.setState({
            editPwdPanelShow:true
        })
    }
    // 控制密码修改框的隐藏
    _hideEditPwdPanel=()=>{
        this.setState({
            editPwdPanelShow:false
        })
    }

    //当图片从浏览器上传到服务器，会有不同的状态，此函数可以监听状态的变化
    _handleChange = info => {
        // console.log(info)
        // 表示图片正在上传
        if(info.file.state === "uploading"){
            // 如图片正在上传，loading设置为true
            this.setState({ loading:true })
            return;
        }
        // 图片上传完成
        // info.file.response  得到服务器的响应
        // console.log(info.file.response);
        if (info.file.status === 'done' && info.file.response.status === 1) {
            message.success("头像上传成功")
            let imgUrl = config.BASE_URL + info.file.response.data.name;
            this.setState({
                loading:false,
                account_icon:imgUrl
            })
        }
    }
    render() {
        // 引入state
        const { loading, account_icon } = this.state;

        // 初始上传按钮
        const uploadButton = (
            <div>
                {/* 上传状态 */}
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                {/* 上传按钮 */}
                <div >Upload</div>
            </div>
        )

        // 表单的栅格布局
        const layout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 10,
            },
        };
        // 收集表单中的数据
        const onFinish = (values) => {
            // console.log('Success:', values);
            let { token, account_icon } = this.state;
            changeAmdinMsg(token,values.account_name,account_icon).then(result=>{
                // console.log(result)
                if(result && result.status === 1){
                    saveUser(result.data)
                    message.success(result.msg)
                    // 发布
                    PubSub.publish("changeAdminMsg")
                }
            }).catch(err=>{
                message.error("管理员信息更新失败")
            })

        };
        return (
            <Card title="管理员信息编辑">
                <Form
                    {...layout}
                    onFinish={onFinish}
                    ref={this.formRef}
                >
                    {/* 账户名 */}
                    <Form.Item
                        label="账户名"
                        name="account"
                    >
                        <Input disabled />
                    </Form.Item>
                    {/* 管理员昵称*/}
                    <Form.Item
                        label="管理员名称"
                        name="account_name"
                        rules={[
                            {
                                required: true,
                                message: "请填写你的昵称！",
                            }
                        ]}
                    >
                        <Input placeholder="请填写你的昵称"/>
                    </Form.Item>
                    {/* 管理员头像 */}
                    <Form.Item
                        label="管理员头像"
                        name="account_icon"
                    >
                        <Upload
                            name="admin_avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="/api/auth/admin/upload_admin_icon"
                            // beforeUpload={beforeUpload}
                            onChange={this._handleChange}
                        >
                            { account_icon ? <img src={account_icon} style={{ width:"100%",height:"100%" }} alt=""/> : uploadButton }
                        </Upload>
                    </Form.Item>
                    {/* 尾部 */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">修改</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;或者&nbsp;&nbsp;
                        <a onClick={ e=>this._showEditPwdPanel(e) }>修改密码？</a>
                    </Form.Item>
                </Form>
                {/* 弹出密码修改框 */}
                <EditPassword visible={this.state.editPwdPanelShow} hideFunc={ this._hideEditPwdPanel } />
            </Card>
        )
    }

    componentDidMount() {
        this.setState({
            // 在生命周期中给状态赋值 实现数据回显
            account_icon:getUser().account_icon,
            account:getUser().account,
            account_name:getUser().account_name,
            token:getUser().token
        },()=>{
            // 在此函数中可以获取最新的状态

            // 获取account account_name的最新状态
            let { account,account_name } = this.state;

            this.formRef.current.setFieldsValue({
                account,
                account_name
            })
        })
    }
}
